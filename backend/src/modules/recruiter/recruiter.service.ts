import axios from "axios";
import { BadRequestException, NotFoundException } from "../../common/utils/catch-errors";
import { config } from "../../config/app.config";
import JobModel from "../../database/models/JobPost.model";
import JobseekerProfileModel from "../../database/models/JobseekerProfileModel";
import RecruiterProfileModel, { IRecruiterProfile } from "../../database/models/RecruiterProfile.model";
import UserModel from "../../database/models/user.model";
import { Types } from "mongoose";

export class RecruiterService {
  // -------------------- GET PROFILE --------------------
  public async getProfileData(userId: string) {
    if (!userId) throw new BadRequestException("User ID missing");

    const profile = await RecruiterProfileModel.findOne({ userId }).select("-__v");
    if (!profile) throw new NotFoundException("Profile not found");

    return profile;
  }

 public async postProfileData(userId: string, body: Partial<IRecruiterProfile>) {
  if (!userId) throw new BadRequestException("User ID missing");

  const existingProfile = await RecruiterProfileModel.findOne({ userId });

  if (existingProfile) {
    throw new BadRequestException("Profile already exists. Use UPDATE instead.");
  }

  // -------------------- Profile Completion Logic --------------------
  const requiredFields: (keyof IRecruiterProfile)[] = [
    "companyName",
    "industry",
    "companySize",
    "aboutCompany",
    "country",
    "city",
    "address",
    "website",
    "hiringEmail",
  ];

  let filled = 0;
  requiredFields.forEach((field) => {
    if (body[field]) filled++;
  });

  const profileCompletion = Math.round((filled / requiredFields.length) * 100);
  body.profileCompletion = profileCompletion;

  // -------------------- CREATE PROFILE --------------------
  const profile = await RecruiterProfileModel.create({
    userId,
    ...body,
  });

  // -------------------- UPDATE USER DOCUMENT --------------------
  await UserModel.findByIdAndUpdate(
    userId,
    {
      $set: {
        profileId: profile._id,
        profileModel: "RecruiterProfile",
      },
    },
    { new: true }
  );

  return profile;
}



  // -------------------- UPDATE PROFILE --------------------
  public async updateProfileData(userId: string, body: Partial<IRecruiterProfile>) {
    if (!userId) throw new BadRequestException("User ID missing");

    const profile = await RecruiterProfileModel.findOne({ userId });
    if (!profile) throw new NotFoundException("Profile not found");

    const requiredFields: (keyof IRecruiterProfile)[] = [
      "companyName",
      "industry",
      "companySize",
      "aboutCompany",
      "country",
      "city",
      "address",
      "website",
      "hiringEmail",
    ];

    let filled = 0;
    requiredFields.forEach((field) => {
      if (body[field] || (profile[field] as any)) filled++;
    });

    const profileCompletion = Math.round((filled / requiredFields.length) * 100);

    const updatedProfile = await RecruiterProfileModel.findOneAndUpdate(
      { userId },
      { $set: { ...body, profileCompletion } },
      { new: true }
    );

    return updatedProfile;
  }

  // ai based candidates recommendation

  public async getCandidates(recruiterId: string) {
    if (!recruiterId) throw new BadRequestException("User ID missing");
    const jobs = await JobModel.find({ recruiterId: recruiterId, status: "published" });
     if (!jobs || jobs.length === 0) {
      throw new BadRequestException("Recruiter has no posted jobs.");
    }

     const jobBlocks = jobs.map(job => ({
      jobId: job._id.toString(),
      title: job.title,
      text: `
        Title: ${job.title}
        Description: ${job.description}
        Required Skills: ${job.requiredSkills?.join(", ") || ""}
        Skills: ${job.skills?.join(", ") || ""}
      `,
      skills: job.requiredSkills ?? []
    }));

    const jobseekers = await JobseekerProfileModel.find({ resumeParsed: true });

    const seekerBlocks = jobseekers.map(profile => ({
      seekerId: profile.userId,
      skills: profile.parsedData?.skills || [],
      resumeText: JSON.stringify(profile.parsedData || {})
    }));

    const AI_URL = config.PARSER_URL;
    const PARSER_API_KEY = config.PARSER_API_KEY;

    const response = await axios.post(
      `${AI_URL}/match-candidates`,
      { jobs: jobBlocks, jobseekers: seekerBlocks },
      { headers: { "x-api-key": PARSER_API_KEY } }
    );

    const scores = response.data; // { jobId, seekerId, score }

    // Attach jobseeker details
    const finalResults = scores.map((item: { seekerId: Types.ObjectId; }) => {
      const seeker = jobseekers.find(s => s.userId === item.seekerId);
      return {
        ...item,
        seekerProfile: seeker ? seeker.toObject() : null
      };
    });

    return finalResults;
  }
}
