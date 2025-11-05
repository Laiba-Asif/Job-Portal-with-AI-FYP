"use client"

import { useState } from "react"
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
import Link from "next/link"

export default function ClientDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(true)

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
    {
      id: 2,
      title: "Product Manager",
      department: "Product",
      location: "Remote",
      type: "Full-time",
      posted: "1 week ago",
      applications: 18,
      views: 89,
      status: "Active",
      salary: "$130k - $160k",
      qualified: 12,
      shortlisted: 5,
      interviewed: 2,
    },
    {
      id: 3,
      title: "UX Designer",
      department: "Design",
      location: "New York, NY",
      type: "Contract",
      posted: "3 days ago",
      applications: 31,
      views: 203,
      status: "Active",
      salary: "$90k - $110k",
      qualified: 22,
      shortlisted: 10,
      interviewed: 4,
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
    {
      id: 2,
      name: "Sarah Chen",
      title: "Full Stack Engineer",
      experience: "4 years",
      skills: ["React", "Python", "AWS"],
      match: 88,
      location: "Remote",
      salary: "$125k",
      status: "Under Review",
      avatar: "/placeholder.svg?height=40&width=40",
      education: "MS Software Engineering, MIT",
      lastActive: "1 day ago",
    },
    {
      id: 3,
      name: "Michael Brown",
      title: "Frontend Developer",
      experience: "3 years",
      skills: ["Vue.js", "JavaScript", "CSS"],
      match: 82,
      location: "Austin, TX",
      salary: "$110k",
      status: "New Application",
      avatar: "/placeholder.svg?height=40&width=40",
      education: "BA Computer Science, UT Austin",
      lastActive: "3 days ago",
    },
    {
      id: 4,
      name: "Emily Davis",
      title: "UI/UX Designer",
      experience: "6 years",
      skills: ["Figma", "Adobe XD", "Sketch"],
      match: 79,
      location: "New York, NY",
      salary: "$120k",
      status: "Shortlisted",
      avatar: "/placeholder.svg?height=40&width=40",
      education: "BFA Design, Parsons School of Design",
      lastActive: "5 hours ago",
    },
    {
      id: 5,
      name: "David Wilson",
      title: "Backend Developer",
      experience: "7 years",
      skills: ["Java", "Spring Boot", "PostgreSQL"],
      match: 76,
      location: "Chicago, IL",
      salary: "$135k",
      status: "New Application",
      avatar: "/placeholder.svg?height=40&width=40",
      education: "MS Computer Engineering, University of Illinois",
      lastActive: "2 days ago",
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
    {
      id: 2,
      candidate: "Sarah Chen",
      position: "Full Stack Engineer",
      date: "Tomorrow, 10:00 AM",
      type: "Phone Screen",
      status: "Scheduled",
      notes: "Initial screening to assess technical skills and experience",
    },
    {
      id: 3,
      candidate: "Michael Brown",
      position: "Frontend Developer",
      date: "Friday, 3:00 PM",
      type: "In-Person",
      status: "Confirmed",
      notes: "Final round interview with the engineering team",
    },
  ]

  const stats = {
    activeJobs: 8,
    totalApplications: 156,
    totalInterviews: 12,
    hired: 5,
    averageTimeToHire: "18 days",
    openPositions: 3,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-30">
        <div className="flex items-center justify-between px-4 h-16">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none lg:hidden"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <Link href="/" className="flex items-center space-x-2 ml-2 lg:ml-0">
              <div className="w-8 h-8 bg-green-600 rounded-md flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">JobMatch</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input placeholder="Search candidates, jobs, messages..." className="pl-10 pr-10 py-2 w-full" />
              <Button variant="ghost" size="sm" className="absolute right-1 top-1/2 transform -translate-y-1/2">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-green-600 rounded-full"></span>
            </Button>
            <Button variant="ghost" size="icon">
              <MessageSquare className="w-5 h-5" />
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <Building className="w-4 h-4 text-white" />
              </div>
              <span className="hidden md:inline text-sm font-medium">TechCorp Inc.</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-20 w-64 bg-white border-r border-gray-200 transition-transform transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 pt-16`}
      >
        <div className="h-full flex flex-col overflow-y-auto">
          <div className="px-4 py-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm font-medium text-gray-900">TechCorp Inc.</p>
                <p className="text-xs text-gray-500">Enterprise Plan</p>
              </div>
              <Badge className="bg-green-100 text-green-800">Premium</Badge>
            </div>
          </div>

          <nav className="flex-1 px-2 space-y-1">
            <Link
              href="/dashboard/client"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                activeTab === "dashboard"
                  ? "bg-green-50 text-green-700"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
              onClick={() => setActiveTab("dashboard")}
            >
              <BarChart2 className="w-5 h-5 mr-3" />
              Dashboard
            </Link>
            <Link
              href="/dashboard/client/jobs"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                activeTab === "jobs"
                  ? "bg-green-50 text-green-700"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
              onClick={() => setActiveTab("jobs")}
            >
              <Briefcase className="w-5 h-5 mr-3" />
              Job Postings
            </Link>
            <Link
              href="/dashboard/client/candidates"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                activeTab === "candidates"
                  ? "bg-green-50 text-green-700"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
              onClick={() => setActiveTab("candidates")}
            >
              <Users className="w-5 h-5 mr-3" />
              Candidates
            </Link>
            <Link
              href="/dashboard/client/interviews"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                activeTab === "interviews"
                  ? "bg-green-50 text-green-700"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
              onClick={() => setActiveTab("interviews")}
            >
              <Calendar className="w-5 h-5 mr-3" />
              Interviews
            </Link>
            <Link
              href="/dashboard/client/messages"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                activeTab === "messages"
                  ? "bg-green-50 text-green-700"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
              onClick={() => setActiveTab("messages")}
            >
              <MessageSquare className="w-5 h-5 mr-3" />
              Messages
              <Badge className="ml-auto bg-green-100 text-green-800">5</Badge>
            </Link>
            <Link
              href="/dashboard/client/analytics"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                activeTab === "analytics"
                  ? "bg-green-50 text-green-700"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
              onClick={() => setActiveTab("analytics")}
            >
              <TrendingUp className="w-5 h-5 mr-3" />
              Analytics
            </Link>
            <Link
              href="/dashboard/client/team"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                activeTab === "team"
                  ? "bg-green-50 text-green-700"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
              onClick={() => setActiveTab("team")}
            >
              <Users className="w-5 h-5 mr-3" />
              Team
            </Link>
            <Link
              href="/dashboard/client/settings"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                activeTab === "settings"
                  ? "bg-green-50 text-green-700"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
              onClick={() => setActiveTab("settings")}
            >
              <Settings className="w-5 h-5 mr-3" />
              Settings
            </Link>
          </nav>

          <div className="px-4 py-4 border-t border-gray-200">
            <div className="flex items-center space-x-3 mb-3">
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <HelpCircle className="w-4 h-4 mr-2" />
                Help & Support
              </Button>
            </div>
            <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`pt-16 ${sidebarOpen ? "lg:pl-64" : ""} transition-all duration-300 min-h-screen`}>
        <div className="px-4 py-6 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Recruitment Dashboard</h1>
              <p className="text-gray-600">Manage your hiring process with AI-powered insights</p>
            </div>
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Post New Job
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
            <Card className="bg-white border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-500">Active Jobs</p>
                    <p className="text-xl font-bold text-gray-900">{stats.activeJobs}</p>
                  </div>
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-green-600" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">{stats.openPositions} open positions</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-500">Applications</p>
                    <p className="text-xl font-bold text-gray-900">{stats.totalApplications}</p>
                  </div>
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <p className="text-xs text-green-600 mt-2">+23% from last month</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-500">Interviews</p>
                    <p className="text-xl font-bold text-gray-900">{stats.totalInterviews}</p>
                  </div>
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Video className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">3 scheduled today</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-500">Hired</p>
                    <p className="text-xl font-bold text-gray-900">{stats.hired}</p>
                  </div>
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <UserCheck className="w-5 h-5 text-orange-600" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">This quarter</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-500">Time to Hire</p>
                    <p className="text-xl font-bold text-gray-900">{stats.averageTimeToHire}</p>
                  </div>
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-yellow-600" />
                  </div>
                </div>
                <p className="text-xs text-green-600 mt-2">-3 days from average</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-500">Conversion Rate</p>
                    <p className="text-xl font-bold text-gray-900">8.2%</p>
                  </div>
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                </div>
                <p className="text-xs text-green-600 mt-2">+1.4% from last month</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
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
                  {candidates.slice(0, 3).map((candidate) => (
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
                  ))}
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
              <Card className="bg-white border-gray-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white justify-start">
                    <Plus className="w-4 h-4 mr-2" />
                    Post New Job
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Upload className="w-4 h-4 mr-2" />
                    Import Candidates
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Download className="w-4 h-4 mr-2" />
                    Export Reports
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Sliders className="w-4 h-4 mr-2" />
                    Configure AI Settings
                  </Button>
                </CardContent>
              </Card>

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

              {/* Hiring Pipeline */}
              <Card className="bg-white border-gray-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold">Hiring Pipeline</CardTitle>
                  <CardDescription>Current recruitment funnel</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Applications</span>
                      <span className="text-sm font-medium text-gray-900">156</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Screening</span>
                      <span className="text-sm font-medium text-gray-900">98</span>
                    </div>
                    <Progress value={63} className="h-2" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Interview</span>
                      <span className="text-sm font-medium text-gray-900">45</span>
                    </div>
                    <Progress value={29} className="h-2" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Assessment</span>
                      <span className="text-sm font-medium text-gray-900">28</span>
                    </div>
                    <Progress value={18} className="h-2" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Offer</span>
                      <span className="text-sm font-medium text-gray-900">12</span>
                    </div>
                    <Progress value={8} className="h-2" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Hired</span>
                      <span className="text-sm font-medium text-gray-900">5</span>
                    </div>
                    <Progress value={3} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="bg-white border-gray-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">Sarah Chen</span> applied for{" "}
                        <span className="font-medium">Full Stack Engineer</span>
                      </p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">Alex Johnson</span> completed the technical assessment
                      </p>
                      <p className="text-xs text-gray-500">5 hours ago</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-900">
                        Interview scheduled with <span className="font-medium">Michael Brown</span>
                      </p>
                      <p className="text-xs text-gray-500">Yesterday</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <MessageSquare className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">Emily Davis</span> sent you a message
                      </p>
                      <p className="text-xs text-gray-500">Yesterday</p>
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
