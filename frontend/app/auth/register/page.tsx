"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { User, Briefcase, Eye, EyeOff, ArrowLeft, Shield, Linkedin, Mail, MailCheckIcon, ArrowRight, Loader } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { registerMutationFn } from "@/app/api/auth/api"
import { toast } from "@/hooks/use-toast"
import Logo from "@/components/logo"

const formSchema = z
  .object({
    name: z.string().trim().min(1, { message: "Name is required" }),
    email: z.string().trim().email({ message: "Invalid email" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string().min(1, { message: "Confirm Password is required" }),
    role: z.enum(["jobseeker", "recruiter"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

  
  const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [activeRole, setActiveRole] = useState<"jobseeker" | "recruiter" | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false);

  const router = useRouter()
  const searchParams = useSearchParams()

   const { mutate, isPending } = useMutation({
    mutationFn: registerMutationFn,
  });

  // Check for role param in URL
  useEffect(() => {
    const roleParam = searchParams.get("role")
    if (roleParam === "jobseeker" || roleParam === "recruiter") {
      setActiveRole(roleParam)
    }
  }, [searchParams])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "jobseeker",
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Register values:", values)
     mutate(values, {
      onSuccess: () => {
        setIsSubmitted(true);
      },
      onError: (error) => {
        console.log(error);
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  }
const handleGoogleLogin = () => {
    window.location.href = `${API_BASE}/auth/google`;
  };

  const handleLinkedInLogin = () => {
    window.location.href = `${API_BASE}/auth/linkedin`;
  };

  
 const roles = [
    {
      id: "jobseeker",
      label: "Job Seeker",
      icon: User,
      description: "Find your dream job with AI-powered matching",
    },
    {
      id: "recruiter",
      label: "Recruiter",
      icon: Briefcase,
      description: "Hire top talent with intelligent recommendations",
    },
  ]


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      {!isSubmitted ? (
        <div className="w-full max-w-lg">
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Link>

        <Card className="shadow-xl border border-slate-200 bg-white/90 backdrop-blur-md">
          <CardHeader className="text-center space-y-2">
            <div className=" flex items-center justify-center">
              <Logo/>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">Create your account</CardTitle>
            <CardDescription className="text-gray-600">Join TalentAI and unlock your career potential</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* Role selection (only if no role param in URL) */}
              {!activeRole && (
                <div>
                  <Label className="mb-2 block text-sm font-medium text-gray-700">Select Your Role</Label>
                  <Tabs defaultValue="jobseeker" onValueChange={(val) => form.setValue("role", val as "jobseeker" | "recruiter")}>
                   <TabsList className="grid w-full grid-cols-2 bg-gray-100/50 backdrop-blur-sm">
                  {roles.map((role) => (
                    <TabsTrigger
                      key={role.id}
                      value={role.id}
                      className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
                    >
                      <role.icon className="w-4 h-4 mr-1" />
                      <span className="hidden sm:inline">{role.label}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
                 {roles.map((role) => (
                  <TabsContent key={role.id} value={role.id} className="mt-4">
                    <div className="text-center p-4 bg-blue-50/50 rounded-lg border border-blue-100">
                      <role.icon className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                      <p className="text-sm text-gray-600">{role.description}</p>
                    </div>
                  </TabsContent>
                ))}
                  </Tabs>
                </div>
              )}
              {activeRole && <input type="hidden" {...form.register("role")} value={activeRole} />}

              {/* Name */}
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="John Doe" {...form.register("name")} />
                {form.formState.errors.name && <p className="text-red-500 text-sm">{form.formState.errors.name.message}</p>}
              </div>

              {/* Email */}
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@example.com" {...form.register("email")} />
                {form.formState.errors.email && <p className="text-red-500 text-sm">{form.formState.errors.email.message}</p>}
              </div>

              {/* Password */}
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...form.register("password")}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-gray-400" />}
                  </Button>
                </div>
                {form.formState.errors.password && (
                  <p className="text-red-500 text-sm">{form.formState.errors.password.message}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-1">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" type="password" placeholder="••••••••" {...form.register("confirmPassword")} />
                {form.formState.errors.confirmPassword && (
                  <p className="text-red-500 text-sm">{form.formState.errors.confirmPassword.message}</p>
                )}
              </div>

              {/* Terms */}
              <div className="flex items-center gap-2">
                <Checkbox id="terms" checked={agreedToTerms} onCheckedChange={(val) => setAgreedToTerms(val as boolean)} />
                <Label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the{" "}
                  <Link href="/terms" className="text-blue-600 hover:text-blue-700">
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-blue-600 hover:text-blue-700">
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:opacity-90 transition"
                disabled={!agreedToTerms || isPending}
              >
                {isPending && <Loader className="animate-spin mr-2" />}
                Create Account
              </Button>
            </form>

            {/* Social Auth */}
            <div className="mt-6 space-y-3">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm text-gray-500">
                  <span className="bg-white px-2 uppercase">Or continue with</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
      <Button onClick={handleGoogleLogin} variant="outline" className="flex gap-2">
        <Mail className="w-4 h-4 text-red-500" /> Google
      </Button>
      <Button onClick={handleLinkedInLogin} variant="outline" className="flex gap-2">
        <Linkedin className="w-4 h-4 text-blue-700" /> LinkedIn
      </Button>
    </div>
            </div>

            <p className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
      ):(

        <div className="w-full h-[80vh] flex flex-col gap-2 items-center justify-center rounded-md">
            <div className="size-[48px]">
              <MailCheckIcon size="48px" className="animate-bounce" />
            </div>
            <h2 className="text-xl tracking-[-0.16px] dark:text-[#fcfdffef] font-bold">
              Check your email
            </h2>
            <p className="mb-2 text-center text-sm text-muted-foreground dark:text-[#f1f7feb5] font-normal">
              We just sent a verification link to {form.getValues().email}.
            </p>
            <Link href="/auth/login">
              <Button className="h-[40px] bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400">
                Go to login
                <ArrowRight />
              </Button>
            </Link>
          </div>
      )}
      
      
    </div>
  )
}
