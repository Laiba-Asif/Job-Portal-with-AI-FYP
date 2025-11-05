"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  User,
  MapPin,
  Clock,
  Eye,
  Heart,
  Send,
  DollarSign,
} from "lucide-react"
import Header from "../components/Header"
import MetricCards from "./components/MetricCards"
import QuickActions from "./components/QuickActions"
import ProfileSummary from "./components/ProfileSummary"
import { useMutation, useQuery } from "@tanstack/react-query"
import { getResume } from "@/app/api/jobseeker/api"
import { useJobSeeker } from "@/context/jobseekerContext"

export default function JobSeekerDashboard() {
  
const { user, resume, isLoading } = useJobSeeker()

  const recommendedJobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      salary: "$120k - $150k",
      type: "Full-time",
      posted: "2 days ago",
      match: 95,
      skills: ["React", "TypeScript", "Next.js"],
      applied: false,
      description: "We're looking for an experienced Frontend Developer to join our team...",
      requirements: ["5+ years of experience", "Strong JavaScript skills", "Experience with React"],
    },
    {
      id: 2,
      title: "Full Stack Engineer",
      company: "StartupXYZ",
      location: "Remote",
      salary: "$100k - $130k",
      type: "Full-time",
      posted: "1 day ago",
      match: 88,
      skills: ["Node.js", "React", "MongoDB"],
      applied: false,
      description: "Join our fast-growing startup as a Full Stack Engineer...",
      requirements: ["3+ years of experience", "Node.js and React", "Database experience"],
    },
    {
      id: 3,
      title: "UI/UX Developer",
      company: "Design Studio",
      location: "New York, NY",
      salary: "$90k - $110k",
      type: "Contract",
      posted: "3 days ago",
      match: 82,
      skills: ["Figma", "React", "CSS"],
      applied: true,
      description: "Looking for a talented UI/UX Developer to create beautiful interfaces...",
      requirements: ["3+ years of experience", "Strong design skills", "Frontend development"],
    },
    {
      id: 4,
      title: "Backend Developer",
      company: "Enterprise Solutions",
      location: "Chicago, IL",
      salary: "$110k - $140k",
      type: "Full-time",
      posted: "5 days ago",
      match: 79,
      skills: ["Java", "Spring Boot", "PostgreSQL"],
      applied: false,
      description: "Join our backend team to build scalable enterprise solutions...",
      requirements: ["4+ years of experience", "Java expertise", "Database design"],
    },
    {
      id: 5,
      title: "DevOps Engineer",
      company: "Cloud Systems",
      location: "Remote",
      salary: "$130k - $160k",
      type: "Full-time",
      posted: "1 week ago",
      match: 76,
      skills: ["AWS", "Docker", "Kubernetes"],
      applied: false,
      description: "Help us build and maintain our cloud infrastructure...",
      requirements: ["3+ years of experience", "AWS certification", "CI/CD pipeline experience"],
    },
  ]

  const applications = [
    {
      id: 1,
      title: "Senior React Developer",
      company: "Meta",
      status: "Interview Scheduled",
      appliedDate: "2024-01-15",
      statusColor: "bg-blue-500",
      nextStep: "Video interview on Jan 20, 2024",
      location: "Remote",
      salary: "$140k - $160k",
    },
    {
      id: 2,
      title: "Frontend Engineer",
      company: "Google",
      status: "Under Review",
      appliedDate: "2024-01-12",
      statusColor: "bg-yellow-500",
      nextStep: "Waiting for recruiter feedback",
      location: "Mountain View, CA",
      salary: "$150k - $180k",
    },
    {
      id: 3,
      title: "Full Stack Developer",
      company: "Netflix",
      status: "Rejected",
      appliedDate: "2024-01-10",
      statusColor: "bg-red-500",
      nextStep: "Application closed",
      location: "Los Angeles, CA",
      salary: "$130k - $160k",
    },
    {
      id: 4,
      title: "UI Developer",
      company: "Apple",
      status: "Technical Test",
      appliedDate: "2024-01-18",
      statusColor: "bg-purple-500",
      nextStep: "Complete coding challenge by Jan 25",
      location: "Cupertino, CA",
      salary: "$140k - $170k",
    },
    {
      id: 5,
      title: "Frontend Architect",
      company: "Amazon",
      status: "Shortlisted",
      appliedDate: "2024-01-20",
      statusColor: "bg-green-500",
      nextStep: "Waiting for interview invitation",
      location: "Seattle, WA",
      salary: "$160k - $190k",
    },
  ]

  const messages = [
    {
      id: 1,
      sender: "Sarah Johnson",
      role: "HR Manager at TechCorp",
      message: "Hi John, we'd like to schedule an interview for the Senior Frontend Developer position.",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: 2,
      sender: "Mike Chen",
      role: "Recruiter at StartupXYZ",
      message: "Thanks for your application! Do you have time for a quick call this week?",
      time: "Yesterday",
      unread: false,
    },
    {
      id: 3,
      sender: "Emily Davis",
      role: "CTO at Design Studio",
      message: "We've reviewed your portfolio and would like to discuss the UI/UX Developer role.",
      time: "2 days ago",
      unread: false,
    },
  ]


  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-blue-50">
      
     <Header title="Dashboard" description="Welcome back, John!"/>

      

      {/* Main Content */}
      <main className={`pt-24  transition-all duration-300 min-h-screen`}>
        <div className="px-10 py-6 max-w-8xl mx-auto">
         
          
          {/* Stats Cards */}
          <MetricCards />
         

          {/* Main Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Actions */}
              <QuickActions />

              {/* Recommended Jobs */}
              <Card className="bg-white border-gray-200">
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-semibold">Recommended Jobs</CardTitle>
                    <CardDescription>AI-matched opportunities based on your profile</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recommendedJobs.slice(0, 3).map((job) => (
                    <div
                      key={job.id}
                      className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">{job.title}</h3>
                          <p className="text-gray-600 mb-2">{job.company}</p>
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
                        <Badge className="bg-green-100 text-green-800 font-medium">{job.match}% match</Badge>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-3 mb-3">
                        {job.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs bg-gray-100 text-gray-800">
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {job.type}
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
                            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                              <Send className="w-4 h-4 mr-1" />
                              Apply
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter className="border-t border-gray-200 p-4">
                  <Button variant="outline" className="w-full bg-transparent">
                    View All Recommended Jobs
                  </Button>
                </CardFooter>
              </Card>

              {/* Application Status */}
              <Card className="bg-white border-gray-200">
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-semibold">Application Status</CardTitle>
                    <CardDescription>Track your job applications</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {applications.slice(0, 3).map((app) => (
                    <div
                      key={app.id}
                      className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-3 h-3 rounded-full mt-1.5 ${app.statusColor}`}></div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-gray-900">{app.title}</h3>
                              <p className="text-gray-600">{app.company}</p>
                              <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                                <span className="flex items-center">
                                  <MapPin className="w-4 h-4 mr-1" />
                                  {app.location}
                                </span>
                                <span className="flex items-center">
                                  <DollarSign className="w-4 h-4 mr-1" />
                                  {app.salary}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge
                                className={
                                  app.status === "Interview Scheduled"
                                    ? "bg-blue-100 text-blue-800"
                                    : app.status === "Under Review"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : app.status === "Rejected"
                                        ? "bg-red-100 text-red-800"
                                        : app.status === "Technical Test"
                                          ? "bg-purple-100 text-purple-800"
                                          : "bg-green-100 text-green-800"
                                }
                              >
                                {app.status}
                              </Badge>
                              <p className="text-xs text-gray-500 mt-1">Applied {app.appliedDate}</p>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mt-2">
                            <span className="font-medium">Next step:</span> {app.nextStep}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter className="border-t border-gray-200 p-4">
                  <Button variant="outline" className="w-full bg-transparent">
                    View All Applications
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Profile Summary */}
              
              <ProfileSummary/>
              {/* Messages */}
              <Card className="bg-white border-gray-200">
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-semibold">Recent Messages</CardTitle>
                    <CardDescription>Stay in touch with recruiters</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`p-3 rounded-lg ${
                        message.unread ? "bg-green-50 border border-green-100" : "border border-gray-200"
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-gray-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <p className="font-medium text-gray-900 truncate">{message.sender}</p>
                            <p className="text-xs text-gray-500">{message.time}</p>
                          </div>
                          <p className="text-xs text-gray-600">{message.role}</p>
                          <p className="text-sm text-gray-700 mt-1 line-clamp-2">{message.message}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter className="border-t border-gray-200 p-4">
                  <Button variant="outline" className="w-full bg-transparent">
                    View All Messages
                  </Button>
                </CardFooter>
              </Card>

              {/* Upcoming Interviews */}
              <Card className="bg-white border-gray-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold">Upcoming Interviews</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="bg-blue-100 text-blue-800">Today, 2:00 PM</Badge>
                      <Badge variant="outline" className="text-xs">
                        Video Call
                      </Badge>
                    </div>
                    <h4 className="font-medium text-gray-900">Senior Frontend Developer</h4>
                    <p className="text-sm text-gray-600">TechCorp Inc.</p>
                    <div className="flex items-center justify-between mt-3">
                      <Button size="sm" variant="outline" className="text-xs bg-transparent">
                        View Details
                      </Button>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white text-xs">
                        Join Call
                      </Button>
                    </div>
                  </div>

                  <div className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="bg-gray-100 text-gray-800">Tomorrow, 10:00 AM</Badge>
                      <Badge variant="outline" className="text-xs">
                        Phone Screen
                      </Badge>
                    </div>
                    <h4 className="font-medium text-gray-900">Full Stack Engineer</h4>
                    <p className="text-sm text-gray-600">StartupXYZ</p>
                    <div className="flex items-center justify-between mt-3">
                      <Button size="sm" variant="outline" className="text-xs bg-transparent">
                        View Details
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs bg-transparent">
                        Prepare
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
