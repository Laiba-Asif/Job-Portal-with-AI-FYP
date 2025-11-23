
# app/api/v1/smart_match_jobs.py
from fastapi import APIRouter, Header, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Set
import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

router = APIRouter()

# Domain-specific skill categories
TECH_SKILLS = {
    'frontend': {'react', 'angular', 'vue', 'nextjs', 'html', 'css', 'javascript', 'typescript', 'tailwind', 'bootstrap'},
    'backend': {'nodejs', 'express', 'nestjs', 'python', 'java', 'spring', 'django', 'flask', 'mongodb', 'sql', 'mysql'},
    'devops': {'aws', 'azure', 'docker', 'kubernetes', 'jenkins', 'git', 'github', 'ci/cd'},
    'mobile': {'react native', 'flutter', 'android', 'ios', 'swift'},
    'fullstack': {'mern', 'mean', 'fullstack', 'software engineer', 'developer'}
}

BUSINESS_SKILLS = {
    'business': {'communication', 'english', 'business', 'sales', 'marketing', 'management', 'leadership'},
    'creative': {'hair', 'fashion', 'design', 'creative', 'styling', 'barber'}
}

class JobItem(BaseModel):
    jobId: str
    text: str
    title: str  # Add job title for better categorization

class MatchRequest(BaseModel):
    resumeText: str
    jobs: List[JobItem]

def categorize_profile(resume_text: str) -> str:
    """Determine if profile is technical, business, creative, etc."""
    text_lower = resume_text.lower()
    
    tech_keywords = sum(1 for skill_set in TECH_SKILLS.values() for skill in skill_set if skill in text_lower)
    business_keywords = sum(1 for skill_set in BUSINESS_SKILLS.values() for skill in skill_set if skill in text_lower)
    
    if tech_keywords > business_keywords * 2:  # Strong tech profile
        return "technical"
    elif business_keywords > tech_keywords * 2:  # Strong business profile
        return "business"
    else:
        return "mixed"

def categorize_job(job_text: str, job_title: str) -> str:
    """Categorize job as technical, business, or creative"""
    combined_text = f"{job_title} {job_text}".lower()
    
    tech_score = sum(1 for skill_set in TECH_SKILLS.values() for skill in skill_set if skill in combined_text)
    business_score = sum(1 for skill_set in BUSINESS_SKILLS.values() for skill in skill_set if skill in combined_text)
    
    if tech_score > business_score:
        return "technical"
    elif business_score > tech_score:
        return "business"
    else:
        return "creative"

@router.post("/smart-match-jobs")
async def smart_match_jobs(request: MatchRequest, x_api_key: str = Header(None)):
    API_KEY = os.getenv("PARSER_API_KEY")
    if API_KEY and x_api_key != API_KEY:
        raise HTTPException(status_code=401, detail="Unauthorized")

    # Categorize the user's profile
    profile_category = categorize_profile(request.resumeText)
    print(f"Profile categorized as: {profile_category}")

    scores = []
    for job in request.jobs:
        # Categorize the job
        job_category = categorize_job(job.text, job.title)
        
        # Skip jobs that don't match the profile category
        if profile_category == "technical" and job_category != "technical":
            continue
        elif profile_category == "business" and job_category != "business":
            continue
        
        # Use TF-IDF for matching within the same category
        vectorizer = TfidfVectorizer()
        try:
            tfidf_matrix = vectorizer.fit_transform([request.resumeText, job.text])
            similarity = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0]
            
            if similarity >= 0.4:  # Reasonable threshold for same-category jobs
                scores.append({
                    "jobId": job.jobId,
                    "score": round(similarity, 4),
                    "category": job_category
                })
        except:
            continue

    scores.sort(key=lambda x: x["score"], reverse=True)
    print(f"Found {len(scores)} category-matched jobs")
    return scores

# # app/api/v1/match-jobs.py
# from fastapi import APIRouter, Header, HTTPException
# from pydantic import BaseModel
# from typing import List, Dict, Any
# from sentence_transformers import SentenceTransformer, util
# from transformers import pipeline
# import os

# router = APIRouter()

# # Load models
# sentence_model = SentenceTransformer("all-MiniLM-L6-v2")
# ner_pipeline = pipeline("ner", model="dslim/bert-base-NER", aggregation_strategy="simple")

# class JobItem(BaseModel):
#     jobId: str
#     text: str

# class MatchRequest(BaseModel):
#     resumeText: str
#     jobs: List[JobItem]

# def extract_key_entities(text: str) -> Dict[str, List[str]]:
#     """Extract skills, technologies, and roles from text using BERT NER"""
#     entities = ner_pipeline(text)
    
#     skills = []
#     technologies = []
#     organizations = []
    
#     for entity in entities:
#         entity_text = entity['word'].strip()
#         entity_type = entity['entity_group']
        
#         if entity_type in ['ORG'] and len(entity_text) > 2:
#             organizations.append(entity_text)
#         elif entity_type in ['MISC'] and len(entity_text) > 2:
#             technologies.append(entity_text)
    
#     return {
#         "skills": list(set(skills)),
#         "technologies": list(set(technologies)),
#         "organizations": list(set(organizations)),
#         "full_text": text
#     }

# @router.post("/match-jobs")
# async def advanced_match_jobs(request: MatchRequest, x_api_key: str = Header(None)):
#     API_KEY = os.getenv("PARSER_API_KEY")
#     if API_KEY and x_api_key != API_KEY:
#         raise HTTPException(status_code=401, detail="Unauthorized")

#     # Extract entities from resume
#     resume_entities = extract_key_entities(request.resumeText)
#     resume_combined = f"{resume_entities['full_text']} {' '.join(resume_entities['skills'])} {' '.join(resume_entities['technologies'])}"
    
#     resume_embedding = sentence_model.encode(resume_combined, convert_to_tensor=True)
    
#     scores = []
#     for job in request.jobs:
#         # Extract entities from job description
#         job_entities = extract_key_entities(job.text)
#         job_combined = f"{job_entities['full_text']} {' '.join(job_entities['skills'])} {' '.join(job_entities['technologies'])}"
        
#         job_embedding = sentence_model.encode(job_combined, convert_to_tensor=True)
        
#         # Compute similarity
#         similarity = util.cos_sim(resume_embedding, job_embedding).item()
        
#         scores.append({
#             "jobId": job.jobId,
#             "score": round(similarity, 4),
#             "matchedSkills": list(set(resume_entities['skills']) & set(job_entities['skills'])),
#             "matchedTechnologies": list(set(resume_entities['technologies']) & set(job_entities['technologies']))
#         })
    
#     # Sort by score
#     scores.sort(key=lambda x: x["score"], reverse=True)
    
#     return scores