"use client";
import type React from "react";
import {
  LayoutDashboard,
  MapPin,
  Users,
  HelpCircle,
  Settings,
  User,
  Crown,
  CreditCard,
  Share2,
  Bot,
  LogOut,
  Building,
  Briefcase,
  Notebook,
  ChartColumnBig,
  Server,
  Settings2,
  FileText,
  MessageSquare,
  Calendar,
  BarChart,
  UserPlus,
  Bookmark,
} from "lucide-react";

export interface NavigationItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
  active?: boolean;
}

type Role = "admin" | "recruiter" | "jobseeker";

// --- Role-based top navigation
export const navigationItems: Record<Role, NavigationItem[]> = {
  admin: [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
    { icon: User, label: "Users", href: "/admin/users" },
    { icon: Building, label: "Companies", href: "/admin/companies" },
    { icon: Briefcase, label: "Jobs", href: "/admin/jobs" },
    { icon: Notebook, label: "Reports", href: "/admin/reports" },
    { icon: ChartColumnBig, label: "Analytics", href: "/admin/analytics" },
    { icon: Server, label: "System", href: "/admin/system" },
    { icon: Settings2, label: "Settings", href: "/admin/settings" },
  ],

  recruiter: [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/recruiter/dashboard",
  },
  {
    icon: Briefcase,
    label: "Job Postings",
    href: "/recruiter/job-postings",
  },
  {
    icon: Users,
    label: "Candidates",
    href: "/recruiter/candidates",
  },
  {
    icon: Calendar,
    label: "Interviews",
    href: "/recruiter/interviews",
  },
  {
    icon: MessageSquare,
    label: "Messages",
    href: "/recruiter/messages",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/recruiter/analytics",
  },
  {
    icon: UserPlus,
    label: "Team",
    href: "/recruiter/team",
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/recruiter/settings",
  },
],

  jobseeker:  [
  { icon: LayoutDashboard, label: "Dashboard", href: "/jobseeker/dashboard" },
  { icon: Briefcase, label: "Find Jobs", href: "/jobseeker/find-jobs" },
  { icon: FileText, label: "Applications", href: "/jobseeker/applications" },
  { icon: MessageSquare, label: "Messages", href: "/jobseeker/messages" },
  { icon: User, label: "Profile", href: "/jobseeker/profile" },
  { icon: Notebook, label: "Resume", href: "/jobseeker/resume" },
  { icon: Bookmark, label: "Saved Jobs", href: "/jobseeker/saved-jobs" },
  { icon: Calendar, label: "Interviews", href: "/jobseeker/interviews" },
  { icon: Settings, label: "Settings", href: "/jobseeker/settings" },
],
};

// --- Role-based bottom navigation
export const bottomNavigationItems: Record<Role, NavigationItem[]> = {
  admin: [{ icon: LogOut, label: "Log Out", href: "/logout" },
  ],
  recruiter: [
    { icon: HelpCircle, label: "Help & Support", href: "/recruiter/help" },
    { icon: LogOut, label: "Log Out", href: "/logout" },
  ],
  jobseeker: [
    { icon: HelpCircle, label: "Help & Support", href: "/jobseeker/help" },
    { icon: LogOut, label: "Log Out", href: "/logout" },
  ],
};
