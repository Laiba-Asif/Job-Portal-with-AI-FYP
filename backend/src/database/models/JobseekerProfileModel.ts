import mongoose, { Schema, Document, Model } from "mongoose";

export interface IJobseekerProfile extends Document {
  userId: mongoose.Types.ObjectId;
  resumeFile: {
    filename: string;
    originalName: string;
    fileUrl?: string;
  };
  resumeParsed: boolean;
  profileCompletion: number;          // 0-100%
  parsedData: Record<string, any>;    // Flexible key-value structure
  bio?: string;
  location?: string;
  createdAt: Date;
  updatedAt: Date;
}

const JobseekerProfileSchema: Schema<IJobseekerProfile> = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    resumeFile: {
      filename: { type: String, required: true },
      originalName: { type: String, required: true },
      fileUrl: { type: String },
    },
    resumeParsed: { type: Boolean, default: false },
    profileCompletion: { type: Number, default: 0, min: 0, max: 100 },
    parsedData: { type: Schema.Types.Mixed, default: {} },
    bio: { type: String },
    location: { type: String },
  },
  { timestamps: true }
);

const JobseekerProfileModel: Model<IJobseekerProfile> =
  mongoose.models.JobseekerProfile ||
  mongoose.model<IJobseekerProfile>("JobseekerProfile", JobseekerProfileSchema);

export default JobseekerProfileModel;
