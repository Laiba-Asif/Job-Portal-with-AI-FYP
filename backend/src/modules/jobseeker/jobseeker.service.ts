import { Request, Response } from "express";
import fs from "fs";
import FormData from "form-data";
import axios from "axios";
import { config } from "../../config/app.config";
import {
  BadRequestException,
  NotFoundException,
} from "../../common/utils/catch-errors";
import UserModel from "../../database/models/user.model";
import ProfileModel from "../../database/models/JobseekerProfileModel";

export class JobseekerService {

  // ---------------- Get Profile ----------------
  public async getProfileData(userId: string) {
    if (!userId) throw new BadRequestException("User ID missing");

    const profile = await ProfileModel.findOne({ userId }).select("-__v");
    if (!profile) throw new NotFoundException("Profile not found");

    return profile;
  }

  // ---------------- Upload Resume ----------------
  public async uploadResume(file: Express.Multer.File, userId?: string) {
    if (!file) throw new BadRequestException("No file provided");

    const PARSER_URL = config.PARSER_URL;
    const PARSER_API_KEY = config.PARSER_API_KEY;

    try {
      // 1️⃣ Send file to AI parser
      const form = new FormData();
      form.append("file", fs.createReadStream(file.path), file.originalname);

      const headers = { ...form.getHeaders(), "x-api-key": PARSER_API_KEY };

      const uploadResp = await axios.post(`${PARSER_URL}/resume/upload`, form, {
        headers,
        timeout: 120_000,
      });

      const parsedResume = uploadResp.data;

      // 2️⃣ Find existing profile
      let profile = await ProfileModel.findOne({ userId });

      if (profile) {
        // Update existing profile
        profile.resumeFile = {
          filename: file.filename,
          originalName: file.originalname,
          fileUrl: `/uploads/${file.filename}`, // or S3 link
        };
        profile.parsedData = parsedResume;
      } else {
        // Create new profile
        profile = new ProfileModel({
          userId,
          resumeFile: {
            filename: file.filename,
            originalName: file.originalname,
            fileUrl: `/uploads/${file.filename}`,
          },
          parsedData: parsedResume,
        });
      }

      // 3️⃣ Calculate profile completion
      profile.profileCompletion = this.calculateProfileCompletion(profile);

      // 4️⃣ Mark resume as parsed
      profile.resumeParsed = true;

      // 5️⃣ Save profile
      await profile.save();

      // 6️⃣ Update user profileId
      await UserModel.findByIdAndUpdate(userId, {
        profileId: profile._id,
      });

      return profile;
    } catch (err: any) {
      throw new NotFoundException("File not found", err.message);
    } finally {
      // Cleanup temp file
      try {
        if (file && fs.existsSync(file.path)) fs.unlinkSync(file.path);
      } catch (e) {
        console.error("Cleanup error:", e);
      }
    }
  }

  // ---------------- Calculate Profile Completion ----------------
  private calculateProfileCompletion(profile: any): number {
    // Define important fields to check
    const fields = [
      "resumeFile.filename",
      "parsedData.personal_info.name",
      "parsedData.experience",
      "parsedData.education",
      "parsedData.skills",
      "parsedData.certifications",
      "parsedData.projects",
      "parsedData.keywords",
      "parsedData.links.linkedin",
    ];

    let filledCount = 0;

    for (const field of fields) {
      const keys = field.split(".");
      let value: any = profile;

      for (const key of keys) {
        value = value?.[key];
      }

      if (value) {
        if (Array.isArray(value)) {
          if (value.length > 0) filledCount++;
        } else if (typeof value === "string" && value.trim() !== "") {
          filledCount++;
        } else if (typeof value === "object") {
          filledCount++;
        }
      }
    }

    // Percentage
    return Math.floor((filledCount / fields.length) * 100);
  }
}
