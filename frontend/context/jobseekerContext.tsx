"use client";

import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getResume } from "@/app/api/jobseeker/api";
import { AxiosResponse } from "axios";

// -----------------------------
// API Response type
// -----------------------------
interface ResumeApiResponse {
  user: any;
  parsedResume: any;
}

// -----------------------------
// Context type
// -----------------------------
interface JobSeekerContextType {
  user: any;
  resume: any;
  isLoading: boolean;
  refetchResume: () => void;
}

const JobSeekerContext = createContext<JobSeekerContextType | undefined>(
  undefined
);

export const JobSeekerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {
    data,
    isLoading,
    refetch: refetchResume,
  } = useQuery<AxiosResponse<ResumeApiResponse>>({
    queryKey: ["jobseeker"],
    queryFn: getResume,
    enabled: false,
  });

  console.log(data)

  return (
    <JobSeekerContext.Provider
      value={{
        user: data?.data?.user ?? null,
        resume: data?.data?.parsedResume ?? null,
        isLoading,
        refetchResume,
      }}
    >
      {children}
    </JobSeekerContext.Provider>
  );
};

export const useJobSeeker = () => {
  const context = useContext(JobSeekerContext);
  if (!context) {
    throw new Error("useJobSeeker must be used inside JobSeekerProvider");
  }
  return context;
};
