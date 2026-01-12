"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Building2 } from "lucide-react";
import Link from "next/link";
import { useRecruiter } from "@/context/recruiterContext";
import { useAuthContext } from "@/context/auth-provider";
import ProfileSkeleton from "@/components/skeletons/profileSkeleton";
import { useState } from "react";

export default function RecruiterProfileSummary() {
  const { profile, isLoading } = useRecruiter();
  const { user } = useAuthContext();

  const [logoError, setLogoError] = useState(false);

  if (isLoading) return <ProfileSkeleton />;

  const progressColor =
    profile?.profileCompletion && profile.profileCompletion < 50
      ? "bg-red-400"
      : profile?.profileCompletion < 80
      ? "bg-yellow-400"
      : "bg-green-400";

  const showFallback = !profile?.logoUrl || logoError;

  return (
    <Card className="bg-white border border-gray-100 shadow-lg rounded-2xl">
      <CardHeader className="pb-0 text-center">
        <CardTitle className="text-xl font-bold text-gray-900">
          Company Profile Strength
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-4 space-y-6">
        {/* Company Logo */}
        <div className="flex flex-col items-center">
          
          {/* LOGO DISPLAY */}
          {!showFallback ? (
            <img
              src={profile.logoUrl}
              alt="Company Logo"
              className="w-28 h-28 rounded-full object-cover shadow-lg border"
              onError={() => setLogoError(true)}
            />
          ) : (
            <div className="w-28 h-28 bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 
                            text-white rounded-full flex items-center justify-center shadow-lg 
                            text-3xl font-bold">
              {profile?.companyName?.[0] ?? <Building2 className="w-12 h-12" />}
            </div>
          )}

          <h3 className="mt-4 text-lg font-semibold text-gray-900">
            {profile?.companyName ?? "Company Name"}
          </h3>
          <p className="text-sm text-gray-500">
            {profile?.industry ?? "Industry not added"}
          </p>
        </div>

        {/* Profile Completion */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Profile Completion</span>
            <span className="text-sm font-semibold text-gray-900">{profile?.profileCompletion ?? 0}%</span>
          </div>
          <Progress
            value={profile?.profileCompletion ?? 0}
            className={`h-3 rounded-full ${progressColor}`}
          />
        </div>

        {/* Company Info */}
        <div className="space-y-1">
          <h4 className="font-medium text-gray-800 mb-1">Company Details</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>
              <strong>Size:</strong> {profile?.companySize || "Not added"}
            </li>
            <li>
              <strong>Location:</strong> {profile?.city || "City not added"}, {profile?.country || ""}
            </li>
            <li>
              <strong>Website:</strong>{" "}
              {profile?.website ? (
                <a href={profile.website} target="_blank" className="text-blue-600 hover:underline">
                  {profile.website}
                </a>
              ) : (
                "No website added"
              )}
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col space-y-2">
          <Link href="/recruiter/profile">
            <Button className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-400 text-white rounded-full">
              Edit Company Profile
            </Button>
          </Link>

          <Link href="/recruiter/jobs">
            <Button className="w-full border border-gray-300 text-white rounded-full">
              View Jobs
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
