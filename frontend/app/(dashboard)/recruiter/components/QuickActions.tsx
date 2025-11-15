"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  Users,
  Building,
  ClipboardList,
} from "lucide-react";
import Link from "next/link";

export default function QuickActions() {
  const actions = [
    {
      title: "Post New Job",
      desc: "Create a new job opening instantly",
      icon: <Briefcase className="w-5 h-5 text-blue-600" />,
      link: "/recruiter/jobs/create",
      color: "from-blue-50 to-blue-100 border-blue-200",
      btnColor: "bg-blue-600 hover:bg-blue-700",
      btnText: "Post Job",
    },
    {
      title: "View Applications",
      desc: "Check the latest job applicants",
      icon: <Users className="w-5 h-5 text-purple-600" />,
      link: "/recruiter/applications",
      color: "from-purple-50 to-purple-100 border-purple-200",
      btnColor: "bg-purple-600 hover:bg-purple-700",
      btnText: "View",
    },
    {
      title: "Manage Jobs",
      desc: "Edit or close active job posts",
      icon: <ClipboardList className="w-5 h-5 text-green-600" />,
      link: "/recruiter/jobs",
      color: "from-green-50 to-green-100 border-green-200",
      btnColor: "bg-green-600 hover:bg-green-700",
      btnText: "Manage",
    },
    {
      title: "Update Company Profile",
      desc: "Add or modify company details",
      icon: <Building className="w-5 h-5 text-orange-600" />,
      link: "/recruiter/profile",
      color: "from-orange-50 to-orange-100 border-orange-200",
      btnColor: "bg-orange-600 hover:bg-orange-700",
      btnText: "Update",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.3 }}
    >
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
        <CardHeader className="bg-blue-50 border-b border-blue-200">
          <CardTitle className="text-blue-700 text-xl">Quick Actions</CardTitle>
        </CardHeader>

        <CardContent className="grid gap-4 p-6">
          {actions.map((action, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              className={`flex items-center justify-between p-4 bg-gradient-to-br ${action.color} rounded-lg border cursor-pointer transition-all`}
            >
              <div className="flex items-center space-x-3">
                {action.icon}
                <div>
                  <p className="font-medium text-gray-800">{action.title}</p>
                  <p className="text-sm text-gray-600">{action.desc}</p>
                </div>
              </div>
              <Link href={action.link}>
                <Button
                  size="sm"
                  variant="outline"
                  className={`w-24 text-white ${action.btnColor}`}
                >
                  {action.btnText}
                </Button>
              </Link>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}
