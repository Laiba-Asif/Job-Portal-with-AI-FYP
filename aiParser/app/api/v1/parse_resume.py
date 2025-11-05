from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import asyncio
from app.services.parse_resume import parse_resume_text

router = APIRouter()

class RawTextInput(BaseModel):
    raw_text: str
    links: Optional[List[str]] = []

@router.post("/parse")
def parse_resume(data: RawTextInput):
    if not data.raw_text:
        raise HTTPException(status_code=400, detail="No resume text provided")

    result = parse_resume_text(data)
    return result

