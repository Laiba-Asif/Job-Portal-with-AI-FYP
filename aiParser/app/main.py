from fastapi import FastAPI
from app.api.v1 import resume
from app.api.v1 import parse_resume
from app.api.v1 import match_jobs  
from app.api.v1 import match_candidates


app = FastAPI(title="AI Resume Parser API", version="1.0")

# include routers
app.include_router(resume.router, prefix="/api/v1/resume", tags=["Resume"])
app.include_router(parse_resume.router, prefix="/api/v1/resume", tags=["Resume"])
app.include_router(match_jobs.router, prefix="/api/v1", tags=["Matching"])
app.include_router(match_candidates.router, prefix="/api/v1", tags=["Candidate Matching"])


@app.get("/")
def root():
    return {"message": "Python FastAPI backend is working with pro structure!"}

# uvicorn app.main:app --host 0.0.0.0 --port 9000 --reload


