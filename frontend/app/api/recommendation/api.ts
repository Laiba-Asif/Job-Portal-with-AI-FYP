import API from "@/lib/axios-client";


export interface JobRecommendation {
  _id: string;
  title: string;
  role: string;
  description: string;
  skills?: string[];
  requiredSkills?: string[];
  matchPercentage: number;
  companyName?: string;
  hiringEmail?: string;
  location?: string;
  jobType?: string;
  applied?: boolean;
  salaryCurrency?: string;
  salaryMin?: number;
  salaryMax?: number;
  openings?: number;
  recruiterId?: string;
  companyId?: {
    _id: string;
    userId: string;
    companyName: string;
    hiringEmail: string;
  };
}


export interface CandidateRecommendation {
  jobId: string;
  matchPercentage: number;
  seekerId: string;
  seekerProfile: {
    parsedData: {
      data: {
        personal_info?: { name?: string };
        job_title?: string;
        skills?: string[];
        years_of_experience?: number;
      };
    };
    createdAt: string;
    updatedAt: string;
  };
}


export const getAllJobreccomendation = async (): Promise<JobRecommendation[]> => {
  const response = await API.get("/recommendations"); // use GET instead of POST
  return response.data.jobs; // return the array of jobs
};
export const getCandidateRecommendation = async (): Promise<CandidateRecommendation[]> => {
  const response = await API.get("/recruiter/candidates");
  return response.data.candidates;
};