"use client";

import { JobRecommendation } from "@/app/api/recommendation/api";
import { MapPin, Clock, DollarSign, Heart, Eye, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Props {
  job: JobRecommendation;
}

export default function JobCard({ job }: Props) {
  return (
    <div className="p-4 border border-blue-200 rounded-lg hover:shadow-sm transition-shadow">
      {/* Header: Title + Match % */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-blue-700 mb-1">{job.title}</h3>
          <p className="text-gray-600 mb-2">{job.companyName || job.companyId?.companyName || "Company Name"}</p>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {job.location || "N/A"}
            </span>
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {job.openings ? `${job.openings} openings` : "N/A"}
            </span>
            <span className="flex items-center">
              <DollarSign className="w-4 h-4 mr-1" />
              {job.salaryMin && job.salaryMax
                ? `${job.salaryCurrency || "USD"} ${job.salaryMin} - ${job.salaryMax}`
                : "N/A"}
            </span>
          </div>
        </div>
        <Badge className="bg-green-100 text-green-800 font-medium">
          {job.matchPercentage}% match
        </Badge>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mt-3 mb-3">
        {job.skills?.map((skill) => (
          <Badge
            key={skill}
            variant="secondary"
            className="text-xs bg-gray-100 text-gray-800"
          >
            {skill}
          </Badge>
        ))}
      </div>

      {/* Footer: Job Type + Actions */}
      <div className="flex items-center justify-between">
        <Badge variant="outline" className="text-xs">
          {job.jobType || "N/A"}
        </Badge>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Heart className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Eye className="w-4 h-4" />
          </Button>
          {job.applied ? (
            <Badge className="bg-blue-100 text-blue-800">Applied</Badge>
          ) : (
            <Button size="sm" className="border border-blue-200 bg-blue-600 text-white">
              <Send className="w-4 h-4 mr-1" />
              Apply
            </Button>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="mt-3 text-gray-700">{job.description}</p>
      {/* Optional: Hiring email */}
      {job.hiringEmail && (
        <p className="mt-1 text-sm text-gray-500">Contact: {job.hiringEmail}</p>
      )}
    </div>
  );
}
