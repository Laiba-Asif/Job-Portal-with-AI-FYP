"use client"

import { use, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
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
} from "lucide-react"
import Header from "../components/Header"
import MetricCards from "../components/MetricCard"
import QuickActions from "../components/QuickActions"
import ProfileSummary from "../components/ProfileSummary"
import TopCandidates from "../components/TopCandidates"

export default function ClientDashboard() {
  

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
    
  ]

  const candidates = [
    {
      id: 1,
      name: "Alex Johnson",
      title: "Senior Frontend Developer",
      experience: "5 years",
      skills: ["React", "TypeScript", "Node.js"],
      match: 95,
      location: "San Francisco, CA",
      salary: "$140k",
      status: "Interview Scheduled",
      avatar: "/placeholder.svg?height=40&width=40",
      education: "BS Computer Science, Stanford University",
      lastActive: "2 hours ago",
    },
   
  ]

  const interviews = [
    {
      id: 1,
      candidate: "Alex Johnson",
      position: "Senior Frontend Developer",
      date: "Today, 2:00 PM",
      type: "Video Call",
      status: "Upcoming",
      notes: "Discuss previous experience with React and TypeScript",
    },
    
  ]



  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-blue-50">
      
      {/* Main Content */}
      <main className={`px-2 transition-all duration-300 min-h-screen`}>
        <div className="px-4 py-6 max-w-7xl mx-auto">
          {/* Stats */}
          <MetricCards/>


          {/* Main Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              <QuickActions/>
              {/* Active Job Postings */}
              <Card className="bg-white border-gray-200">
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-semibold">Active Job Postings</CardTitle>
                    <CardDescription>Monitor your current job listings</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {jobPostings.map((job) => (
                    <div
                      key={job.id}
                      className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">{job.title}</h3>
                          <p className="text-gray-600 mb-2">{job.department}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {job.location}
                            </span>
                            <span className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {job.posted}
                            </span>
                            <span className="flex items-center">
                              <DollarSign className="w-4 h-4 mr-1" />
                              {job.salary}
                            </span>
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-800">{job.status}</Badge>
                      </div>

                      <div className="grid grid-cols-4 gap-2 mt-4">
                        <div className="text-center p-2 bg-gray-50 rounded-md">
                          <p className="text-sm font-medium text-gray-900">{job.applications}</p>
                          <p className="text-xs text-gray-500">Applications</p>
                        </div>
                        <div className="text-center p-2 bg-gray-50 rounded-md">
                          <p className="text-sm font-medium text-gray-900">{job.qualified}</p>
                          <p className="text-xs text-gray-500">Qualified</p>
                        </div>
                        <div className="text-center p-2 bg-gray-50 rounded-md">
                          <p className="text-sm font-medium text-gray-900">{job.shortlisted}</p>
                          <p className="text-xs text-gray-500">Shortlisted</p>
                        </div>
                        <div className="text-center p-2 bg-gray-50 rounded-md">
                          <p className="text-sm font-medium text-gray-900">{job.interviewed}</p>
                          <p className="text-xs text-gray-500">Interviewed</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <Badge variant="outline" className="text-xs">
                          {job.type}
                        </Badge>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter className="border-t border-gray-200 p-4">
                  <Button variant="outline" className="w-full bg-transparent">
                    View All Job Postings
                  </Button>
                </CardFooter>
              </Card>

              {/* Top Candidates */}
              <Card className="bg-white border-gray-200">
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-semibold">Top Candidates</CardTitle>
                    <CardDescription>AI-recommended talent for your open positions</CardDescription>
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
                              <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
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
                  <Button variant="outline" className="w-full bg-transparent">
                    View All Candidates
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <ProfileSummary/>
             

              {/* Upcoming Interviews */}
              <Card className="bg-white border-gray-200">
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-semibold">Upcoming Interviews</CardTitle>
                    <CardDescription>Your scheduled candidate interviews</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {interviews.map((interview) => (
                    <div
                      key={interview.id}
                      className={`p-3 rounded-lg border ${
                        interview.status === "Upcoming" ? "bg-blue-50 border-blue-100" : "border-gray-200"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Badge
                          className={
                            interview.type === "Video Call"
                              ? "bg-purple-100 text-purple-800"
                              : interview.type === "Phone Screen"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-green-100 text-green-800"
                          }
                        >
                          {interview.type}
                        </Badge>
                        <p className="text-xs font-medium text-gray-700">{interview.date}</p>
                      </div>
                      <h4 className="font-medium text-gray-900">{interview.candidate}</h4>
                      <p className="text-sm text-gray-600">{interview.position}</p>
                      <p className="text-xs text-gray-500 mt-1">{interview.notes}</p>
                      <div className="flex items-center justify-between mt-3">
                        <Button size="sm" variant="outline" className="text-xs bg-transparent">
                          Reschedule
                        </Button>
                        <Button
                          size="sm"
                          className={`text-xs ${
                            interview.status === "Upcoming"
                              ? "bg-green-600 hover:bg-green-700 text-white"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {interview.status === "Upcoming" ? "Join Call" : "View Details"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
