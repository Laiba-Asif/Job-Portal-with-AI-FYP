import mongoose, { Schema, Document, Model } from "mongoose";

export interface IRecruiterProfile extends Document {
  userId: mongoose.Types.ObjectId;

  // Company Identity
  companyName: string;
  industry?: string;
  companySize?: string; // "1-10", "11-50", "51-200", etc.
  foundedYear?: number;
  headquarters?: string;

  // Branding & Description
  aboutCompany?: string;
  mission?: string;
  vision?: string;
  values?: string[];
  logoUrl?: string;
  bannerUrl?: string;

  // Contact Info
  country?: string;
  city?: string;
  address?: string;
  phone?: string;

  // Social Links
  website?: string;
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;

  // Hiring Details
  hiringEmail?: string;
  hiringManager?: string;
  departments?: string[];

  // Status
  profileCompletion: number;

  createdAt: Date;
  updatedAt: Date;
}

const RecruiterProfileSchema: Schema<IRecruiterProfile> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
      unique: true, // 🔥 prevents multiple profiles per recruiter
    },

    // ----------- Company Identity -----------
    companyName: { type: String, required: true, trim: true },
    industry: { type: String, trim: true },
    companySize: { type: String },
    foundedYear: { type: Number, min: 1800, max: new Date().getFullYear() },
    headquarters: { type: String },

    // ----------- Branding -----------
    aboutCompany: { type: String },
    mission: { type: String },
    vision: { type: String },
    values: [{ type: String }],
    logoUrl: { type: String },
    bannerUrl: { type: String },

    // ----------- Contact -----------
    country: { type: String },
    city: { type: String },
    address: { type: String },
    phone: { type: String },

    // ----------- Social Media -----------
    website: { type: String },
    linkedin: { type: String },
    twitter: { type: String },
    facebook: { type: String },
    instagram: { type: String },

    // ----------- Hiring Info -----------
    hiringEmail: { type: String },
    hiringManager: { type: String },
    departments: [{ type: String }],

    // ----------- Status -----------
    profileCompletion: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const RecruiterProfileModel: Model<IRecruiterProfile> =
  mongoose.models.RecruiterProfile ||
  mongoose.model<IRecruiterProfile>("RecruiterProfile", RecruiterProfileSchema);

export default RecruiterProfileModel;
