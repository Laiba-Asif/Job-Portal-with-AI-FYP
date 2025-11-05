import os
from dotenv import load_dotenv

from fastapi import APIRouter, UploadFile, File, HTTPException, Header
from fastapi.responses import JSONResponse
from app.services.resumeText import get_resume_text
from app.services.parse_resume import parse_resume_text
import traceback
import logging


router = APIRouter()
logger = logging.getLogger(__name__)
load_dotenv()
API_KEY = os.getenv("API_KEY")

@router.post("/upload")
async def upload_resume(
    file: UploadFile = File(...),
    x_api_key: str = Header(None)
):
    # 🔐 Validate API key
    if x_api_key != API_KEY:  # replace with env config later
        raise HTTPException(status_code=401, detail="Unauthorized")

    try:
        # get both text + links from parser service
        resume_data = await get_resume_text(file)

        text = resume_data.get("text", "")
        links = resume_data.get("links", [])
        parsed = parse_resume_text(text, links)


        return JSONResponse(content={
            "status": "success",
            "data": parsed
        })

    except Exception as e:
        tb = traceback.format_exc()
        logger.error(f"Resume parsing failed: {e}\n{tb}")
        raise HTTPException(status_code=500, detail=f"Resume parsing failed: {str(e)}")

