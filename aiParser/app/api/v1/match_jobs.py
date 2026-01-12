from fastapi import APIRouter, Header, HTTPException
from pydantic import BaseModel
from typing import List
import os
from sentence_transformers import SentenceTransformer, util

router = APIRouter()

# Load BERT once globally
model = SentenceTransformer("sentence-transformers/all-mpnet-base-v2")

# Pydantic models
class JobItem(BaseModel):
    jobId: str
    text: str
    title: str

class MatchRequest(BaseModel):
    resumeText: str
    jobs: List[JobItem]

# API endpoint
@router.post("/match-jobs")
async def smart_match_jobs(request: MatchRequest, x_api_key: str = Header(None)):
    API_KEY = os.getenv("PARSER_API_KEY")
    if API_KEY and x_api_key != API_KEY:
        raise HTTPException(status_code=401, detail="Unauthorized")

    if not request.jobs:
        return []

    resume_embedding = model.encode(request.resumeText, convert_to_tensor=True)
    results = []

    for job in request.jobs:
        job_text = f"{job.title}. {job.text}"  # title + all job info
        job_embedding = model.encode(job_text, convert_to_tensor=True)

        similarity = util.cos_sim(resume_embedding, job_embedding).item()
        match_percentage = round(float(similarity) * 100, 2)

        # Keep only matches >=50%
        if match_percentage >= 20:
            results.append({
                "jobId": job.jobId,
                "matchPercentage": match_percentage
            })

    # Sort top matches
    results.sort(key=lambda x: x["matchPercentage"], reverse=True)

    # Optional: return only top 10 matches
    return results

