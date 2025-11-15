"use client";

import {
  Search,
  Filter,
  Bell,
  MessageSquare,
  ChevronDown,
  LayoutDashboard,
  Building,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "@/components/logo";
import { useAuthContext } from "@/context/auth-provider";

export default function RecruiterHeader() {
  const { user, isLoading } = useAuthContext();

  return (
    <header
      className=" h-20 w-full bg-gradient-to-r from-blue-50 to-white
      shadow-[0_2px_10px_rgb(0,0,0,0.12)] backdrop-blur-lg flex items-center
      justify-between px-4 md:px-8 z-30"
    >
      {/* LEFT SECTION */}
      <div className="flex items-center space-x-4 flex-shrink-0">
        {/* Logo for mobile */}
        <div className="flex md:hidden items-center space-x-2">
          <Logo />
          <span className="text-lg font-semibold text-blue-700">
            Kasb Recruiter
          </span>
        </div>

        {/* Dashboard info for desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <div
            className="flex items-center justify-center rounded-md
            bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 shadow-md w-10 h-10"
          >
            <LayoutDashboard className="text-white w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-blue-700">
              Recruiter Dashboard
            </span>
            <p className="text-sm text-blue-600">
              Welcome back, {user?.name || "Recruiter"}
            </p>
          </div>
        </div>
      </div>

      {/* CENTER SECTION — SEARCH BAR */}
      <div className="hidden md:flex flex-1 justify-center px-4">
        <div className="relative w-full max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 w-5 h-5" />
          <Input
            placeholder="Search candidates, jobs, or messages..."
            className="pl-12 pr-12 py-2 w-full rounded-lg shadow-sm border border-blue-200 focus:border-blue-400 focus:ring-1 focus:ring-blue-300"
          />
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 -translate-y-1/2"
          >
            <Filter className="w-4 h-4 text-blue-600" />
          </Button>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="hidden md:flex items-center space-x-2 md:space-x-3">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5 text-blue-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
        </Button>
        <Button variant="ghost" size="icon">
          <MessageSquare className="w-5 h-5 text-blue-600" />
        </Button>

        <div className="flex items-center space-x-2 cursor-pointer">
          <div className="w-8 h-8 bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 rounded-full flex items-center justify-center shadow-md transform hover:scale-105 transition-transform">
            <Building className="w-4 h-4 text-white" />
          </div>
          <span className="hidden md:inline text-sm font-medium text-blue-700">
            {user?.name || "Company Name"}
          </span>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </div>
      </div>
    </header>
  );
}
