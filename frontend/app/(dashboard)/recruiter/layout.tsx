"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar"; // your sidebar.tsx
import { cn } from "@/lib/utils";
import { useAuthContext } from "@/context/auth-provider";
import { RecruiterProvider } from "@/context/recruiterContext";
import Header from "./components/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuthContext();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar role={user.role} />

      {/* Main content area */}
      <div
        className={cn(
          "flex flex-col flex-1 min-w-0 transition-all duration-300",
          sidebarOpen ? "lg:ml-64" : "lg:ml-64" // fixed sidebar width on desktop
        )}
      >
        {/* Children will include role-specific header + page content */}
        <RecruiterProvider>
         

          <main className="flex-1 min-h-screen bg-gradient-to-b from-slate-100 to-blue-50">
             <Header />
            {children}</main>
        </RecruiterProvider>
      </div>
    </div>
  );
}
