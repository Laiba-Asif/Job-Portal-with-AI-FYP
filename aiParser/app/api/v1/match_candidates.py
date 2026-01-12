from fastapi import APIRouter, Header, HTTPException
from pydantic import BaseModel
from typing import List
from sentence_transformers import SentenceTransformer, util
import os

router = APIRouter()

# Same model used for job recommendations
model = SentenceTransformer("sentence-transformers/all-mpnet-base-v2")

class JobItem(BaseModel):
    jobId: str
    title: str
    text: str   # full job data

class SeekerItem(BaseModel):
    seekerId: str
    resumeText: str  # full resume

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

    results = []

    # Pre-encode all resume embeddings
    seeker_embeddings = {
        seeker.seekerId: model.encode(seeker.resumeText, convert_to_tensor=True)
        for seeker in request.jobseekers
    }

    for job in request.jobs:
        job_embedding = model.encode(job.text, convert_to_tensor=True)

        for seeker in request.jobseekers:
            seeker_emb = seeker_embeddings.get(seeker.seekerId)
            if seeker_emb is None:
                continue

            similarity = util.cos_sim(job_embedding, seeker_emb).item()
            match_percentage = round(float(similarity) * 100, 2)

            # Keep matches above threshold
            if match_percentage >= 20:
                results.append({
                    "jobId": job.jobId,
                    "seekerId": seeker.seekerId,
                    "matchPercentage": match_percentage
                })

    # Sort by match score
    results.sort(key=lambda x: x["matchPercentage"], reverse=True)
    return results

