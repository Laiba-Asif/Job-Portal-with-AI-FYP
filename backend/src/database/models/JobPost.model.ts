import mongoose, { Schema, Document, Model } from "mongoose";

export interface IJob extends Document {
  recruiterId: mongoose.Types.ObjectId;
  companyId: mongoose.Types.ObjectId;

  title: string;
  role: string;
  department?: string;
  description: string;

  jobType: "Full-time" | "Part-time" | "Internship" | "Contract" | "Remote" | "Hybrid";
  experienceLevel: "Junior" | "Mid" | "Senior" | "Lead" | "Director";

  requiredSkills: string[];  
  skills: string[];          
  responsibilities?: string[];
  requirements?: string[];

  location: string;
  city?: string;
  country?: string;

  salaryMin?: number;
  salaryMax?: number;
  salaryCurrency?: string;

  openings: number;

  applicationDeadline?: Date;
  status: "draft" | "published" | "closed";

  // ATS Counts
  appliedCount: number;
  shortlistedCount: number;
  interviewedCount: number;
  hiredCount: number;

  createdAt: Date;
  updatedAt: Date;
}

const JobSchema: Schema<IJob> = new Schema(
  {
    recruiterId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    companyId: { type: Schema.Types.ObjectId, ref: "RecruiterProfile", required: true },

    title: { type: String, required: true },
    role: { type: String, required: true },
    department: { type: String },

    description: { type: String, required: true },

    jobType: {
      type: String,
      enum: ["Full-time", "Part-time", "Internship", "Contract", "Remote", "Hybrid"],
      required: true,
    },

    experienceLevel: {
      type: String,
      enum: ["Junior", "Mid", "Senior", "Lead", "Director"],
      required: true,
    },

    requiredSkills: [{ type: String, required: true }],  // new required skills
    skills: [{ type: String }],                           // optional/desirable skills
    responsibilities: [{ type: String }],
    requirements: [{ type: String }],

    location: { type: String, required: true },
    city: { type: String },
    country: { type: String },

    salaryMin: { type: Number },
    salaryMax: { type: Number },
    salaryCurrency: { type: String, default: "USD" },

    openings: { type: Number, default: 1 },

    applicationDeadline: { type: Date },

    status: {
      type: String,
      enum: ["draft", "published", "closed"],
      default: "draft",
    },

    appliedCount: { type: Number, default: 0 },
    shortlistedCount: { type: Number, default: 0 },
    interviewedCount: { type: Number, default: 0 },
    hiredCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const JobModel: Model<IJob> =
  mongoose.models.Job || mongoose.model<IJob>("Job", JobSchema);

export default JobModel;
