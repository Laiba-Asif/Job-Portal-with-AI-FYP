// /app/jobseeker/components/JobCard.tsx
"use client";

import { JobRecommendation } from "@/app/api/recommendation/api";

interface Props {
  job: JobRecommendation;
}

export default function JobCard({ job }: Props) {
  return (
    <div className="p-4 bg-white rounded-lg shadow hover:shadow-md transition">
      <h3 className="text-lg font-bold">{job.title}</h3>
      <p className="text-sm text-gray-500">{job.role}</p>
      <p className="mt-2 text-gray-700">{job.description}</p>
      <p className="mt-2 text-sm text-gray-600">
        Skills: {job.skills?.join(", ") || "N/A"}
      </p>
      <p className="mt-1 text-sm text-gray-600">
        Required: {job.requiredSkills?.join(", ") || "N/A"}
      </p>
      <p className="mt-1 text-sm font-semibold text-blue-600">
        Match Score: {job.similarityScore.toFixed(2)}
      </p>
    </div>
  );
}
