import mongoose, { Schema, Document, Model } from "mongoose";

export interface IRecruiterProfile extends Document {
  userId: mongoose.Types.ObjectId;
  companyName: string;
  companyWebsite?: string;
  aboutCompany?: string;
  logoUrl?: string;
  location?: string;
  createdAt: Date;
  updatedAt: Date;
}

const RecruiterProfileSchema: Schema<IRecruiterProfile> = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    companyName: { type: String, required: true },
    companyWebsite: { type: String },
    aboutCompany: { type: String },
    logoUrl: { type: String },
    location: { type: String },
  },
  { timestamps: true }
);

const RecruiterProfileModel: Model<IRecruiterProfile> =
  mongoose.models.RecruiterProfile ||
  mongoose.model<IRecruiterProfile>("RecruiterProfile", RecruiterProfileSchema);

export default RecruiterProfileModel;
