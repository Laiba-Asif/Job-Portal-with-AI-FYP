// app/recruiter/components/CandidateCard.tsx
import React from "react";
import { CandidateRecommendation } from "@/app/api/recommendation/api";

interface Props {
  candidate: CandidateRecommendation;
}

const CandidateCard: React.FC<Props> = ({ candidate }) => {
  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      <h3 className="font-semibold text-lg">Candidate ID: {candidate.seekerId}</h3>
      <p className="text-sm text-gray-600">Job Match: {candidate.jobId}</p>
      <p className="font-medium mt-2">Score: {candidate.score}</p>
    </div>
  );
};

export default CandidateCard;
