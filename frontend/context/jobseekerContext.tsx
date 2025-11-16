"use client";

import { createContext, useContext, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/app/api/jobseeker/api";
import { AxiosResponse } from "axios";


export interface JobseekerProfileType {
  resumeFile: {
    filename: string;
    originalName: string;
    fileUrl?: string;
  };
  parsedData: Record<string, any>; 
  resumeParsed: boolean;
  profileCompletion: number;
  createdAt?: string;
  updatedAt?: string;
  _id?: string;
  userId?: string;
}

interface JobSeekerContextType {
  profile: JobseekerProfileType | null;
  isLoading: boolean;
  refetchProfile: () => void;
}

const JobSeekerContext = createContext<JobSeekerContextType | undefined>(undefined);

export const JobSeekerProvider = ({ children }: { children: ReactNode }) => {
  const { data, isLoading, refetch } = useQuery<AxiosResponse<{ profile: JobseekerProfileType }>>({
    queryKey: ["jobseeker-profile"],
    queryFn: getProfile,
    enabled: false, // manual fetch
  });

  return (
    <JobSeekerContext.Provider
      value={{
        profile: data?.data?.profile ?? null, // get the inner profile object
        isLoading,
        refetchProfile: refetch,
      }}
    >
      {children}
    </JobSeekerContext.Provider>
  );
};

// -----------------------------
// Hook
// -----------------------------
export const useJobSeeker = () => {
  const context = useContext(JobSeekerContext);
  if (!context) throw new Error("useJobSeeker must be used inside JobSeekerProvider");
  return context;
};
