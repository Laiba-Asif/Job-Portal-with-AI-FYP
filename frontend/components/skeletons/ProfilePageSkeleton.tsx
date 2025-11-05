"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, Award, BadgeCheck, User, Briefcase } from "lucide-react";
import { useJobSeeker } from "@/context/jobseekerContext";

export default function ProfilePage() {
  const { resume, isLoading } = useJobSeeker();

  // 🟢 Skeleton (Loading State)
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 py-10 animate-pulse">
        <Card className="p-6 shadow-md">
          <div className="h-6 w-40 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-64 bg-gray-200 rounded"></div>
        </Card>
        <Card className="p-6 shadow-md">
          <div className="h-5 w-32 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
            <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
          </div>
        </Card>
        <Card className="p-6 shadow-md">
          <div className="h-5 w-28 bg-gray-200 rounded mb-4"></div>
          <div className="flex flex-wrap gap-2">
            <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
            <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
            <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
          </div>
        </Card>
      </div>
    );
  }

  // 🟢 Empty State (No Resume Uploaded Yet)
  if (!resume) {
    return (
      <div className="max-w-3xl mx-auto py-12 flex flex-col items-center space-y-6">
        <User className="w-16 h-16 text-indigo-500" />
        <h2 className="text-2xl font-semibold text-gray-800">No Resume Found</h2>
        <p className="text-gray-500 text-center max-w-sm">
          You haven’t uploaded a resume yet. Upload your resume to build your professional profile and showcase your skills.
        </p>
        <Button className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-400 text-white rounded-full px-6">
          Upload Resume
        </Button>
      </div>
    );
  }

  // 🟢 Actual Profile
  return (
    <div className="max-w-4xl mx-auto space-y-8 py-8">
      {/* Personal Info */}
      <Card className="shadow-sm border border-gray-100 rounded-2xl">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-800">
            <User className="w-5 h-5 text-indigo-500" />
            {resume?.personal_info?.name || "Unnamed User"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-indigo-600 font-medium">{resume?.job_title || "No job title"}</p>
          <p className="text-sm text-gray-500 mt-1">
            {resume?.seniority || "N/A"} • {resume?.years_of_experience || 0} years experience
          </p>
        </CardContent>
      </Card>
      {/* Education, Certifications, Skills, Experience... */}
    </div>
  );
}
