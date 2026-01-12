"use client";

import { use, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  Users,
  MessageSquare,
  Settings,
  Plus,
  Search,
  Filter,
  MapPin,
  Clock,
  Eye,
  Calendar,
  TrendingUp,
  UserCheck,
  FileText,
  Video,
  Bell,
  ChevronDown,
  Menu,
  X,
  BarChart2,
  DollarSign,
  Building,
  User,
  HelpCircle,
  LogOut,
  CheckCircle,
  Upload,
  Download,
  Edit,
  Trash2,
  Sliders,
} from "lucide-react";
import MetricCards from "../components/MetricCard";
import QuickActions from "../components/QuickActions";
import ProfileSummary from "../components/ProfileSummary";
import TopCandidates from "../components/TopCandidates";
import { useJobs } from "@/hooks/useJobs";
import Link from "next/link";

export default function ClientDashboard() {
  const { jobsQuery } = useJobs();
  const jobPostings = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "San Francisco, CA",
      type: "Full-time",
      posted: "2 days ago",
      applications: 24,
      views: 156,
      status: "Active",
      salary: "$120k - $150k",
      qualified: 18,
      shortlisted: 8,
      interviewed: 3,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-blue-50">
      {/* Main Content */}
      <main className={`px-2 transition-all duration-300 min-h-screen`}>
        <div className="px-4 py-6 max-w-7xl mx-auto">
          {/* Stats */}
          <MetricCards />

          {/* Main Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              <QuickActions />

              {/* Top Candidates */}
              <Card className="bg-white border-gray-200">
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-semibold text-blue-600">
                      Top Candidates
                    </CardTitle>
                    <CardDescription className="text-blue-500">
                      AI-recommended talent for your open positions
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-1" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* {candidates.slice(0, 3).map((candidate) => (
                    <div
                      key={candidate.id}
                      className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
                    >
                      <div className="flex items-start space-x-4">
                        <img
                          src={candidate.avatar || "/placeholder.svg"}
                          alt={candidate.name}
                          className="w-12 h-12 rounded-full"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-gray-900">{candidate.name}</h3>
                              <p className="text-gray-600">{candidate.title}</p>
                              <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                                <span className="flex items-center">
                                  <MapPin className="w-4 h-4 mr-1" />
                                  {candidate.location}
                                </span>
                                <span>{candidate.experience} experience</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge className="bg-green-100 text-green-800 mb-1">{candidate.match}% match</Badge>
                              <p className="text-xs text-gray-500">Last active: {candidate.lastActive}</p>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 mt-2">
                            {candidate.skills.map((skill) => (
                              <Badge key={skill} variant="secondary" className="text-xs bg-gray-100 text-gray-800">
                                {skill}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center justify-between mt-3">
                            <Badge
                              className={
                                candidate.status === "Interview Scheduled"
                                  ? "bg-blue-100 text-blue-800"
                                  : candidate.status === "Under Review"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : candidate.status === "Shortlisted"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-gray-100 text-gray-800"
                              }
                            >
                              {candidate.status}
                            </Badge>
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                                <MessageSquare className="w-4 h-4 mr-1" />
                                Contact
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))} */}
                  <TopCandidates dashboard={true} />
                </CardContent>
                <CardFooter className="border-t border-gray-200 p-4">
                  <Link href={'/recruiter/candidates'}   className="w-full text-center text-blue-600">
                    View All Candidates
                  </Link>
                </CardFooter>
              </Card>

              {/* Active Job Postings */}
              <Card className="bg-white border-gray-200">
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg text-blue-600 font-semibold">
                      Active Job Postings
                    </CardTitle>
                    <CardDescription className="text-blue-500">
                      Monitor your current job listings
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-blue-500 text-white"
                  >
                    View All
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {jobsQuery.data?.length === 0 && (
                    <div className="text-center py-20">
                      <p className="text-gray-500 text-lg">No jobs yet.</p>
                      <button className="mt-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-400 text-white px-4 py-2 rounded hover:shadow">
                        Create Job
                      </button>
                    </div>
                  )}
                  {jobsQuery.data?.map((job) => (
                    <div
                      key={job._id}
                      className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-gray-900 mb-1">
                            {job.title}
                          </h3>
                          <p className="text-sm text-gray-500">{job.role}</p>
                          <p className="text-gray-600 mb-2">{job.department}</p>
                          <p className="mt-1 text-gray-700 mb-3">
                            {job.description.slice(0, 80)}...
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {job.location}
                            </span>
                            <span className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {job.createdAt}
                            </span>
                            {/* <span className="flex items-center">
                              <DollarSign className="w-4 h-4 mr-1" />
                              {job.salary}
                            </span> */}
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-800">
                          {job.status}
                        </Badge>
                      </div>

                      

                      
                    </div>
                  ))}
                </CardContent>
                <CardFooter className="border-t border-gray-200 p-4">
                  <Button
                    variant="outline"
                    className="w-full bg-transparent bg-blue-500 text-white"
                  >
                    View All Job Postings
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <ProfileSummary />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
