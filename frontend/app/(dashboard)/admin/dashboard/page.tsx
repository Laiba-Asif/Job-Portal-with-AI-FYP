"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Shield,
  Users,
  Briefcase,
  BarChart3,
  Settings,
  Search,
  Filter,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  UserPlus,
  Building,
  Bell,
  ChevronDown,
  Menu,
  X,
  BarChart2,
  HelpCircle,
  LogOut,
  Download,
  FileText,
  Server,
  Database,
  Activity,
  User,
  MessageSquare,
  Trash2,
  Edit,
  Lock,
  Unlock,
  RefreshCw,
} from "lucide-react"
import Link from "next/link"
import Header from "../components/Header"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const systemStats = {
    totalUsers: 12547,
    activeJobs: 234,
    totalCompanies: 89,
    monthlyGrowth: 15.3,
    totalRevenue: "$125,890",
    pendingApprovals: 18,
  }

  const recentUsers = [
    {
      id: 1,
      name: "John Smith",
      email: "john@example.com",
      role: "Job Seeker",
      joinDate: "2024-01-20",
      status: "Active",
      avatar: "/placeholder.svg?height=40&width=40",
      location: "New York, USA",
      lastActive: "2 hours ago",
    },
    {
      id: 2,
      name: "TechCorp Inc.",
      email: "hr@techcorp.com",
      role: "Client",
      joinDate: "2024-01-19",
      status: "Pending",
      avatar: "/placeholder.svg?height=40&width=40",
      location: "San Francisco, USA",
      lastActive: "1 day ago",
    },
    {
      id: 3,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      role: "Job Seeker",
      joinDate: "2024-01-18",
      status: "Active",
      avatar: "/placeholder.svg?height=40&width=40",
      location: "London, UK",
      lastActive: "3 hours ago",
    },
    {
      id: 4,
      name: "Design Studio",
      email: "contact@designstudio.com",
      role: "Client",
      joinDate: "2024-01-17",
      status: "Active",
      avatar: "/placeholder.svg?height=40&width=40",
      location: "Berlin, Germany",
      lastActive: "5 hours ago",
    },
    {
      id: 5,
      name: "Michael Brown",
      email: "michael@example.com",
      role: "Job Seeker",
      joinDate: "2024-01-16",
      status: "Inactive",
      avatar: "/placeholder.svg?height=40&width=40",
      location: "Toronto, Canada",
      lastActive: "2 days ago",
    },
  ]

  const systemAlerts = [
    {
      id: 1,
      type: "warning",
      message: "High server load detected",
      time: "5 minutes ago",
      severity: "Medium",
      details: "CPU usage above 80% for more than 10 minutes",
    },
    {
      id: 2,
      type: "info",
      message: "New feature deployment completed",
      time: "1 hour ago",
      severity: "Low",
      details: "AI matching algorithm updated to version 2.3",
    },
    {
      id: 3,
      type: "error",
      message: "Payment processing issue reported",
      time: "2 hours ago",
      severity: "High",
      details: "Stripe webhook failures affecting premium subscriptions",
    },
    {
      id: 4,
      type: "success",
      message: "Database backup completed",
      time: "4 hours ago",
      severity: "Low",
      details: "Automated daily backup successful",
    },
  ]

  const companies = [
    {
      id: 1,
      name: "TechCorp Inc.",
      industry: "Technology",
      employees: "500-1000",
      activeJobs: 12,
      status: "Verified",
      joinDate: "2023-12-15",
      location: "San Francisco, CA",
      subscription: "Enterprise",
    },
    {
      id: 2,
      name: "StartupXYZ",
      industry: "Fintech",
      employees: "50-100",
      activeJobs: 5,
      status: "Pending",
      joinDate: "2024-01-10",
      location: "New York, NY",
      subscription: "Professional",
    },
    {
      id: 3,
      name: "Design Studio",
      industry: "Creative",
      employees: "10-50",
      activeJobs: 3,
      status: "Verified",
      joinDate: "2024-01-05",
      location: "Berlin, Germany",
      subscription: "Standard",
    },
  ]

  const pendingApprovals = [
    {
      id: 1,
      type: "Company",
      name: "InnovateTech Solutions",
      submitted: "2024-01-21",
      details: "Technology consulting firm, 100-250 employees",
    },
    {
      id: 2,
      type: "Job Posting",
      name: "Senior DevOps Engineer at CloudSys",
      submitted: "2024-01-20",
      details: "Contains potentially misleading salary information",
    },
    {
      id: 3,
      type: "Content Report",
      name: "Inappropriate message in chat",
      submitted: "2024-01-19",
      details: "Reported by 3 users for harassment",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      {/* Top Navigation */}
      
      <Header title="Admin Dashboard" description="Monitor and manage Kasb" />

    

      {/* Main Content */}
      <main className={`pt-24  transition-all duration-300 min-h-screen`}>
        <div className="px-4 py-6 max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Monitor and manage Kasb</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
            <Card className="bg-white border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-500">Total Users</p>
                    <p className="text-xl font-bold text-gray-900">{systemStats.totalUsers.toLocaleString()}</p>
                  </div>
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <p className="text-xs text-green-600 mt-2">+{systemStats.monthlyGrowth}% this month</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-500">Active Jobs</p>
                    <p className="text-xl font-bold text-gray-900">{systemStats.activeJobs}</p>
                  </div>
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-green-600" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">Across all companies</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-500">Companies</p>
                    <p className="text-xl font-bold text-gray-900">{systemStats.totalCompanies}</p>
                  </div>
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Building className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">Verified clients</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-500">System Health</p>
                    <p className="text-xl font-bold text-green-600">99.9%</p>
                  </div>
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Activity className="w-5 h-5 text-green-600" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">Uptime this month</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-500">Revenue</p>
                    <p className="text-xl font-bold text-gray-900">{systemStats.totalRevenue}</p>
                  </div>
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-yellow-600" />
                  </div>
                </div>
                <p className="text-xs text-green-600 mt-2">+12% from last month</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-500">Pending Approvals</p>
                    <p className="text-xl font-bold text-gray-900">{systemStats.pendingApprovals}</p>
                  </div>
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-orange-600" />
                  </div>
                </div>
                <p className="text-xs text-orange-600 mt-2">Requires attention</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Tabs */}
              <Tabs defaultValue="users" className="w-full">
                <TabsList className="grid w-full grid-cols-4 bg-white">
                  <TabsTrigger value="users">Users</TabsTrigger>
                  <TabsTrigger value="companies">Companies</TabsTrigger>
                  <TabsTrigger value="approvals">Approvals</TabsTrigger>
                  <TabsTrigger value="system">System</TabsTrigger>
                </TabsList>

                {/* Users Tab */}
                <TabsContent value="users" className="space-y-4 mt-4">
                  <Card className="bg-white border-gray-200">
                    <CardHeader className="pb-2 flex flex-row items-center justify-between">
                      <div>
                        <CardTitle className="text-lg font-semibold">Recent Users</CardTitle>
                        <CardDescription>Latest user registrations and activity</CardDescription>
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
                      {recentUsers.slice(0, 4).map((user) => (
                        <div
                          key={user.id}
                          className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
                        >
                          <div className="flex items-start space-x-4">
                            <img
                              src={user.avatar || "/placeholder.svg"}
                              alt={user.name}
                              className="w-12 h-12 rounded-full"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="font-semibold text-gray-900">{user.name}</h3>
                                  <p className="text-gray-600">{user.email}</p>
                                  <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                                    <Badge variant="outline">{user.role}</Badge>
                                    <span>{user.location}</span>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <Badge
                                    className={
                                      user.status === "Active"
                                        ? "bg-green-100 text-green-800"
                                        : user.status === "Pending"
                                          ? "bg-yellow-100 text-yellow-800"
                                          : "bg-gray-100 text-gray-800"
                                    }
                                  >
                                    {user.status}
                                  </Badge>
                                  <p className="text-xs text-gray-500 mt-1">Joined: {user.joinDate}</p>
                                  <p className="text-xs text-gray-500">Last active: {user.lastActive}</p>
                                </div>
                              </div>

                              <div className="flex items-center justify-end mt-3 space-x-2">
                                <Button variant="ghost" size="sm">
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                    <CardFooter className="border-t border-gray-200 p-4">
                      <Button variant="outline" className="w-full bg-transparent">
                        View All Users
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                {/* Companies Tab */}
                <TabsContent value="companies" className="space-y-4 mt-4">
                  <Card className="bg-white border-gray-200">
                    <CardHeader className="pb-2 flex flex-row items-center justify-between">
                      <div>
                        <CardTitle className="text-lg font-semibold">Active Companies</CardTitle>
                        <CardDescription>Companies using the platform</CardDescription>
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
                      {companies.map((company) => (
                        <div
                          key={company.id}
                          className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-4">
                              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <Building className="w-6 h-6 text-green-600" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-900">{company.name}</h3>
                                <p className="text-gray-600">{company.industry}</p>
                                <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                                  <span>{company.location}</span>
                                  <span>{company.employees} employees</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge
                                className={
                                  company.status === "Verified"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }
                              >
                                {company.status}
                              </Badge>
                              <p className="text-xs text-gray-500 mt-1">Joined: {company.joinDate}</p>
                              <Badge variant="outline" className="mt-1">
                                {company.subscription}
                              </Badge>
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-4">
                            <div className="text-sm text-gray-700">
                              <span className="font-medium">{company.activeJobs}</span> active jobs
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              {company.status === "Verified" ? (
                                <Button variant="ghost" size="sm" className="text-yellow-600 hover:text-yellow-700">
                                  <Lock className="w-4 h-4" />
                                </Button>
                              ) : (
                                <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
                                  <Unlock className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                    <CardFooter className="border-t border-gray-200 p-4">
                      <Button variant="outline" className="w-full bg-transparent">
                        View All Companies
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                {/* Approvals Tab */}
                <TabsContent value="approvals" className="space-y-4 mt-4">
                  <Card className="bg-white border-gray-200">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-semibold">Pending Approvals</CardTitle>
                      <CardDescription>Items requiring admin review</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {pendingApprovals.map((item) => (
                        <div
                          key={item.id}
                          className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center space-x-2">
                                <Badge variant="outline">{item.type}</Badge>
                                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">{item.details}</p>
                              <p className="text-xs text-gray-500 mt-1">Submitted: {item.submitted}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600 hover:text-red-700 bg-transparent"
                              >
                                Reject
                              </Button>
                              <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                                Approve
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                    <CardFooter className="border-t border-gray-200 p-4">
                      <Button variant="outline" className="w-full bg-transparent">
                        View All Pending Approvals
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                {/* System Tab */}
                <TabsContent value="system" className="space-y-4 mt-4">
                  <Card className="bg-white border-gray-200">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-semibold">System Alerts</CardTitle>
                      <CardDescription>Recent system notifications and alerts</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {systemAlerts.map((alert) => (
                        <div
                          key={alert.id}
                          className={`p-4 rounded-lg border ${
                            alert.type === "error"
                              ? "bg-red-50 border-red-100"
                              : alert.type === "warning"
                                ? "bg-yellow-50 border-yellow-100"
                                : alert.type === "success"
                                  ? "bg-green-50 border-green-100"
                                  : "bg-blue-50 border-blue-100"
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                alert.type === "error"
                                  ? "bg-red-100"
                                  : alert.type === "warning"
                                    ? "bg-yellow-100"
                                    : alert.type === "success"
                                      ? "bg-green-100"
                                      : "bg-blue-100"
                              }`}
                            >
                              {alert.type === "error" ? (
                                <AlertTriangle className="w-4 h-4 text-red-600" />
                              ) : alert.type === "warning" ? (
                                <AlertTriangle className="w-4 h-4 text-yellow-600" />
                              ) : alert.type === "success" ? (
                                <CheckCircle className="w-4 h-4 text-green-600" />
                              ) : (
                                <MessageSquare className="w-4 h-4 text-blue-600" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <h3 className="font-semibold text-gray-900">{alert.message}</h3>
                                <Badge
                                  className={
                                    alert.severity === "High"
                                      ? "bg-red-100 text-red-800"
                                      : alert.severity === "Medium"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-blue-100 text-blue-800"
                                  }
                                >
                                  {alert.severity}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">{alert.details}</p>
                              <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                    <CardFooter className="border-t border-gray-200 p-4">
                      <Button variant="outline" className="w-full bg-transparent">
                        View All System Alerts
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* System Performance */}
              <Card className="bg-white border-gray-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold">System Performance</CardTitle>
                  <CardDescription>Current system metrics and health</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">CPU Usage</span>
                      <span className="text-sm font-medium text-gray-900">45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Memory Usage</span>
                      <span className="text-sm font-medium text-gray-900">62%</span>
                    </div>
                    <Progress value={62} className="h-2" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Database Load</span>
                      <span className="text-sm font-medium text-gray-900">38%</span>
                    </div>
                    <Progress value={38} className="h-2" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">API Response Time</span>
                      <span className="text-sm font-medium text-gray-900">120ms</span>
                    </div>
                    <Progress value={30} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <Button variant="outline" size="sm">
                      <RefreshCw className="w-4 h-4 mr-1" />
                      Refresh
                    </Button>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </CardContent>
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
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add New User
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Building className="w-4 h-4 mr-2" />
                    Verify Company
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Database className="w-4 h-4 mr-2" />
                    Database Backup
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Download className="w-4 h-4 mr-2" />
                    Export Reports
                  </Button>
                </CardContent>
              </Card>

              {/* User Statistics */}
              <Card className="bg-white border-gray-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold">User Statistics</CardTitle>
                  <CardDescription>User growth and activity</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500">Job Seekers</p>
                      <p className="text-xl font-bold text-gray-900">8,742</p>
                      <p className="text-xs text-green-600">+12% this month</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500">Employers</p>
                      <p className="text-xl font-bold text-gray-900">3,805</p>
                      <p className="text-xs text-green-600">+8% this month</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500">Daily Active</p>
                      <p className="text-xl font-bold text-gray-900">2,156</p>
                      <p className="text-xs text-green-600">+5% this week</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500">New Today</p>
                      <p className="text-xl font-bold text-gray-900">124</p>
                      <p className="text-xs text-green-600">+15% vs avg</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <p className="text-sm font-medium text-gray-700">User Type Distribution</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600">Job Seekers</span>
                        <span className="text-xs font-medium">70%</span>
                      </div>
                      <Progress value={70} className="h-1" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600">Employers</span>
                        <span className="text-xs font-medium">25%</span>
                      </div>
                      <Progress value={25} className="h-1" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600">Admins</span>
                        <span className="text-xs font-medium">5%</span>
                      </div>
                      <Progress value={5} className="h-1" />
                    </div>
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
                        <span className="font-medium">New user registered:</span> Sarah Johnson
                      </p>
                      <p className="text-xs text-gray-500">10 minutes ago</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Building className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">Company verified:</span> TechCorp Inc.
                      </p>
                      <p className="text-xs text-gray-500">1 hour ago</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                      <AlertTriangle className="w-4 h-4 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">Content reported:</span> Job posting #12345
                      </p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <Settings className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">System settings updated</span> by Admin
                      </p>
                      <p className="text-xs text-gray-500">3 hours ago</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t border-gray-200 p-4">
                  <Button variant="outline" className="w-full bg-transparent">
                    View All Activity
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
