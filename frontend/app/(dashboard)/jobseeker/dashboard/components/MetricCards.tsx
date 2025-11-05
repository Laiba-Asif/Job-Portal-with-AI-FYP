"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Eye,
  Send,
  Calendar,
  CheckCircle,
} from "lucide-react";

interface MetricsData {
  averageScore: string;
  synced: number;
  unsynced: number;
  processing: number;
  failed: number;
}

interface MetricsCardsProps {
  userId: string;
}

export default function MetricCards() {
  const [metrics, setMetrics] = useState<MetricsData | null>(null);
  const [loading, setLoading] = useState(false);

  

  const metricsConfig = [
    {
      title: "ATS Score",
      value: metrics?.averageScore  || "0",
      icon: TrendingUp,
      color: "blue",
      bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
      textColor: "text-blue-700",
      iconColor: "text-blue-600",
      borderColor: "border-blue-200",
    },
    {
      title: "Profile Views",
      value: metrics?.synced?.toString() || "0",
      icon: Eye,
      color: "green",
      bgColor: "bg-gradient-to-br from-green-50 to-green-100",
      textColor: "text-green-700",
      iconColor: "text-green-600",
      borderColor: "border-green-200",
    },
    {
      title: "Applied Jobs",
      value: metrics?.unsynced?.toString() || "0",
      icon: Send,
      color: "gray",
      bgColor: "bg-gradient-to-br from-gray-50 to-gray-100",
      textColor: "text-gray-700",
      iconColor: "text-gray-600",
      borderColor: "border-gray-200",
    },
    {
      title: "Interviews",
      value: metrics?.processing?.toString() || "0",
      icon: Calendar,
      color: "purple",
      bgColor: "bg-gradient-to-br from-purple-50 to-purple-100",
      textColor: "text-purple-700",
      iconColor: "text-purple-600",
      borderColor: "border-purple-200",
    },
    {
      title: "Job Offers",
      value: metrics?.failed?.toString() || "0",
      icon: CheckCircle,
      color: "red",
      bgColor: "bg-gradient-to-br from-red-50 to-red-100",
      textColor: "text-red-700",
      iconColor: "text-red-600",
      borderColor: "border-red-200",
    },
    
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
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
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10"
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
