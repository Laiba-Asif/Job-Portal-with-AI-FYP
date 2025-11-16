import { BadRequestException, NotFoundException } from "../../common/utils/catch-errors";
import RecruiterProfileModel, { IRecruiterProfile } from "../../database/models/RecruiterProfile.model";
import UserModel from "../../database/models/user.model";

export class RecruiterService {
  // -------------------- GET PROFILE --------------------
  public async getProfileData(userId: string) {
    if (!userId) throw new BadRequestException("User ID missing");

    const profile = await RecruiterProfileModel.findOne({ userId }).select("-__v");
    if (!profile) throw new NotFoundException("Profile not found");

    return profile;
  }

  // -------------------- CREATE / POST PROFILE --------------------
 // -------------------- CREATE PROFILE ONLY ONCE --------------------
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
}
