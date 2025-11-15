"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Briefcase,
  FileText,
  Video,
  UserCheck,
} from "lucide-react";



export default function MetricCards() {
  const [isLoading , setIsLoading] = useState(false)

  const metricsConfig = [
    {
      title: "Active Jobs",
      value:  "0",
      icon: Briefcase,
      color: "blue",
      bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
      textColor: "text-blue-700",
      iconColor: "text-blue-600",
      borderColor: "border-blue-200",
    },
    {
      title: "Applications",
      value:   "0",
      icon: FileText,
      color: "green",
      bgColor: "bg-gradient-to-br from-green-50 to-green-100",
      textColor: "text-green-700",
      iconColor: "text-green-600",
      borderColor: "border-green-200",
    },
    {
      title: "Interviews",
      value: "0",
      icon: Video,
      color: "gray",
      bgColor: "bg-gradient-to-br from-gray-50 to-gray-100",
      textColor: "text-gray-700",
      iconColor: "text-gray-600",
      borderColor: "border-gray-200",
    },
    {
      title: "Hired",
      value: "0",
      icon: UserCheck,
      color: "purple",
      bgColor: "bg-gradient-to-br from-purple-50 to-purple-100",
      textColor: "text-purple-700",
      iconColor: "text-purple-600",
      borderColor: "border-purple-200",
    },
   
    
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
        {Array.from({ length: 5 }).map((_, index) => (
          <Card key={index} className="animate-pulse">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-12"></div>
                </div>
                <div className="w-8 h-8 bg-gray-200 rounded"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-2  lg:grid-cols-4 gap-4 mb-10"
    >
      {metricsConfig.map((metric, index) => (
        <motion.div
          key={metric.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
          whileHover={{ scale: 1.02 }}
          className="cursor-pointer"
        >
          <Card
            className={`${metric.bgColor} border ${metric.borderColor} shadow-sm hover:shadow-lg transition-all duration-300`}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className={`text-sm font-semibold ${metric.textColor} mb-1`}
                  >
                    {metric.title}
                  </p>
                  <p className={`text-3xl font-bold ${metric.textColor}`}>
                    {metric.value}
                  </p>
                </div>
                <metric.icon className={`w-8 h-8 ${metric.iconColor}`} />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
