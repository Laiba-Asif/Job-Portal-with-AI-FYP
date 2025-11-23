from fastapi import APIRouter, Header, HTTPException
from pydantic import BaseModel
from typing import List
from sentence_transformers import SentenceTransformer, util
import os

router = APIRouter()

MODEL_NAME = os.getenv("SENTENCE_MODEL", "all-MiniLM-L6-v2")
_model = SentenceTransformer(MODEL_NAME)

SIMILARITY_THRESHOLD = float(os.getenv("SIMILARITY_THRESHOLD", 0.65))


class JobItem(BaseModel):
    jobId: str
    skills: List[str]


class SeekerItem(BaseModel):
    seekerId: str
    skills: List[str]


class MatchCandidateRequest(BaseModel):
    jobs: List[JobItem]
    jobseekers: List[SeekerItem]


@router.post("/match-candidates")
async def match_candidates(request: MatchCandidateRequest, x_api_key: str = Header(None)):

    API_KEY = os.getenv("PARSER_API_KEY")
    if API_KEY and x_api_key != API_KEY:
        raise HTTPException(status_code=401, detail="Unauthorized")

    if not request.jobs or not request.jobseekers:
        raise HTTPException(status_code=400, detail="Jobs and Jobseekers cannot be empty.")

    scores = []

    # Pre-encode seekers
    seeker_embeddings = {
        seeker.seekerId: _model.encode(
            " ".join(seeker.skills), convert_to_tensor=True
        )
        for seeker in request.jobseekers
        if seeker.skills
    }

    for job in request.jobs:
        if not job.skills:
            continue

        job_text = " ".join(job.skills)
        job_emb = _model.encode(job_text, convert_to_tensor=True)

        for seeker in request.jobseekers:
            seeker_emb = seeker_embeddings.get(seeker.seekerId)
            if seeker_emb is None:
                continue

            similarity = util.cos_sim(job_emb, seeker_emb).item()

            if similarity >= SIMILARITY_THRESHOLD:
                scores.append({
                    "jobId": job.jobId,
                    "seekerId": seeker.seekerId,
                    "score": round(similarity, 4)
                })

    scores.sort(key=lambda x: x["score"], reverse=True)

    return scores
