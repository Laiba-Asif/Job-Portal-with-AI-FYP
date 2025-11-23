"use client"
import Header from "./components/Header";
import { useAuthContext } from "@/context/auth-provider";
import Sidebar from "@/components/layout/Sidebar";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function JobSeekerLayout({ children }: { children: React.ReactNode }) {
 
  const { user } = useAuthContext();

  return (
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <Sidebar role={user.role}  />

        {/* Main content area */}
        <div
          className={cn(
            "flex flex-col flex-1 min-w-0 transition-all duration-300 lg:ml-64",
            
          )}
        >
          <main className="flex-1 min-h-screen bg-gradient-to-b from-slate-100 to-blue-50">
            <Header title="Dashboard" description={`Welcome Back, ${user.name}`} />
            {children}
          </main>
        </div>
      </div>
  );
}
