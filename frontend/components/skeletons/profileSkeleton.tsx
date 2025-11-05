
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProfileSkeleton() {
  return (
    <Card className="bg-white border border-gray-100 shadow-sm rounded-2xl animate-pulse">
      <CardHeader className="pb-0">
        <CardTitle className="text-lg font-semibold text-gray-800">
          <Skeleton className="h-5 w-32 rounded-md" />
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-4 space-y-6">
        {/* Avatar + Info */}
        <div className="flex flex-col items-center space-y-3">
          <Skeleton className="h-24 w-24 rounded-full" />
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-16" />
        </div>

        {/* Progress Section */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <Skeleton className="h-3 w-28" />
              <Skeleton className="h-3 w-16" />
            </div>
            <Skeleton className="h-2 w-full rounded-full" />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <Skeleton className="h-3 w-28" />
              <Skeleton className="h-3 w-16" />
            </div>
            <Skeleton className="h-2 w-full rounded-full" />
          </div>
        </div>

        {/* Skills */}
        <div>
          <Skeleton className="h-4 w-24 mb-2" />
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-3 w-12" />
                </div>
                <Skeleton className="h-2 w-full rounded-full" />
              </div>
            ))}
          </div>
        </div>

        <Skeleton className="h-10 w-full rounded-full" />
      </CardContent>
    </Card>
  )
}
