// src/modules/jobseeker/jobseeker.model.ts
import mongoose, { Schema, Document } from "mongoose";
import { Model } from "mongoose";

export interface IResume extends Document {
   userId:mongoose.Types.ObjectId;
  filename: string;
  originalName: string;
  parsed: any;
  createdAt: Date;
}

const ResumeSchema: Schema = new Schema({
 userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        index:true,
        required:true
    },
  filename: { type: String, required: true },
  originalName: { type: String, required: true },
  parsed: { type: Schema.Types.Mixed, default: {} },
  createdAt: { type: Date, default: Date.now },
});

const ResumeModel: Model<IResume> =
  mongoose.models.Resume || mongoose.model<IResume>("Resume", ResumeSchema);

export default ResumeModel;