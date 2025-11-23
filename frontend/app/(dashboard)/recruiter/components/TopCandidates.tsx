"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getCandidateRecommendation } from "@/app/api/recommendation/api";
import CandidateCard from "./CandidateCard";

interface Props {
  dashboard?: boolean;
}

const TopCandidates: React.FC<Props> = ({ dashboard = false }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["topCandidates"],
    queryFn: getCandidateRecommendation,
    staleTime: 0,
    refetchInterval: 1000 * 60 * 3, 
    refetchOnWindowFocus: true, 
  });

  console.log("data",data)
  if (isLoading) return <p>Loading candidates...</p>;
  if (isError) return <p>Failed to fetch candidates.</p>;
  if (!data || data.length === 0) return <p>No candidates found.</p>;


  const candidatesToShow = dashboard ? data.slice(0, 3) : data;

  return (
    <div>
      {candidatesToShow.map((cand) => (
        <CandidateCard
          key={`${cand.jobId}-${cand.seekerId}`}
          candidate={cand}
        />
      ))}
    </div>
  );
};

export default TopCandidates;
