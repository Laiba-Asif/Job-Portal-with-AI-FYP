"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { useJobSeeker } from "@/context/jobseekerContext";
import ProfileSkeleton from "@/components/skeletons/profileSkeleton";

interface ParsedResume {
  data: {
    seniority?: string;
    job_title?: string;
    skills?: string[];
  };
}

interface ResumeWithParsed {
  parsed?: ParsedResume;
}

export default function ProfileSummary() {
  const { user, resume, isLoading } = useJobSeeker();

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  // Extend resume with parsed
  const parsedResume = (resume as ResumeWithParsed)?.parsed;

  return (
    <Card className="bg-white border border-gray-100 shadow-sm rounded-2xl">
      <CardHeader className="pb-0">
        <CardTitle className="text-lg font-semibold text-gray-800">
          Profile Strength
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-4 space-y-6">
        {/* Avatar + Info */}
        <div className="flex flex-col items-center">
          <div className="relative">
            {/* Outer progress ring */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-600 via-purple-500 to-cyan-400 p-1">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                <div className="w-20 h-20 bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 rounded-full flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>
            {/* Badge */}
            {resume && (
              <span className="absolute bottom-0 right-0 bg-gradient-to-tr from-blue-500 to-cyan-400 text-white text-xs rounded-full px-2 py-1 shadow">
                90%
              </span>
            )}
          </div>

          <h3 className="mt-3 font-semibold text-gray-900">
            {user?.name ?? "Anonymous"}
          </h3>

          {parsedResume?.data && (
            <p className="text-sm text-gray-600">
              {parsedResume.data.seniority ?? ""}{" "}
              {parsedResume.data.job_title ?? ""}
            </p>
          )}
        </div>

        {/* Progress Section */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">
                Profile Completed
              </span>
              <button className="text-xs font-semibold text-blue-600 hover:underline">
                Complete Now
              </button>
            </div>
            <Progress value={90} className="h-2 bg-blue-100" />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">
                Profile Strength
              </span>
              <button className="text-xs font-semibold text-blue-600 hover:underline">
                Complete Now
              </button>
            </div>
            <Progress value={70} className="h-2 bg-blue-100" />
          </div>
        </div>

        {/* Skills */}
        <div>
          <h4 className="font-medium text-gray-800 mb-2">Top Skills</h4>
          {parsedResume?.data?.skills?.length ? (
            <div className="flex flex-wrap gap-2">
              {parsedResume.data.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 text-sm font-medium rounded-full
                             bg-gradient-to-r from-indigo-50 to-cyan-50 
                             text-gray-700 border border-gray-200
                             shadow-sm hover:shadow-md hover:scale-105 
                             transition-all duration-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No Resume uploaded yet</p>
          )}
        </div>

        <Button
          onClick={() => {
            window.location.href = "/jobseeker/edit-profile";
          }}
          className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-400 
                     hover:from-indigo-700 hover:via-purple-700 hover:to-cyan-400 
                     text-white rounded-full"
        >
          Edit Profile
        </Button>
      </CardContent>
    </Card>
  );
}
