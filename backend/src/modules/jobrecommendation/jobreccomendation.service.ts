import axios from "axios";
import { BadRequestException } from "../../common/utils/catch-errors";
import { config } from "../../config/app.config";
import JobModel, { IJob as JobDocument } from "../../database/models/JobPost.model";
import JobseekerProfileModel, { IJobseekerProfile as JobseekerProfileDocument } from "../../database/models/JobseekerProfileModel";

export class JobReccomendationService {
  public async getAllJobreccomendation(userId: string) {
  
    const profile: JobseekerProfileDocument | null = await JobseekerProfileModel.findOne({ userId });

    if (!profile || !profile.resumeParsed) {
      throw new BadRequestException("Resume is not parsed yet");
    }

    const resumeText = JSON.stringify(profile.parsedData || {});

    const jobs: JobDocument[] = await JobModel.find({ status: "published" });
    if (jobs.length === 0) return [];

    const jobBlocks = jobs.map(job => ({
      jobId: job._id.toString(),
      text: `
        Title: ${job.title}
        Role: ${job.role}
        Description: ${job.description}
        Required Skills: ${job.requiredSkills?.join(", ") || ""}
        Skills: ${job.skills?.join(", ") || ""}
      `
    }));

    const AI_URL = config.PARSER_URL;
    const PARSER_API_KEY = config.PARSER_API_KEY;

    const response = await axios.post(
      `${AI_URL}/match-jobs`,
      { resumeText, jobs: jobBlocks },
      { headers: { "x-api-key": PARSER_API_KEY } }
    );

    const scores: { jobId: string; score: number }[] = response.data;

    const finalResults = scores
      .map(result => {
        const job = jobs.find((j: JobDocument) => j._id.toString() === result.jobId);
        if (!job) return null;
        return {
          ...job.toObject(),
          similarityScore: result.score
        };
      })
      .filter((j): j is Record<string, any> => j !== null); 

    finalResults.sort((a, b) => b.similarityScore - a.similarityScore);

    return finalResults;
  }
}
