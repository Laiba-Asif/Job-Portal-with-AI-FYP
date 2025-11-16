"use client";

import { useRecruiter } from "@/context/recruiterContext";
import API from "@/lib/axios-client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface Job {
  _id: string;
  title: string;
  role: string;
  department?: string;
  description: string;
  jobType: string;
  experienceLevel: string;
  requiredSkills: string[];
  skills?: string[];
  location: string;
  salaryMin?: number;
  salaryMax?: number;
  status: string;
}

export const useJobs = () => {
  const { profile } = useRecruiter();
  const queryClient = useQueryClient();

  // Fetch all jobs
  const jobsQuery = useQuery<Job[]>({
    queryKey: ["jobs"],
    queryFn: async () => {
      const { data } = await API.get("/jobs/");
      return data.jobs;
    },
  });

  // Create Job
  const createJob = useMutation<Job, unknown, Partial<Job>>({
    mutationFn: async (job) => {
      if (!profile?._id) throw new Error("Recruiter profile not found");

      const { data } = await API.post("/jobs/", {
        ...job,
        companyId: profile._id,
      });

      return data.job;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });

  // Update Job
  const updateJob = useMutation<
    Job,
    unknown,
    { id: string; job: Partial<Job> }
  >({
    mutationFn: async ({ id, job }) => {
      const { data } = await API.put(`/jobs/${id}`, job);
      return data.job;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["jobs", id] });
    },
  });

  // Delete Job
  const deleteJob = useMutation<unknown, unknown, string>({
    mutationFn: async (id) => {
      const { data } = await API.delete(`/jobs/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });

  return { jobsQuery, createJob, updateJob, deleteJob };
};
