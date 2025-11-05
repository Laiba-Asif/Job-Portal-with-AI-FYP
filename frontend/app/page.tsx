
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Button
} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  Briefcase,
  Users,
  Brain,
  Shield,
  Star,
  MessageSquare,
  BarChart3,
} from "lucide-react";
import Link from "next/link";
import Logo from "@/components/logo";

export default function HomePage() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Matching",
      description:
        "Advanced AI algorithms match candidates with perfect job opportunities based on skills, experience, and preferences.",
    },
    {
      icon: Shield,
      title: "ATS Score Analysis",
      description:
        "Get detailed ATS compatibility scores and recommendations to optimize your resume for better visibility.",
    },
    {
      icon: Users,
      title: "Smart Recruitment",
      description:
        "Streamlined hiring process with intelligent candidate recommendations and comprehensive tracking tools.",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description:
        "Comprehensive insights and reporting to optimize your hiring process and track performance metrics.",
    },
  ];

  const stats = [
    { number: "50K+", label: "Active Job Seekers" },
    { number: "5K+", label: "Trusted Companies" },
    { number: "95%", label: "Match Accuracy" },
    { number: "24/7", label: "AI Support" },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "HR Director at TechCorp",
      content:
        "JobMatch has revolutionized our hiring process. The AI matching is incredibly accurate and has reduced our time-to-hire by 60%.",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Michael Chen",
      role: "Software Engineer",
      content:
        "I found my dream job within 2 weeks using JobMatch. The platform's recommendations were spot-on and the process was seamless.",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Emily Davis",
      role: "Talent Acquisition Manager",
      content:
        "The enterprise features and analytics have given us unprecedented insights into our recruitment pipeline. Highly recommended!",
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 border-b border-gray-200 bg-white/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
             <Logo />
              <span className="text-xl font-semibold tracking-tight">Kasb</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-gray-600 hover:text-indigo-600 transition-colors">
                Features
              </Link>
              <Link href="#pricing" className="text-gray-600 hover:text-indigo-600 transition-colors">
                Pricing
              </Link>
              <Link href="#about" className="text-gray-600 hover:text-indigo-600 transition-colors">
                About
              </Link>
              <Link href="#contact" className="text-gray-600 hover:text-indigo-600 transition-colors">
                Contact
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/auth/login">
                <Button variant="ghost" className="rounded-full">Sign In</Button>
              </Link>
              <Link href="/auth/register">
                <Button className="rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-400  hover:bg-indigo-700 text-white">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative pt-36 md:pt-44 pb-24 overflow-hidden">
        {/* animated gradient "aura" */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -top-56 -left-56 h-[900px] w-[900px] rounded-full opacity-25 blur-3xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400"
          animate={{ scale: [1, 1.12, 1], rotate: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 14 }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -bottom-72 -right-72 h-[780px] w-[780px] rounded-full opacity-20 blur-3xl bg-gradient-to-tr from-cyan-400 via-indigo-600 to-purple-600"
          animate={{ scale: [1, 1.08, 1], rotate: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 16 }}
        />

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center px-4 py-2 rounded-full border border-indigo-200/60 bg-indigo-50/60 backdrop-blur-sm mb-8"
          >
            <Star className="w-4 h-4 text-indigo-600 mr-2" />
            <span className="text-sm font-medium text-indigo-700">
              Enterprise‑grade AI job matching platform
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight"
          >
            Find your perfect {""}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-400 bg-clip-text text-transparent">
              career match
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Connect talent with opportunity using advanced AI. Get personalized job recommendations, ATS‑optimized
            profiles, and deep analytics—wrapped in a developer‑friendly experience.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/auth/register?role=jobseeker">
              <Button className="rounded-full px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-400 text-white shadow-lg hover:shadow-xl">
                Find Jobs <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/auth/register?role=recruiter">
              <Button variant="outline" className="rounded-full px-8 py-4">
                Hire Talent
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Enterprise‑grade features
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Cutting‑edge tools to create perfect matches between talent and opportunities with world‑class security.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  className="group h-full border border-gray-200/80 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  onMouseEnter={() => setActiveFeature(index)}
                >
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-indigo-50 flex items-center justify-center group-hover:bg-gradient-to-tr group-hover:from-indigo-600 group-hover:via-purple-600 group-hover:to-cyan-400 transition-colors">
                      <feature.icon className="w-8 h-8 text-indigo-600 group-hover:text-white" />
                    </div>
                    <CardTitle className="text-lg font-semibold">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 text-center leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">How it works</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Get started in three simple steps and let our AI do the heavy lifting.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Create your profile",
                description:
                  "Upload your resume and complete your professional profile with guided AI optimization.",
                icon: Users,
              },
              {
                step: "02",
                title: "AI analysis & matching",
                description:
                  "We analyze your skills, experience, and preferences to build your professional fingerprint.",
                icon: Brain,
              },
              {
                step: "03",
                title: "Get connected",
                description:
                  "Receive personalized job recommendations and connect with employers looking for your skillset.",
                icon: MessageSquare,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="text-center"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center text-2xl font-bold">
                  <item.icon className="w-8 h-8" />
                </div>
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-indigo-50 text-indigo-700 mb-2">
                    Step {item.step}
                  </span>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Trusted by industry leaders</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              See what enterprise clients and job seekers say about their experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                <Card className="border border-gray-200 bg-white/80 backdrop-blur-sm rounded-2xl hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <img
                        src={t.avatar || "/placeholder.svg"}
                        alt={t.name}
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div>
                        <h4 className="font-semibold">{t.name}</h4>
                        <p className="text-sm text-gray-600">{t.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">“{t.content}”</p>
                    <div className="flex items-center mt-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-indigo-50 to-transparent" />
        </div>
        <div className="max-w-4xl mx-auto text-center px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Ready to transform your career?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-gray-600 mb-8"
          >
            Join thousands of professionals and companies finding success through our AI‑powered platform.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/auth/register?role=jobseeker">
              <Button className="rounded-full px-8 py-4 bg-white text-indigo-700 border border-indigo-200 hover:bg-gray-50">
                Start Job Search
              </Button>
            </Link>
            <Link href="/auth/register?role=recruiter">
              <Button
                variant="outline"
                className="rounded-full px-8 py-4 border-2 border-indigo-600 text-indigo-700 hover:bg-indigo-50"
              >
                Post a Job
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-md bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-semibold">JobMatch</span>
              </div>
              <p className="text-gray-400">
                Connecting talent with opportunity through the power of artificial intelligence and enterprise‑grade
                technology.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">For Job Seekers</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/jobs" className="hover:text-white transition-colors">
                    Browse Jobs
                  </Link>
                </li>
                <li>
                  <Link href="/resume-builder" className="hover:text-white transition-colors">
                    Resume Builder
                  </Link>
                </li>
                <li>
                  <Link href="/career-advice" className="hover:text-white transition-colors">
                    Career Advice
                  </Link>
                </li>
                <li>
                  <Link href="/salary-insights" className="hover:text-white transition-colors">
                    Salary Insights
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">For Employers</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/post-job" className="hover:text-white transition-colors">
                    Post a Job
                  </Link>
                </li>
                <li>
                  <Link href="/talent-search" className="hover:text-white transition-colors">
                    Search Talent
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/enterprise" className="hover:text-white transition-colors">
                    Enterprise Solutions
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} JobMatch. All rights reserved. Built with care.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}


// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { ArrowRight, Briefcase, Users, Brain, Shield, Star, MessageSquare, BarChart3 } from "lucide-react"
// import Link from "next/link"

// export default function HomePage() {
//   const [activeFeature, setActiveFeature] = useState(0)

//   const features = [
//     {
//       icon: Brain,
//       title: "AI-Powered Matching",
//       description:
//         "Advanced AI algorithms match candidates with perfect job opportunities based on skills, experience, and preferences.",
//     },
//     {
//       icon: Shield,
//       title: "ATS Score Analysis",
//       description:
//         "Get detailed ATS compatibility scores and recommendations to optimize your resume for better visibility.",
//     },
//     {
//       icon: Users,
//       title: "Smart Recruitment",
//       description:
//         "Streamlined hiring process with intelligent candidate recommendations and comprehensive tracking tools.",
//     },
//     {
//       icon: BarChart3,
//       title: "Advanced Analytics",
//       description:
//         "Comprehensive insights and reporting to optimize your hiring process and track performance metrics.",
//     },
//   ]

//   const stats = [
//     { number: "50K+", label: "Active Job Seekers" },
//     { number: "5K+", label: "Trusted Companies" },
//     { number: "95%", label: "Match Accuracy" },
//     { number: "24/7", label: "AI Support" },
//   ]

//   const testimonials = [
//     {
//       name: "Sarah Johnson",
//       role: "HR Director at TechCorp",
//       content:
//         "JobMatch has revolutionized our hiring process. The AI matching is incredibly accurate and has reduced our time-to-hire by 60%.",
//       avatar: "/placeholder.svg?height=60&width=60",
//     },
//     {
//       name: "Michael Chen",
//       role: "Software Engineer",
//       content:
//         "I found my dream job within 2 weeks using JobMatch. The platform's recommendations were spot-on and the process was seamless.",
//       avatar: "/placeholder.svg?height=60&width=60",
//     },
//     {
//       name: "Emily Davis",
//       role: "Talent Acquisition Manager",
//       content:
//         "The enterprise features and analytics have given us unprecedented insights into our recruitment pipeline. Highly recommended!",
//       avatar: "/placeholder.svg?height=60&width=60",
//     },
//   ]

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Navigation */}
//       <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-2">
//               <div className="w-8 h-8 bg-green-600 rounded-md flex items-center justify-center">
//                 <Briefcase className="w-5 h-5 text-white" />
//               </div>
//               <span className="text-xl font-semibold text-gray-900">JobMatch</span>
//             </div>
//             <div className="hidden md:flex items-center space-x-8">
//               <Link href="#features" className="text-gray-600 hover:text-green-600 transition-colors">
//                 Features
//               </Link>
//               <Link href="#pricing" className="text-gray-600 hover:text-green-600 transition-colors">
//                 Pricing
//               </Link>
//               <Link href="#about" className="text-gray-600 hover:text-green-600 transition-colors">
//                 About
//               </Link>
//               <Link href="#contact" className="text-gray-600 hover:text-green-600 transition-colors">
//                 Contact
//               </Link>
//             </div>
//             <div className="flex items-center space-x-4">
//               <Link href="/auth/login">
//                 <Button variant="ghost" className="text-gray-700 hover:text-green-600">
//                   Sign In
//                 </Button>
//               </Link>
//               <Link href="/auth/register">
//                 <Button className="bg-green-600 hover:bg-green-700 text-white">Get Started</Button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-green-50 to-white">
//         <div className="max-w-7xl mx-auto text-center">
//           <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 border border-green-200 mb-8">
//             <Star className="w-4 h-4 text-green-600 mr-2" />
//             <span className="text-sm font-medium text-green-700">Enterprise-Grade AI Job Matching Platform</span>
//           </div>

//           <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
//             Find Your Perfect
//             <span className="text-green-600"> Career Match</span>
//           </h1>

//           <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
//             Connect talented professionals with dream opportunities using advanced AI technology. Get personalized job
//             recommendations, ATS-optimized profiles, and comprehensive recruitment analytics.
//           </p>

//           <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
//             <Link href="/auth/register?role=jobseeker">
//               <Button
//                 size="lg"
//                 className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold"
//               >
//                 Find Jobs
//                 <ArrowRight className="ml-2 w-5 h-5" />
//               </Button>
//             </Link>
//             <Link href="/auth/register?role=client">
//               <Button
//                 size="lg"
//                 variant="outline"
//                 className="border-2 border-green-600 text-green-600 hover:bg-green-50 px-8 py-4 rounded-lg font-semibold bg-transparent"
//               >
//                 Hire Talent
//               </Button>
//             </Link>
//           </div>

//           {/* Stats */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
//             {stats.map((stat, index) => (
//               <div key={index} className="text-center">
//                 <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
//                 <div className="text-gray-600 font-medium">{stat.label}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section id="features" className="py-20 px-6 bg-gray-50">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Enterprise-Grade Features</h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               Our intelligent platform uses cutting-edge technology to create perfect matches between talent and
//               opportunities with enterprise-level security and analytics.
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {features.map((feature, index) => (
//               <Card
//                 key={index}
//                 className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white border-gray-200"
//                 onMouseEnter={() => setActiveFeature(index)}
//               >
//                 <CardHeader className="text-center pb-4">
//                   <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
//                     <feature.icon className="w-8 h-8 text-green-600 group-hover:text-white" />
//                   </div>
//                   <CardTitle className="text-xl font-semibold text-gray-900">{feature.title}</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <CardDescription className="text-gray-600 text-center leading-relaxed">
//                     {feature.description}
//                   </CardDescription>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* How It Works */}
//       <section className="py-20 px-6 bg-white">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">How It Works</h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               Get started in three simple steps and let our enterprise AI do the heavy lifting.
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             {[
//               {
//                 step: "01",
//                 title: "Create Your Profile",
//                 description:
//                   "Upload your resume and complete your professional profile with our guided setup process and AI optimization.",
//                 icon: Users,
//               },
//               {
//                 step: "02",
//                 title: "AI Analysis & Matching",
//                 description:
//                   "Our enterprise AI analyzes your skills, experience, and preferences to create your unique professional fingerprint.",
//                 icon: Brain,
//               },
//               {
//                 step: "03",
//                 title: "Get Connected",
//                 description:
//                   "Receive personalized job recommendations and connect with employers looking for your exact skillset through our platform.",
//                 icon: MessageSquare,
//               },
//             ].map((item, index) => (
//               <div key={index} className="text-center group">
//                 <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-2xl font-bold group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
//                   <item.icon className="w-8 h-8" />
//                 </div>
//                 <div className="mb-4">
//                   <span className="inline-block px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium mb-2">
//                     Step {item.step}
//                   </span>
//                   <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
//                 </div>
//                 <p className="text-gray-600 leading-relaxed">{item.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Testimonials */}
//       <section className="py-20 px-6 bg-gray-50">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Trusted by Industry Leaders</h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               See what our enterprise clients and job seekers have to say about their experience.
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             {testimonials.map((testimonial, index) => (
//               <Card key={index} className="bg-white border-gray-200 hover:shadow-lg transition-shadow duration-300">
//                 <CardContent className="p-6">
//                   <div className="flex items-center mb-4">
//                     <img
//                       src={testimonial.avatar || "/placeholder.svg"}
//                       alt={testimonial.name}
//                       className="w-12 h-12 rounded-full mr-4"
//                     />
//                     <div>
//                       <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
//                       <p className="text-sm text-gray-600">{testimonial.role}</p>
//                     </div>
//                   </div>
//                   <p className="text-gray-700 leading-relaxed">"{testimonial.content}"</p>
//                   <div className="flex items-center mt-4">
//                     {[...Array(5)].map((_, i) => (
//                       <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 px-6 bg-green-600">
//         <div className="max-w-4xl mx-auto text-center">
//           <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Transform Your Career?</h2>
//           <p className="text-xl text-green-100 mb-8">
//             Join thousands of professionals and companies who have found success through our AI-powered platform.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Link href="/auth/register?role=jobseeker">
//               <Button
//                 size="lg"
//                 className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold"
//               >
//                 Start Job Search
//               </Button>
//             </Link>
//             <Link href="/auth/register?role=client">
//               <Button
//                 size="lg"
//                 variant="outline"
//                 className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 rounded-lg font-semibold bg-transparent"
//               >
//                 Post a Job
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-white py-12 px-6">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid md:grid-cols-4 gap-8">
//             <div>
//               <div className="flex items-center space-x-2 mb-4">
//                 <div className="w-8 h-8 bg-green-600 rounded-md flex items-center justify-center">
//                   <Briefcase className="w-5 h-5 text-white" />
//                 </div>
//                 <span className="text-xl font-semibold">JobMatch</span>
//               </div>
//               <p className="text-gray-400">
//                 Connecting talent with opportunity through the power of artificial intelligence and enterprise-grade
//                 technology.
//               </p>
//             </div>
//             <div>
//               <h3 className="font-semibold mb-4">For Job Seekers</h3>
//               <ul className="space-y-2 text-gray-400">
//                 <li>
//                   <Link href="/jobs" className="hover:text-white transition-colors">
//                     Browse Jobs
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/resume-builder" className="hover:text-white transition-colors">
//                     Resume Builder
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/career-advice" className="hover:text-white transition-colors">
//                     Career Advice
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/salary-insights" className="hover:text-white transition-colors">
//                     Salary Insights
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="font-semibold mb-4">For Employers</h3>
//               <ul className="space-y-2 text-gray-400">
//                 <li>
//                   <Link href="/post-job" className="hover:text-white transition-colors">
//                     Post a Job
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/talent-search" className="hover:text-white transition-colors">
//                     Search Talent
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/pricing" className="hover:text-white transition-colors">
//                     Pricing
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/enterprise" className="hover:text-white transition-colors">
//                     Enterprise Solutions
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="font-semibold mb-4">Company</h3>
//               <ul className="space-y-2 text-gray-400">
//                 <li>
//                   <Link href="/about" className="hover:text-white transition-colors">
//                     About Us
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/contact" className="hover:text-white transition-colors">
//                     Contact
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/privacy" className="hover:text-white transition-colors">
//                     Privacy Policy
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/terms" className="hover:text-white transition-colors">
//                     Terms of Service
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           </div>
//           <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
//             <p>&copy; 2024 JobMatch. All rights reserved. Enterprise AI-Powered Job Portal.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   )
// }
