import axios from "axios";
import { BadRequestException } from "../../common/utils/catch-errors";
import { config } from "../../config/app.config";
import JobModel, { IJob as JobDocument } from "../../database/models/JobPost.model";
import JobseekerProfileModel, { IJobseekerProfile as JobseekerProfileDocument } from "../../database/models/JobseekerProfileModel";

export class JobReccomendationService {
  
  public async getAllJobreccomendation(userId: string) {
 
  const profile = await JobseekerProfileModel.findOne({ userId });
  if (!profile || !profile.resumeParsed) {
    throw new BadRequestException("Resume is not parsed yet");
  }

  const resumeText = JSON.stringify(profile.parsedData || {});

  const jobs: JobDocument[] = await JobModel.find({ status: "published" }).populate('companyId', 'companyName userId hiringEmail');
  if (!jobs || jobs.length === 0) return [];

  //  Prepare data for AI parser
  const jobBlocks = jobs.map((job) => ({
    jobId: job._id.toString(),
    title: job.title || "",
    text: [
      `Role: ${job.role || ""}`,
      `Description: ${job.description || ""}`,
      `Required Skills: ${job.requiredSkills?.join(", ") || ""}`,
      `Skills: ${job.skills?.join(", ") || ""}`,
      `Responsibilities: ${job.responsibilities?.join(", ") || ""}`,
      `Requirements: ${job.requirements?.join(", ") || ""}`,
    ].join("\n"),
  }));

  //  Call AI parser
  const AI_URL = config.PARSER_URL;
  const PARSER_API_KEY = config.PARSER_API_KEY;

  let response;
  try {
    response = await axios.post(
      `${AI_URL}/match-jobs`,
      { resumeText, jobs: jobBlocks },
      { headers: { "x-api-key": PARSER_API_KEY } }
    );
  } catch (err: any) {
    throw new BadRequestException("AI parser error: " + err.message);
  }

  const matches: { jobId: string; matchPercentage: number }[] = response.data;

  //  Merge match % with job and company info
  const finalResults = matches
    .map((match) => {
      const job = jobs.find((j) => j._id.toString() === match.jobId);
      if (!job) return null;

      const company = job.companyId as any; 

      return {
        ...job.toObject(),
        matchPercentage: match.matchPercentage,
        companyName: company?.companyName || "N/A",
        recruiterId: company?.userId || null,
        hiringEmail: company?.hiringEmail || "N/A",
      };
    })
    .filter((j): j is Record<string, any> => j !== null);

  // Sort by highest match % first
  finalResults.sort((a, b) => b.matchPercentage - a.matchPercentage);

  return finalResults;
}

}
