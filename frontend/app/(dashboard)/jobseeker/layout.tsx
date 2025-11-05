// /app/jobseeker/layout.tsx (or your root layout)

import { JobSeekerProvider } from "@/context/jobseekerContext";


export default function JobSeekerLayout({ children }: { children: React.ReactNode }) {
  return (
    <JobSeekerProvider>
      {children}
    </JobSeekerProvider>
  )
}
