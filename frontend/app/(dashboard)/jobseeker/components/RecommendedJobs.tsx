// /app/jobseeker/components/JobRecommendations.tsx
"use client";

import { getAllJobreccomendation, JobRecommendation } from "@/app/api/recommendation/api";
import { useQuery } from "@tanstack/react-query";
import JobCard from "./JobCard";

interface Props {
  dashboard?: boolean; 
}

export default function JobRecommendations({ dashboard = false }: Props) {
  const { data: jobs, isLoading, isError } = useQuery<JobRecommendation[]>({
    queryKey: ["jobRecommendations"],
    queryFn: getAllJobreccomendation,
    staleTime: 0,
    refetchInterval: 1000 * 60 * 3, 
    refetchOnWindowFocus: true, 
  });

  console.log('jobs',jobs)

  if (isLoading) return <p>Loading recommendations...</p>;
  if (isError) return <p>Failed to load job recommendations.</p>;
  if (!jobs || jobs.length === 0) return <p>No job recommendations found.</p>;

  
  const displayedJobs = dashboard ? jobs.slice(0, 3) : jobs;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {displayedJobs.map((job) => (
        <JobCard key={job._id} job={job} />
      ))}
    </div>
  );
}
