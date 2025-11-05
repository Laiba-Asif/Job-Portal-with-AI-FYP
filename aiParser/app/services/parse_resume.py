# app/services/parse_resume.py
from typing import List, Dict, Any, Optional, Tuple
import re
import logging
from datetime import datetime
from collections import defaultdict

# NLP + ML
try:
    import spacy
except Exception:
    spacy = None

from transformers import pipeline
from dateparser import parse as date_parse
from sklearn.feature_extraction.text import TfidfVectorizer
import numpy as np

# optional fast fuzzy matching
try:
    from rapidfuzz import process as fuzzy_process, fuzz as fuzzy_fuzz
except Exception:
    fuzzy_process = None
    fuzzy_fuzz = None

logger = logging.getLogger(__name__)

# --------------------------
# Load models once (global)
# --------------------------
# spaCy NER (prefer transformer model if installed)
_spacy_nlp = None
if spacy:
    try:
        _spacy_nlp = spacy.load("en_core_web_trf")
        logger.info("Loaded spaCy en_core_web_trf")
    except Exception:
        try:
            _spacy_nlp = spacy.load("en_core_web_sm")
            logger.info("Loaded spaCy en_core_web_sm")
        except Exception:
            _spacy_nlp = None

# HuggingFace token classification fallback (DSLIM NER)
try:
    _hf_ner = pipeline("ner", model="dslim/bert-base-NER", aggregation_strategy="simple")
except Exception:
    _hf_ner = None
    logger.warning("HuggingFace NER pipeline not available - install transformers and model")

# --------------------------
# Regex / vocabulary
# --------------------------
EMAIL_RE = re.compile(r"[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[A-Za-z]{2,}", re.I)
PHONE_RE = re.compile(r"(?:\+?\d{1,3}[\s\-])?(?:\(?\d{2,4}\)?[\s\-])?\d{3,4}[\s\-]?\d{3,4}")
URL_RE = re.compile(r"https?://[^\s)]+|www\.[^\s)]+", re.I)
YEAR_RE = re.compile(r"\b(19|20)\d{2}\b")

# headings for detection (multi-domain)
HEADING_KEYWORDS = {
    "education": ["education", "academic", "qualifications", "qualifications & education", "education & qualifications"],
    "experience": ["experience", "work experience", "employment", "professional experience", "experience & work"],
    "projects": ["projects", "portfolio", "personal projects", "selected projects", "case studies"],
    "skills": ["skills", "technical skills", "competencies", "core skills", "tools"],
    "certifications": ["certification", "certifications", "courses", "licenses", "certificates"],
    "summary": ["summary", "professional summary", "profile", "about me", "about"],
    "contact": ["contact", "contact information"],
}

# broad multi-domain skill ontology (starter)
COMMON_SKILLS = {
    # Tech & Dev
    "python","java","javascript","typescript","react","next.js","vue","angular","html","css","sql","node.js","express",
    "django","flask","spring","docker","kubernetes","aws","azure","gcp","git","github","gitlab","terraform",
    # Data / ML
    "machine learning","nlp","tensorflow","pytorch","pandas","numpy","scikit-learn","data analysis","statistics",
    # Design / Creative
    "figma","photoshop","illustrator","ui/ux","adobe","after effects","video editing","sketch",
    # Business / Finance
    "excel","accounting","financial analysis","budgeting","project management","sales","marketing","analytics",
    # Healthcare / life sciences
    "nursing","clinical research","patient care","emr","phlebotomy","medical assistant",
    # Soft skills / general
    "communication","teamwork","leadership","problem solving","management","customer service"
}

# job title keywords across domains (starter)
JOB_TITLE_KEYWORDS = [
    "frontend developer","backend developer","full stack developer","software engineer","data scientist",
    "nurse","doctor","pharmacist","accountant","financial analyst","project manager","product manager",
    "graphic designer","ui designer","ux designer","marketing specialist","sales associate","teacher"
]

SENIORITY_KEYWORDS = {
    "senior": ["senior","lead","principal","staff","vp","director"],
    "mid": ["mid","experienced","associate","ii","iii"],
    "junior": ["junior","jr.","entry-level","intern"]
}

# date range regex (many variants)
DATE_RANGE_RE = re.compile(
    r"(?P<start>(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec|\w+)[\w\.\s,/-]{0,20}\d{2,4})\s*[-–—]\s*(?P<end>present|current|now|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec|\w+)[\w\.\s,/-]{0,20}\d{2,4})",
    flags=re.I
)

# --------------------------
# Helpers
# --------------------------
def _split_into_lines(text: str) -> List[str]:
    return [l.strip() for l in text.splitlines() if l.strip()]

def _normalize_links(raw_links: List[str]) -> List[str]:
    out = []
    seen = set()
    for l in (raw_links or []):
        if not l:
            continue
        u = l.strip()
        if "@" in u and re.match(EMAIL_RE, u):
            # keep emails raw here
            val = u
        else:
            if not re.match(r"^https?://", u, flags=re.I):
                val = "https://" + u.lstrip("/")
            else:
                val = u
        if val not in seen:
            out.append(val); seen.add(val)
    return out

def _classify_links(urls: List[str]) -> Dict[str, List[str]]:
    github = []
    linkedin = []
    portfolio = []
    website = []
    emails = []
    others = []

    for u in urls:
        if not u:
            continue
        low = u.lower()
        if re.match(EMAIL_RE, u):
            emails.append(u)
        elif "linkedin.com" in low:
            linkedin.append(u)
        elif "github.com" in low:
            github.append(u)
        elif any(x in low for x in ["behance", "dribbble", "figma", "codepen", "codesandbox", "vercel", "netlify", "portfolio"]):
            portfolio.append(u)
        elif re.search(r"\.(dev|app|io|me|site|online|tech|studio|edu)\b", low):
            website.append(u)
        else:
            others.append(u)

    def uniq(lst): 
        return list(dict.fromkeys(lst))

    result = {}
    if linkedin: result["linkedin"] = uniq(linkedin)
    if github: result["github"] = uniq(github)
    if portfolio: result["portfolio"] = uniq(portfolio)
    if website: result["website"] = uniq(website)
    if emails: result["emails"] = uniq(emails)
    if others: result["others"] = uniq(others)  # keep any uncategorized links

    return result

# --------------------------
# Name extraction
# --------------------------
def _extract_name_spacy(text: str) -> Optional[str]:
    if not _spacy_nlp:
        return None
    try:
        doc = _spacy_nlp(text[:5000])  # limit for speed
        persons = [ent.text.strip() for ent in doc.ents if ent.label_ in ("PERSON",)]
        if persons:
            # heuristic: longest / most complete
            persons = sorted(set(persons), key=lambda s: -len(s))
            return persons[0]
    except Exception:
        logger.exception("spaCy name extraction failed")
    return None
def _extract_all_links(text: str) -> List[str]:
    # basic regex
    urls = URL_RE.findall(text)
    # sometimes people write links like (www.example.com) or [example](https://...)
    extra = re.findall(r"\(?https?://[^\s)]+\)?", text)
    extra += re.findall(r"\[.*?\]\((https?://[^\s)]+)\)", text)
    all_urls = list(dict.fromkeys(urls + extra))
    return all_urls

def _extract_name_hf(text: str) -> Optional[str]:
    if not _hf_ner:
        return None
    try:
        ents = _hf_ner(text[:2000])
        persons = [e["word"].strip() for e in ents if e.get("entity_group")=="PER"]
        if persons:
            # join up to three tokens
            return " ".join(persons[:3]).strip()
    except Exception:
        logger.exception("HF NER failed")
    return None

def _extract_name(text: str) -> Optional[str]:
    """
    HuggingFace NER based name extraction (works well on resumes)
    """
    if not _hf_ner:
        return None

    try:
        ents = _hf_ner(text[:10000])
        persons = [e["word"].strip() for e in ents if e.get("entity_group")=="PER"]
        if persons:
            # join first few tokens to form full name
            return " ".join(persons[:3]).strip()
    except Exception:
        logger.exception("HF NER failed")

    # fallback: first non-empty line
    lines = _split_into_lines(text)
    return lines[0].strip() if lines else None

# --------------------------
# Section detection
# --------------------------
def _find_section_blocks(text: str) -> Dict[str,str]:
    lines = _split_into_lines(text)
    headings = []
    for idx, ln in enumerate(lines):
        low = ln.lower()
        for sec, kws in HEADING_KEYWORDS.items():
            for kw in kws:
                # exact word or startswith (handle "Education" or "Education & Awards")
                if re.search(r"\b" + re.escape(kw) + r"\b", low) and len(ln.split()) <= 8:
                    headings.append((idx, sec))
                    break
            else:
                continue
            break
    blocks = {}
    if not headings:
        return blocks
    for i, (start, sec) in enumerate(headings):
        end = headings[i+1][0] if i+1 < len(headings) else len(lines)
        blocks[sec] = "\n".join(lines[start+1:end]).strip()
    return blocks

# --------------------------
# Date parsing helpers
# --------------------------
def _parse_date_guess(s: str) -> Optional[datetime]:
    if not s: return None
    s = s.strip()
    if re.search(r"\b(present|current|now|to date)\b", s, re.I):
        return datetime.now()
    try:
        dt = date_parse(s, settings={"PREFER_DAY_OF_MONTH":"first"})
        return dt
    except Exception:
        # fallback to give year only if present
        m = YEAR_RE.search(s)
        if m:
            return datetime(int(m.group(0)), 1, 1)
    return None

def _format_date(dt: Optional[datetime]) -> Optional[str]:
    if not dt: return None
    try:
        return dt.strftime("%b %Y")
    except Exception:
        return None

# --------------------------
# Experience extraction
# --------------------------
def _extract_experience(block_text: str) -> List[Dict[str,Any]]:
    if not block_text:
        return []
    lines = _split_into_lines(block_text)
    experiences=[]
    current=None

    role_company_pattern = re.compile(r"(?P<role>[\w\-\s/&\.,]{2,80})\s+(?:at|\@|\|)\s+(?P<company>[\w\-\s\.,&/]{2,120})", re.I)

    for ln in lines:
        # if detects role@company or Role | Company
        m = role_company_pattern.search(ln)
        if m:
            if current:
                experiences.append(current)
            role = m.group("role").strip()
            company = m.group("company").strip()
            current = {"role": role, "company": company, "start_date": None, "end_date": None, "description": ""}
            # sometimes the same line contains dates -> try to extract
            dr = DATE_RANGE_RE.search(ln)
            if dr:
                s = _parse_date_guess(dr.group("start"))
                e = _parse_date_guess(dr.group("end"))
                current["start_date"] = _format_date(s)
                current["end_date"] = _format_date(e)
            continue

        # detect date-range line
        dr = DATE_RANGE_RE.search(ln)
        if dr and current:
            s = _parse_date_guess(dr.group("start"))
            e = _parse_date_guess(dr.group("end"))
            current["start_date"] = _format_date(s)
            current["end_date"] = _format_date(e)
            # also append the rest of line to description
            rest = DATE_RANGE_RE.sub("", ln).strip()
            if rest:
                current["description"] += (" " + rest).strip()
            continue

        # lines that appear to be new position without "at" e.g., "Frontend Developer | Company"
        if "|" in ln and len(ln.split("|")[0].split()) <= 5 and len(ln.split("|")) >= 2:
            if current:
                experiences.append(current)
            left, right = [p.strip() for p in ln.split("|",1)]
            # try detection which is role vs company
            role = left; company = right
            current = {"role": role, "company": company, "start_date": None, "end_date": None, "description": ""}
            continue

        # bullets or description lines
        if current:
            current["description"] = (current.get("description","") + " " + ln).strip()
        else:
            # orphan lines (no current) -> create generic entry
            current = {"role": None, "company": None, "start_date": None, "end_date": None, "description": ln.strip()}

    if current:
        experiences.append(current)

    # tidy descriptions and ensure dates are string formatted
    for e in experiences:
        e["description"] = e.get("description","").strip()
        if isinstance(e.get("start_date"), datetime):
            e["start_date"] = _format_date(e["start_date"])
        if isinstance(e.get("end_date"), datetime):
            e["end_date"] = _format_date(e["end_date"])
    return experiences

# --------------------------
# Projects extraction
# --------------------------
def _extract_projects(block_text: str, all_links: List[str]) -> List[Dict[str,Any]]:
    if not block_text:
        return []
    lines = _split_into_lines(block_text)
    projects=[]
    current=None
    title_keywords = ["project", "app", "clone", "website", "demo", "github", "repo"]

    for ln in lines:
        if any(k in ln.lower() for k in title_keywords) and len(ln.split())<=10:
            if current:
                projects.append(current)
            current={"title": ln.strip(), "description": "", "images":[], "videos":[], "links":[]}
            continue
        if current:
            current["description"] += (" " + ln).strip()
    if current:
        projects.append(current)

    # enrich projects with links that look like project links (github, youtube, vercel, netlify)
    for p in projects:
        p_links=[]
        for u in all_links:
            lu=u.lower()
            if any(x in lu for x in ["github.com","youtube.com","youtu.be","vercel.com","netlify.app","glitch.me","codesandbox.io"]):
                p_links.append(u)
        p["links"]=p_links

    return projects

# --------------------------
# Education & Certifications extraction
# --------------------------
def _extract_education(block_text: str) -> List[str]:
    if not block_text:
        return []
    lines=_split_into_lines(block_text)
    # keep lines that look like education entries (years, degrees, university names)
    out=[]
    degree_words = ["bachelor","master","bs","ms","phd","bsc","msc","ba","mba","certificate","diploma","degree"]
    for ln in lines:
        if re.search(r"\b(19|20)\d{2}\b", ln) or any(dw in ln.lower() for dw in degree_words) or len(ln.split())>3:
            out.append(ln)
    return out or lines

def _extract_certifications(block_text: str) -> List[str]:
    if not block_text:
        return []
    lines=_split_into_lines(block_text)
    # prefer short lines (cert titles), filter out garbage
    out=[ln for ln in lines if len(ln.split())<=20]
    return out or lines

# --------------------------
# Skills extraction
# --------------------------
def _tfidf_top_terms(text: str, top_n: int = 80) -> List[str]:
    if not text or not text.strip():
        return []
    try:
        v = TfidfVectorizer(stop_words="english", ngram_range=(1,2), max_features=800)
        X = v.fit_transform([text])
        scores = np.asarray(X.sum(axis=0)).flatten()
        terms = v.get_feature_names_out()
        ranked = sorted(zip(terms, scores), key=lambda t: -t[1])
        return [t for t,_ in ranked[:top_n]]
    except Exception:
        return []

def _candidate_skills_from_phrases(text: str) -> List[str]:
    patterns = [
        r"(?:skills?:\s*)([A-Za-z0-9,\.\-\/\s\+]+)",
        r"(?:stack:)\s*([A-Za-z0-9,./\s\-\+/#]+)",
        r"(?:languages?:)\s*([A-Za-z0-9,./\s\-\+/#]+)",
        r"(?:experience with|worked with|using)\s+([A-Za-z0-9,./\s\-\+/#]+)"
    ]
    cand=[]
    for pat in patterns:
        for m in re.finditer(pat, text, flags=re.I):
            grp = m.group(1).strip().strip(".,;:-")
            parts = re.split(r"[,\n;/|]+", grp)
            for p in parts:
                p = p.strip()
                if p:
                    cand.append(p)
    # unique preserve order
    seen=set(); out=[]
    for c in cand:
        key=c.lower()
        if key not in seen:
            out.append(c); seen.add(key)
    return out

def _filter_and_rank_skills(tfidf_terms: List[str], phrase_cands: List[str], text: str, max_k:int=20) -> List[str]:
    text_low = text.lower()
    candidates = []

    # 1. phrase candidates (higher weight)
    for ph in phrase_cands:
        for part in re.split(r"[,\|/]", ph):
            tok = part.strip()
            if tok: candidates.append(tok)

    # 2. common skills found in text
    for sk in COMMON_SKILLS:
        if sk in text_low and sk not in [c.lower() for c in candidates]:
            candidates.append(sk)

    # 3. tfidf-derived candidates (long-tail)
    for t in tfidf_terms:
        t_clean = t.strip()
        if len(t_clean.split()) > 3: continue
        if not re.search(r"[a-zA-Z]", t_clean): continue
        if t_clean.lower() in text_low and t_clean not in candidates:
            candidates.append(t_clean)

    # rank candidates: heuristic scoring
    scored=[]
    for tok in candidates:
        score=0
        tl=tok.lower()
        if tl in COMMON_SKILLS: score += 100
        # phrase match boost
        if any(tok.lower() in pc.lower() or pc.lower() in tok.lower() for pc in phrase_cands): score += 20
        # shorter tokens higher priority
        score += max(0, 10 - len(tok.split()))
        # presence frequency approx via counting occurrences
        score += text_low.count(tok.lower())
        scored.append((score, tok))
    scored_sorted = [t for _,t in sorted(scored, key=lambda x:-x[0])]
    final=[]
    seen=set()
    for tok in scored_sorted:
        k=tok.strip().strip(".,;:-")
        key=k.lower()
        if key in seen: continue
        if key in {"developed","worked","experience","using","responsible"}: continue
        seen.add(key)
        final.append(k)
        if len(final)>=max_k: break
    return final

# --------------------------
# Job title & seniority detection
# --------------------------
def _detect_job_title(text: str, candidates: List[str]) -> Optional[str]:
    low = text.lower()
    # prefer explicit mention of known job title keywords
    for jt in JOB_TITLE_KEYWORDS:
        if jt in low:
            return jt.title()
    # fallback: first candidate from TF-IDF or phrases that contains job title keywords
    for c in candidates:
        if any(x in c.lower() for x in ["engineer","developer","scientist","manager","designer","nurse","teacher","accountant","analyst"]):
            return c.title()
    return None

def _detect_seniority(text:str, years: float) -> str:
    base = "junior"
    if years is None: years = 0.0
    if years >= 7: base = "senior"
    elif years >= 3: base = "mid"
    # check first few lines for explicit seniority words
    top = " ".join(_split_into_lines(text)[:6]).lower()
    for level, kws in SENIORITY_KEYWORDS.items():
        if any(kw in top for kw in kws):
            return level
    return base

# --------------------------
# Years of experience calculation
# --------------------------
def _calculate_total_experience_from_experience_list(experiences: List[Dict[str,Any]]) -> float:
    total_months = 0
    for e in experiences:
        s = e.get("start_date")
        eend = e.get("end_date")
        if not s or not eend:
            continue
        try:
            ds = date_parse(s)
            de = date_parse(eend)
            if not ds or not de: continue
            months = (de.year - ds.year) * 12 + (de.month - ds.month + 1)
            if months > 0:
                total_months += months
        except Exception:
            continue
    if total_months == 0:
        return 0.0
    return round(total_months / 12.0, 2)

# --------------------------
# Top-level parser
# --------------------------
def parse_resume_text(raw_text: str, links: Optional[List[str]] = None) -> Dict[str, Any]:
    """
    Input:
      - raw_text: extracted text from uploaded resume (Pdf/docx/txt)
      - links: list of links found by extraction (or passed from external extractor)
    Returns:
      dict matching your DB/frontend schema:
      {
        status,
        personal_info: { name, emails, phones },
        links: { linkedin, github, portfolio, website, emails },
        education: [...],
        certifications: [...],
        skills: [...],
        projects: [{title,description,links,images,videos}, ...],
        experience: [{role,company,start_date,end_date,description}, ...],
        keywords: [...],
        job_title: str | None,
        seniority: str | None,
        years_of_experience: float | None
      }
    """
    if not raw_text:
        return {"status":"error","message":"empty text"}

    lines = _split_into_lines(raw_text)
    # normalize & merge links (links argument may include emails or urls)
    normalized_links = _normalize_links(links or [])
    urls_in_text = _extract_all_links(raw_text)
    all_urls = list(dict.fromkeys(urls_in_text + normalized_links))
    classified_links = _classify_links(all_urls)

    # contacts
    emails = EMAIL_RE.findall(raw_text)
    phones = [p for p in PHONE_RE.findall(raw_text) if not YEAR_RE.search(p)]
    # ensure we include any classified emails
    if "emails" in classified_links:
        for em in classified_links.get("emails", []):
            if em not in emails:
                emails.append(em)

    # name extraction (spaCy -> HF -> heuristic)
    name = _extract_name(raw_text)

    # section blocks
    blocks = _find_section_blocks(raw_text)
    education_block = blocks.get("education","")
    cert_block = blocks.get("certifications","")
    skills_block = blocks.get("skills","")
    projects_block = blocks.get("projects","")
    experience_block = blocks.get("experience","")
    summary_block = blocks.get("summary","")

    # parse each
    education = _extract_education(education_block) if education_block else []
    certifications = _extract_certifications(cert_block) if cert_block else []
    experience = _extract_experience(experience_block) if experience_block else _extract_experience(raw_text)
    projects = _extract_projects(projects_block if projects_block else "", all_urls)

    # skills candidates
    phrase_candidates = _candidate_skills_from_phrases(skills_block + "\n" + raw_text)
    tfidf_terms = _tfidf_top_terms(raw_text, top_n=120)
    skills = _filter_and_rank_skills(tfidf_terms, phrase_candidates, raw_text, max_k=30)

    # keywords: short tokens for search / ATS
    keywords = []
    for s in skills:
        # split comma-delimited multi skills
        parts = re.split(r"[,/|;]+", s)
        for p in parts:
            tok = p.strip()
            if tok and tok.lower() not in [k.lower() for k in keywords]:
                keywords.append(tok)
            if len(keywords) >= 25:
                break
        if len(keywords) >= 25:
            break

    # job title and seniority
    job_title = _detect_job_title(raw_text, tfidf_terms + phrase_candidates)
    # compute yrs-of-experience from experience entries if possible
    years_of_experience = _calculate_total_experience_from_experience_list(experience)
    seniority = _detect_seniority(raw_text, years_of_experience)

    result = {
        "status": "success",
        "personal_info": {
            "name": name,
            "emails": list(dict.fromkeys(emails)),
            "phones": list(dict.fromkeys(phones))
        },
        "links": classified_links,
        "education": education,
        "certifications": certifications,
        "skills": skills,
        "projects": projects,
        "experience": experience,
        "keywords": keywords,
        "job_title": job_title,
        "seniority": seniority,
        "years_of_experience": float(years_of_experience) if years_of_experience else 0.0,
        "raw_sample": raw_text[:1500]
    }
    return result


# # app/services/parse_resume.py
# import re
# import math
# import datetime
# import numpy as np
# from typing import List, Dict, Optional
# from transformers import pipeline
# from sklearn.feature_extraction.text import TfidfVectorizer
# from datetime import datetime
# from dateutil import parser
# # from dateparser import parse as parser

# # ----------------------------
# # Load NER Model (load once)
# # ----------------------------
# ner_pipeline = pipeline("ner", model="dslim/bert-base-NER", aggregation_strategy="simple")

# # ----------------------------
# # Config / Regex / Vocab
# # ----------------------------
# EMAIL_RE = re.compile(r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}")
# PHONE_RE = re.compile(r"(?:\+?\d{1,3})?[ \-]?(?:\d{2,4}[ \-]?){2,4}\d{1,4}")
# URL_RE = re.compile(r"(https?://[^\s\)]+)")
# YEAR_RE = re.compile(r"\b(19|20)\d{2}\b")
# DATE_RANGE_RE = re.compile(
#     r"(?P<start>(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|\w+)?\s*\d{4})\s*[-–—]\s*(?P<end>(?:present|current|now|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|\w+)?\s*\d{4}))",
#     flags=re.I,
# )

# HEADING_KEYWORDS = {
#     "education": ["education", "academic", "qualification"],
#     "experience": ["experience", "work experience", "employment", "professional experience"],
#     "projects": ["projects", "portfolio", "recent projects"],
#     "skills": ["skills", "technologies", "tools", "competencies"],
#     "certifications": ["certification", "certifications", "courses", "certificates", "moocs"],
# }

# COMMON_SKILLS = {
#     "python","java","javascript","typescript","c++","c#","go","ruby","php","sql","r",
#     "react","react.js","next.js","vue","angular","html","css","tailwind","scss","bootstrap","redux",
#     "node.js","express","django","flask","spring","spring boot","asp.net","rest api","graphql",
#     "mongodb","postgresql","mysql","sqlite","redis",
#     "docker","kubernetes","aws","azure","gcp","ci/cd","jenkins","git","github","gitlab","terraform",
#     "tensorflow","pytorch","scikit-learn","nlp","machine learning","data analysis","pandas","numpy",
#     "jwt","websocket","socket.io","microservices","api","tmdb","stream","clerk","firebase","socketio",
#     "communication","teamwork","problem solving","leadership","management"
# }

# JOB_TITLE_KEYWORDS = [
#     "frontend developer","backend developer","full stack developer","software engineer","software developer",
#     "data scientist","data engineer","devops","site reliability engineer","sre","mobile developer",
#     "ui developer","ux designer","product manager","marketing","sales","barber","social media",
#     "graphic designer"
# ]

# SENIORITY_KEYWORDS = {
#     "senior": ["senior", "lead", "principal", "sr.", "sr", "staff"],
#     "mid": ["mid", "experienced", "associate"],
#     "junior": ["junior", "jr.", "jr"]
# }

# # ----------------------------
# # Helpers
# # ----------------------------
# def _split_into_lines(text: str) -> List[str]:
#     return [l.strip() for l in text.splitlines() if l.strip()]

# def _normalize_links(raw_links: List[str]) -> List[str]:
#     normalized = []
#     for l in raw_links:
#         if not l:
#             continue
#         l = l.strip()
#         if "@" in l and re.match(EMAIL_RE, l):
#             normalized.append(l)
#         else:
#             if not re.match(r"^https?://", l):
#                 normalized.append("https://" + l)
#             else:
#                 normalized.append(l)
#     seen = set()
#     out = []
#     for u in normalized:
#         if u not in seen:
#             out.append(u); seen.add(u)
#     return out

# def _find_section_blocks(text: str) -> Dict[str, str]:
#     lines = _split_into_lines(text)
#     headings = []
#     for idx, ln in enumerate(lines):
#         low = ln.lower()
#         for sec, kws in HEADING_KEYWORDS.items():
#             if any(kw in low for kw in kws) and len(ln.split()) <= 8:
#                 headings.append((idx, sec))
#                 break
#     blocks = {}
#     if headings:
#         for i, (start, sec) in enumerate(headings):
#             end = headings[i+1][0] if i+1 < len(headings) else len(lines)
#             blocks[sec] = "\n".join(lines[start+1:end]).strip()
#     return blocks

# def _classify_links(urls: List[str]) -> Dict[str, List[str]]:
#     github = []; linkedin = []; portfolio = []; website = []; emails = []
#     for u in urls:
#         u_l = u.lower()
#         if "linkedin.com" in u_l:
#             linkedin.append(u)
#         elif "github.com" in u_l:
#             github.append(u)
#         elif re.match(EMAIL_RE, u):
#             emails.append(u)
#         elif any(x in u_l for x in ["behance","dribbble","codepen","codesandbox","vercel","netlify","portfolio"]):
#             portfolio.append(u)
#         elif re.search(r"\.(dev|app|io|me|site|online|tech|studio)\b", u_l):
#             portfolio.append(u)
#         else:
#             website.append(u)
#     def uniq(lst): return list(dict.fromkeys(lst))
#     result = {}
#     if linkedin: result["linkedin"] = uniq(linkedin)
#     if github: result["github"] = uniq(github)
#     if portfolio: result["portfolio"] = uniq(portfolio)
#     if website: result["website"] = uniq(website)
#     if emails: result["emails"] = uniq(emails)
#     return result

# # ----------------------------
# # Experience & Projects
# # ----------------------------
# def _parse_date(month_year: str) -> Optional[datetime]:
#     if not month_year:
#         return None
#     if re.search(r"(present|current|now)", month_year, re.I):
#         return datetime.now()
#     try:
#         return parser.parse(month_year)
#     except Exception:
#         m = re.search(r"(19|20)\d{2}", month_year)
#         if m:
#             return datetime(int(m.group(0)), 1, 1)
#     return None

# def _format_date(dt: Optional[datetime]) -> Optional[str]:
#     if not dt:
#         return None
#     return dt.strftime("%b %Y")

# def _extract_experience(text: str) -> List[Dict]:
#     lines = _split_into_lines(text)
#     experiences = []
#     current = None
#     for ln in lines:
#         if re.search(r"\b(Developer|Engineer|Manager|Intern|Designer|Lead|Consultant|Officer|Specialist)\b", ln, re.I):
#             if current:
#                 experiences.append(current)
#             current = {"role": None, "company": None, "description": "", "start_date": None, "end_date": None}
#             if " at " in ln.lower():
#                 parts = re.split(r"\s+at\s+", ln, flags=re.I, maxsplit=1)
#                 current["role"], current["company"] = parts[0].strip(), parts[1].strip()
#             elif "|" in ln:
#                 a,b = [p.strip() for p in ln.split("|",1)]
#                 if any(x in a.lower() for x in ["developer","engineer","manager","intern","designer","lead"]):
#                     current["role"], current["company"] = a, b
#                 else:
#                     current["company"], current["role"] = a, b
#             elif "—" in ln:
#                 a,b = [p.strip() for p in ln.split("—",1)]
#                 if any(x in a.lower() for x in ["developer","engineer","manager","intern","designer","lead"]):
#                     current["role"], current["company"] = a, b
#                 else:
#                     current["company"], current["role"] = a, b
#             else:
#                 toks = ln.split()
#                 current["role"] = " ".join(toks[:2]) if toks else None
#                 current["company"] = " ".join(toks[2:]) if len(toks) > 2 else None
#         elif DATE_RANGE_RE.search(ln) and current:
#             m = DATE_RANGE_RE.search(ln)
#             if m:
#                 start = _parse_date(m.group("start"))
#                 end = _parse_date(m.group("end"))
#                 current["start_date"], current["end_date"] = start, end
#             current["description"] += " " + ln.strip()
#         else:
#             if current:
#                 current["description"] += " " + ln.strip()
#             else:
#                 current = {"role": None, "company": None, "description": ln.strip(), "start_date": None, "end_date": None}
#     if current:
#         experiences.append(current)

#     # cleanup
#     for e in experiences:
#         e["description"] = e["description"].strip()
#         if e.get("start_date"):
#             e["start_date"] = _format_date(e["start_date"])
#         if e.get("end_date"):
#             e["end_date"] = _format_date(e["end_date"])

#     return experiences

# def _calculate_total_experience(experiences: List[Dict]) -> float:
#     total_months = 0
#     for e in experiences:
#         start, end = e.get("start_date"), e.get("end_date")
#         if start and end:
#             try:
#                 s = parser.parse(start)
#                 e_ = parser.parse(end)
#                 months = (e_.year - s.year) * 12 + (e_.month - s.month + 1)
#                 if months > 0:
#                     total_months += months
#             except Exception:
#                 continue
#     return round(total_months / 12, 2) if total_months else 0.0

# def _extract_projects(text: str) -> List[Dict]:
#     lines = _split_into_lines(text)
#     projects = []
#     current = None

#     # Simple heuristic: lines with keywords like 'clone', 'app', 'website', 'live', 'project' are titles
#     title_keywords = ["clone", "app", "project", "github", "website", "live", "demo", "view"]

#     for ln in lines:
#         is_title = any(k in ln.lower() for k in title_keywords)
#         if is_title:
#             if current:
#                 current["description"] = current["description"].strip()
#                 projects.append(current)
#             current = {"title": ln.strip(), "description": ""}
#         else:
#             if current:
#                 current["description"] += " " + ln.strip()
#             else:
#                 # Lines before the first title get ignored
#                 continue

#     if current:
#         current["description"] = current["description"].strip()
#         projects.append(current)

#     return projects

# # ----------------------------
# # Skills
# # ----------------------------
# def _tfidf_top_terms(text: str, top_n: int = 40) -> List[str]:
#     if not text or not text.strip():
#         return []
#     v = TfidfVectorizer(stop_words="english", ngram_range=(1,2), max_features=800)
#     X = v.fit_transform([text])
#     scores = np.asarray(X.sum(axis=0)).flatten()
#     terms = v.get_feature_names_out()
#     ranked = sorted(zip(terms, scores), key=lambda t: -t[1])
#     return [t for t,_ in ranked[:top_n]]

# def _candidate_skills_from_phrases(text: str) -> List[str]:
#     patterns = [
#         r"(?:using|with|worked with|worked on|experience with|built with|utilizing)\s+([A-Za-z0-9\.\-\+# ]{2,60})",
#         r"(?:stack:)\s*([A-Za-z0-9\.,\s\-\+/#]+)",
#         r"(?:languages:)\s*([A-Za-z0-9\.,\s\-\+/#]+)",
#         r"(?:frontend:|backend:|tools:)\s*([A-Za-z0-9\.,\s\-\+/#]+)"
#     ]
#     cand = []
#     for pat in patterns:
#         for m in re.finditer(pat, text, flags=re.I):
#             grp = m.group(1).strip().strip(".,;:-")
#             parts = re.split(r"[,\|/;]", grp)
#             for p in parts:
#                 p = p.strip()
#                 if p:
#                     cand.append(p)
#     seen = set(); out = []
#     for c in cand:
#         key = c.lower()
#         if key not in seen:
#             out.append(c); seen.add(key)
#     return out

# def _filter_and_expand_keywords(tfidf_terms: List[str], phrase_candidates: List[str], text: str, max_k: int = 15) -> List[str]:
#     candidates = []
#     lowered_text = text.lower()
#     for phrase in phrase_candidates:
#         for part in re.split(r"[\,/|]", phrase):
#             tok = part.strip()
#             if tok and len(tok) <= 60:
#                 candidates.append(tok)
#     for sk in COMMON_SKILLS:
#         if sk in lowered_text and sk not in candidates:
#             candidates.append(sk)
#     for t in tfidf_terms:
#         t_clean = t.strip()
#         if len(t_clean.split()) > 3: continue
#         if re.search(r"\b(19|20)\d{2}\b", t_clean): continue
#         if not re.search(r"[a-zA-Z]", t_clean): continue
#         if t_clean.lower() in lowered_text and t_clean not in candidates:
#             candidates.append(t_clean)
#     final = []
#     seen = set()
#     def score_token(tok):
#         s = 0
#         if tok.lower() in COMMON_SKILLS: s += 100
#         if any(tok.lower() in pc.lower() or pc.lower() in tok.lower() for pc in phrase_candidates): s += 20
#         s += max(0, 10 - len(tok.split()))
#         return s
#     scored = [(score_token(t), t) for t in candidates]
#     scored_sorted = [t for _,t in sorted(scored, key=lambda x: -x[0])]
#     for tok in scored_sorted:
#         k = tok.strip().strip(".,;:-")
#         if not k: continue
#         if len(k.split()) > 3:
#             k = " ".join(k.split()[:3])
#         key = k.lower()
#         if key in seen: continue
#         if key in {"developed","built","worked","implemented","experience","using"}: continue
#         seen.add(key)
#         final.append(k)
#         if len(final) >= max_k: break
#     return final

# # ----------------------------
# # Job title / seniority
# # ----------------------------
# def _detect_job_title(text: str) -> Optional[str]:
#     low = text.lower()
#     for jt in JOB_TITLE_KEYWORDS:
#         if jt in low:
#             return jt.title()
#     lines = _split_into_lines(text)[:8]
#     for ln in lines:
#         if re.search(r"\b(Developer|Engineer|Manager|Intern|Designer|Lead|Frontend|Backend)\b", ln, re.I):
#             return ln.strip()
#     return None

# def _detect_seniority(text: str, years_of_experience: float) -> Optional[str]:
#     if years_of_experience is None:
#         years_of_experience = 0

#     # base level from experience
#     if years_of_experience >= 7:
#         base_level = "senior"
#     elif years_of_experience >= 3:
#         base_level = "mid"
#     else:
#         base_level = "junior"

#     # check keywords only in first 5 lines
#     lines = _split_into_lines(text)[:5]
#     low = " ".join(lines).lower()

#     for level, kws in SENIORITY_KEYWORDS.items():
#         for kw in kws:
#             if kw in low:
#                 levels = ["junior", "mid", "senior"]
#                 idx = max(levels.index(base_level), levels.index(level))
#                 return levels[idx]

#     return base_level


# # ----------------------------
# # Main Parser
# # ----------------------------
# def parse_resume_text(raw_text: str, links: Optional[List[str]] = None) -> Dict:
#     """
#     Returns:
#     {
#       status,
#       personal_info: { name, emails, phones },
#       links: { linkedin, github, portfolio, website, emails },
#       education: [...],
#       certifications: [...],
#       skills: [...],
#       projects: [{title,description}, ...],
#       experience: [{role,company,years,description}, ...],
#       keywords: [...],  # concise inferred skills / capabilities
#       job_title: str or None,
#       seniority: str or None,
#       years_of_experience: float or None
#     }
#     """
#     links = links or []
#     norm_links = _normalize_links(links)

#     # basic contact extraction
#     emails = EMAIL_RE.findall(raw_text)
#     phones = [p for p in PHONE_RE.findall(raw_text) if not YEAR_RE.search(p)]

#     # collect urls from resume and provided links
#     urls_from_text = URL_RE.findall(raw_text)
#     all_urls = list(dict.fromkeys(urls_from_text + norm_links))
#     classified_links = _classify_links(all_urls)

#     # NER -> name extraction (join consecutive PER tokens)
#     ner_entities = ner_pipeline(raw_text)
#     persons = [e["word"].strip() for e in ner_entities if e["entity_group"] == "PER"]
#     # join first two if they look like a full name
#     name_candidate = None
#     if persons:
#         # try to join adjacent PER tokens found by pipeline ordering
#         name_candidate = " ".join(persons[:3]).strip()
#     else:
#         # fallback first line
#         lines = _split_into_lines(raw_text)
#         name_candidate = lines[0].strip() if lines else None

#     # section blocks
#     blocks = _find_section_blocks(raw_text)
#     education = _split_into_lines(blocks.get("education", ""))
#     certifications = _split_into_lines(blocks.get("certifications", ""))
#     skills_section = blocks.get("skills", "")
#     projects = _extract_projects(blocks.get("projects", ""))
#     experience = _extract_experience(blocks.get("experience", ""))

#     # compute years of experience (heuristic)
#     years_of_experience = _calculate_total_experience(experience)

#     # job title & seniority
#     job_title = _detect_job_title(raw_text)
#     seniority = _detect_seniority(raw_text, years_of_experience)

#     # TF-IDF top terms on whole resume; phrase candidates via patterns in experience/projects
#     tfidf_terms = _tfidf_top_terms(raw_text, top_n=80)
#     phrase_cands = _candidate_skills_from_phrases(raw_text)

#     # merge additional evidence: project titles + descriptions + experience descriptions
#     evidence_text = " ".join([p.get("title","") + " " + p.get("description","") for p in projects] +
#                              [e.get("description","") for e in experience])

#     # final keywords: filter & expand
#     inferred_skills = _filter_and_expand_keywords(tfidf_terms, phrase_cands, evidence_text + " " + raw_text, max_k=20)

#     # make keywords short (1-2 words) and unique
#     keywords_clean = []
#     seen = set()
#     for k in inferred_skills:
#         tok = k.strip().strip(".,;:-")
#         # split compound phrases and prefer shorter tokens
#         if len(tok.split()) > 2:
#             # try to find any word in tok that is in COMMON_SKILLS
#             found = None
#             for sk in COMMON_SKILLS:
#                 if sk in tok.lower():
#                     found = sk
#                     break
#             if found:
#                 tok = found
#             else:
#                 tok = " ".join(tok.split()[:2])
#         key = tok.lower()
#         if key not in seen:
#             seen.add(key)
#             keywords_clean.append(tok)
#         if len(keywords_clean) >= 15:
#             break

#     # if skills section exists, ensure its tokens appear too
#     if skills_section:
#         for line in re.split(r"[,\n;|]", skills_section):
#             tok = line.strip()
#             if tok and tok.lower() not in seen:
#                 keywords_clean.insert(0, tok)
#                 seen.add(tok.lower())
#             if len(keywords_clean) >= 15:
#                 break
#     # dedupe and trim
#     keywords_clean = list(dict.fromkeys(keywords_clean))[:15]

#     result = {
#         "status": "success",
#         "personal_info": {
#             "name": name_candidate,
#             "emails": list(dict.fromkeys(emails + classified_links.get("emails", []))),
#             "phones": phones,
#         },
#         "links": classified_links,
#         "education": education,
#         "certifications": certifications,
#         "skills": _split_into_lines(skills_section),
#         "projects": projects,
#         "experience": experience,
#         "keywords": keywords_clean,
#         "job_title": job_title,
#         "seniority": seniority,
#         "years_of_experience": years_of_experience,
#     }
#     return result



