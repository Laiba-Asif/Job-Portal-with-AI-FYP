import API from "@/lib/axios-client";


export interface JobRecommendation {
  _id: string;
  title: string;
  role: string;
  description: string;
  skills?: string[];
  requiredSkills?: string[];
  similarityScore: number;
}

export interface CandidateRecommendation {
  jobId: string;
  seekerId: string;
  score: number;
}

export const getAllJobreccomendation = async (): Promise<JobRecommendation[]> => {
  const response = await API.get("/recommendations"); // use GET instead of POST
  return response.data.jobs; // return the array of jobs
};
export const getCandidateRecommendation = async (): Promise<CandidateRecommendation[]> => {
  const response = await API.get("/recruiter/candidates");
  return response.data.candidates;
};