"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Inbox, AlertCircle, Star } from "lucide-react";
import UploadResume from "./UploadResume";
import Link from "next/link";

export default function QuickActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.3 }}
    >
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
        {/* Header */}
        <CardHeader className="bg-blue-50 border-b border-blue-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl shadow-lg relative">
                <Inbox className="w-6 h-6 text-white" />
               
              </div>
              <div>
                <CardTitle className="text-blue-700 text-xl">Quick Actions</CardTitle>
                <p className="text-sm text-blue-600">Complete tasks to boost your profile</p>
              </div>
            </div>

            
          </div>
        </CardHeader>

        {/* Content */}
        <CardContent className="space-y-4 p-6">
         <UploadResume/>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center justify-between p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200 cursor-pointer transition-all"
          >
            <div className="flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-purple-700" />
              <div>
                <p className="font-medium text-purple-700">Complete Your Profile</p>
                <p className="text-sm text-purple-500">Add skills and experience details</p>
              </div>
            </div>
            <Link href={'/jobseeker/profile'}>
            <Button  size="sm" variant="outline" className="w-24 bg-purple-600 hover:bg-purple-700 text-white hover:text-white">
              Complete
            </Button>
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center justify-between p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200 cursor-pointer transition-all"
          >
            <div className="flex items-center space-x-3">
              <Star className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium text-blue-700">Set Job Preferences</p>
                <p className="text-sm text-blue-500">Improve job match accuracy</p>
              </div>
            </div>
            <Button size="sm" variant="outline" className=" w-24 bg-blue-600 hover:bg-blue-700 text-white hover:text-white">
              Update
            </Button>   
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
