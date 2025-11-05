import { Request, Response } from "express";
import fs from "fs";
import FormData from "form-data";
import axios from "axios";
import ResumeModel from "../../database/models/ResumeModel";
import { config } from "../../config/app.config";
import {
  BadRequestException,
  NotFoundException,
} from "../../common/utils/catch-errors";
import UserModel from "../../database/models/user.model";
export class JobseekerService {

public async getResumeData(userId:string){
  const user = await UserModel.findById(userId)
  let parsedResume
  if(user?.resumeId){

     parsedResume = await ResumeModel.findOne({userId})
  }
  else{
    parsedResume = null
  }
  return {user , parsedResume}
}

 public async uploadResume(file: Express.Multer.File, userId?: string) {
  if (!file) throw new Error("No file provided");

  const PARSER_URL = config.PARSER_URL;
  const PARSER_API_KEY = config.PARSER_API_KEY;

  try {
    // Attach file to multipart form
    const form = new FormData();
    form.append("file", fs.createReadStream(file.path), file.originalname);

    const headers = {
      ...form.getHeaders(),
      "x-api-key": PARSER_API_KEY,
    };

    // Send file to AI Parser
    const uploadResp = await axios.post(`${PARSER_URL}/resume/upload`, form, {
      headers,
      timeout: 120_000,
    });

    const parsedResume = uploadResp.data;

    let savedResume;

    if (userId) {
      // Check if a resume already exists for this user
      const existing = await ResumeModel.findOne({ userId });

      if (existing) {
        // Update existing resume
        existing.filename = file.filename;
        existing.originalName = file.originalname;
        existing.parsed = parsedResume;
        savedResume = await existing.save();
      } else {
        // Create new resume
        savedResume = await ResumeModel.create({
          userId,
          filename: file.filename,
          originalName: file.originalname,
          parsed: parsedResume,
        });
      }

      // Update user profile
      await UserModel.findByIdAndUpdate(
        userId,
        { resumeParsed: true, resumeId: savedResume._id },
        { new: true }
      );
    }

    return savedResume;
  } catch (err: any) {
    throw new NotFoundException("File not found", err.message);
  } finally {
    // Always cleanup temp file
    try {
      if (file && fs.existsSync(file.path)) fs.unlinkSync(file.path);
    } catch (e) {
      console.error(e);
    }
  }
}

}
