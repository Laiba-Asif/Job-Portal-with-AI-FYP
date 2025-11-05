"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-6">
      {/* Floating Robot */}
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: [ -20, 20, -20 ] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="mb-6"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
          className="w-40 h-40 text-indigo-600"
          fill="currentColor"
        >
          <circle cx="100" cy="100" r="80" fill="currentColor" opacity="0.2" />
          <rect x="70" y="60" width="60" height="50" rx="10" fill="currentColor" />
          <circle cx="85" cy="85" r="8" fill="white" />
          <circle cx="115" cy="85" r="8" fill="white" />
          <rect x="90" y="110" width="20" height="6" rx="3" fill="white" />
          <rect x="50" y="140" width="100" height="20" rx="10" fill="currentColor" />
        </svg>
      </motion.div>

      {/* Text */}
      <h1 className="text-6xl font-extrabold text-gray-900 dark:text-white">404</h1>
      <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 text-center max-w-md">
        Looks like our AI recruiter couldn’t find this page 🤖.  
        Maybe you took a wrong turn?
      </p>

      {/* Buttons */}
      <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/auth/register?role=jobseeker">
              <Button className="rounded-full px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-400 text-white shadow-lg hover:shadow-xl">
                Find Jobs<ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/auth/register?role=recruiter">
              <Button variant="outline" className="rounded-full px-8 py-4">
                Hire Talent
              </Button>
            </Link>
          </motion.div>
    </div>
  );
}
