"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar"; // your sidebar.tsx
import { cn } from "@/lib/utils"; 
import { useAuthContext } from "@/context/auth-provider";

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
      <Sidebar role={user.role}/>

      {/* Main content area */}
      <div
        className={cn(
          "flex flex-col flex-1 min-w-0 transition-all duration-300",
          sidebarOpen ? "lg:ml-64" : "lg:ml-64" // fixed sidebar width on desktop
        )}
      >
        {/* Children will include role-specific header + page content */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
