import React from "react";
import { CandidateRecommendation } from "@/app/api/recommendation/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Eye, MessageSquare } from "lucide-react";

interface Props {
  candidate: CandidateRecommendation;
}

const CandidateCard: React.FC<Props> = ({ candidate }) => {
  const profile = candidate.seekerProfile?.parsedData?.data;

  const name = profile?.personal_info?.name || "Unknown Candidate";
  const title = profile?.job_title || "Not specified";
  const skills = profile?.skills || [];
  const experience = profile?.years_of_experience
    ? `${profile.years_of_experience} yrs`
    : "N/A";

  return (
    <div className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
      <div className="flex items-start space-x-4">
        
        {/* Avatar */}
        <img
          src={"/placeholder.svg"}
          alt={name}
          className="w-12 h-12 rounded-full"
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              {/* Name */}
              <h3 className="font-semibold text-gray-900">{name}</h3>

              {/* Job Title */}
              <p className="text-gray-600">{title}</p>

              {/* Location + Experience */}
              <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                <span className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  Pakistan
                </span>
                <span>{experience} experience</span>
              </div>
            </div>

            {/* Match Percentage */}
            <div className="text-right">
              <Badge className="bg-green-100 text-green-800 mb-1">
                {candidate.matchPercentage}% match
              </Badge>
              <p className="text-xs text-gray-500">
                Last active: {new Date(candidate.seekerProfile.updatedAt).toDateString()}
              </p>
            </div>
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-2 mt-2">
            {skills.slice(0, 6).map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="text-xs bg-gray-100 text-gray-800"
              >
                {skill}
              </Badge>
            ))}
          </div>

          {/* Status + Actions */}
          <div className="flex items-center justify-between mt-3">
            <Badge className="bg-green-100 text-green-800">
              Recommended
            </Badge>

            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Eye className="w-4 h-4" />
              </Button>
              <Button size="sm" className="bg-gradient-to-tr from-blue-500 to-cyan-400  hover:bg-blue-700 text-white">
                <MessageSquare className="w-4 h-4 mr-1" />
                Contact
              </Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CandidateCard;
