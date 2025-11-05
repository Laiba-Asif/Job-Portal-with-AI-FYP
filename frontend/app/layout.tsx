import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import QueryProvider from "../context/query-provider"
import { AuthProvider } from "@/context/auth-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "JobMatch - AI-Powered Job Portal",
  description: "Connect talented professionals with dream opportunities using advanced AI technology",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      
      <body className={inter.className}>
        
        <QueryProvider>


        {children}
        <Toaster />
        </QueryProvider>
        </body>
    </html>
  )
}
