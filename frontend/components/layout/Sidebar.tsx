"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { navigationItems, bottomNavigationItems } from "@/config/navigation";
import { cn } from "@/lib/utils";
import Logo from "../logo";
import { useMutation } from "@tanstack/react-query";
import { logoutMutationFn } from "@/app/api/auth/api"; // adjust path

interface SidebarProps {
  role: "recruiter" | "admin" | "jobseeker";
}

export default function Sidebar({ role }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const items = navigationItems[role];
  const bottomItems = bottomNavigationItems[role];

  // 🔄 Logout mutation
  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutMutationFn,
    onSuccess: () => {
      // after logout → redirect to login
      router.push("/login");
    },
    onError: (err) => {
      console.error("Logout failed", err);
    },
  });

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`md:hidden fixed top-6 right-4 z-50 p-2 rounded-lg bg-white/80 shadow-lg backdrop-blur-sm`}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-blue-600" />
        ) : (
          <Menu className="h-6 w-6 text-blue-600" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-full w-64 flex flex-col justify-between transition-transform duration-300",
          "bg-gradient-to-b from-blue-50 to-white-100 shadow-[0_2px_3px_rgb(0,0,0,0.12)]",
          "border-r border-blue-100 backdrop-blur-lg",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 px-6 h-20 border-b border-blue-100">
          <Logo />
          <div className="flex flex-col">
            <span className="font-semibold text-lg text-blue-700">Kasb</span>
            <p className="text-sm text-blue-600">job match with AI</p>
          </div>
        </div>

        {/* Main navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
          {items.map((item) => {
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={cn(
                    "flex items-center gap-3 px-4 py-2.5 rounded-xl cursor-pointer transition-all duration-200",
                    "hover:scale-[1.02] hover:shadow-md",
                    active
                      ? "bg-blue-100 text-blue-700 shadow-inner font-medium"
                      : "text-gray-600 hover:bg-blue-50 hover:text-blue-700"
                  )}
                >
                  <item.icon
                    className={cn(
                      "w-5 h-5",
                      active ? "text-blue-600" : "text-gray-400"
                    )}
                  />
                  <span>{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className="px-4 py-4 border-t border-blue-100 bg-white/70 backdrop-blur-sm">
          {bottomItems.map((item) => {
            const isLogout = item.label === "Log Out";
            const active = pathname === item.href;

            return isLogout ? (
              <button
                key={item.href}
                onClick={() => logout()}
                disabled={isPending}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-2.5 rounded-xl cursor-pointer transition-all duration-200",
                  "hover:scale-[1.02] hover:shadow-md",
                  "text-gray-600 hover:bg-red-50 hover:text-red-600",
                  isPending && "opacity-50 cursor-not-allowed"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span>{isPending ? "Logging out..." : item.label}</span>
              </button>
            ) : (
              <Link key={item.href} href={item.href}>
                <div
                  className={cn(
                    "flex items-center gap-3 px-4 py-2.5 rounded-xl cursor-pointer transition-all duration-200",
                    "hover:scale-[1.02] hover:shadow-md",
                    active
                      ? "bg-blue-100 text-blue-700 shadow-inner font-medium"
                      : "text-gray-600 hover:bg-blue-50 hover:text-blue-700"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm md:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
