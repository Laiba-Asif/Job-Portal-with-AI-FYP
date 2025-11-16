"use client";

import { useEffect, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postRecruiterProfile, updateRecruiterProfile } from "@/app/api/recruiter/api";
import { useRecruiter } from "@/context/recruiterContext";
import ProfileSkeleton from "@/components/skeletons/profileSkeleton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { Progress } from "@/components/ui/progress";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Building2, Globe, Users, Link as LinkIcon, Mail } from "lucide-react";
import { useRouter } from "next/navigation";

const recruiterProfileSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  industry: z.string().optional(),
  companySize: z.string().optional(),
  foundedYear: z.string().optional(),
  headquarters: z.string().optional(),
  aboutCompany: z.string().optional(),
  mission: z.string().optional(),
  vision: z.string().optional(),
  logoUrl: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  website: z.string().optional(),
  linkedin: z.string().optional(),
  twitter: z.string().optional(),
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  hiringEmail: z.string().email("Invalid email").optional(),
  hiringManager: z.string().optional(),
  departments: z.string().optional(),
});

const industries = [
  "Information Technology",
  "Finance",
  "Healthcare",
  "Education",
  "Marketing",
  "Retail",
  "Manufacturing",
];

const companySizes = ["1-10", "11-50", "51-200", "201-500", "500+"];

// ONLY YEARS FROM 1990–2025
const years = Array.from({ length: 2025 - 1990 + 1 }, (_, i) => (1990 + i).toString());

export default function RecruiterProfileForm() {
  const queryClient = useQueryClient();
  const { profile, isLoading } = useRecruiter();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(recruiterProfileSchema),
    defaultValues: profile ?? {},
  });

  const watchedFields = watch();

  const completion = useMemo(() => {
    const fields = [
      "companyName",
      "industry",
      "companySize",
      "aboutCompany",
      "mission",
      "vision",
      "logoUrl",
      "country",
      "city",
      "address",
      "website",
      "linkedin",
      "hiringEmail",
      "hiringManager",
    ];
    let filled = 0;
    fields.forEach((f) => {
      if (watchedFields[f]) filled++;
    });
    return Math.round((filled / fields.length) * 100);
  }, [watchedFields]);

  useEffect(() => {
    if (profile) {
      reset({
        ...profile,
        departments: profile.departments?.join(", ") || "",
      });
    }
  }, [profile, reset]);

  // CREATE PROFILE
  const createMutation = useMutation({
    mutationFn: postRecruiterProfile,
    onSuccess: () => {
      toast.success("Profile created successfully");
      queryClient.invalidateQueries(["recruiter-profile"]);
      router.push("/recruiter/dashboard");
    },
  });

  // UPDATE PROFILE
  const updateMutation = useMutation({
    mutationFn: (data: any) => updateRecruiterProfile(profile._id, data),
    onSuccess: () => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries(["recruiter-profile"]);
      router.push("/recruiter/dashboard");
    },
  });

  const onSubmit = (data: any) => {
    const payload = {
      ...data,
      departments: data.departments?.split(",").map((d: string) => d.trim()),
    };

    if (profile?._id) updateMutation.mutate(payload);
    else createMutation.mutate(payload);
  };

  if (isLoading) return <ProfileSkeleton />;

  return (
    <div className="max-w-6xl mx-auto p-5 sm:p-8 space-y-8">
      <h1 className="text-3xl font-bold text-green-700 text-center">
        {profile ? "Update Your Company Profile" : "Create Your Company Profile"}
      </h1>

      {/* Progress */}
      <div className="bg-white p-4 rounded-xl border border-green-100 shadow-sm">
        <h2 className="text-lg font-medium mb-2 text-green-700">Profile Completion</h2>
        <Progress value={completion} className="h-3 rounded-full bg-green-100" />
        <p className="mt-1 text-sm text-gray-500">{completion}% complete</p>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* LEFT SIDE */}
        <div className="space-y-6">

          {/* Company Info */}
          <section className="bg-white p-6 rounded-xl border border-green-100 shadow-md space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2 text-green-700">
              <Building2 className="w-5 h-5 text-green-600" /> Company Information
            </h2>

            <Input placeholder="Company Name" {...register("companyName")} />

            <select {...register("industry")} className="border rounded-lg p-3 bg-green-50 focus:ring-2 focus:ring-green-400">
              <option value="">Select Industry</option>
              {industries.map((i) => (
                <option key={i} value={i}>{i}</option>
              ))}
            </select>

            <select {...register("companySize")} className="border rounded-lg p-3 bg-green-50 focus:ring-2 focus:ring-green-400">
              <option value="">Select Company Size</option>
              {companySizes.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            <select {...register("foundedYear")} className="border rounded-lg p-3 bg-green-50 focus:ring-2 focus:ring-green-400">
              <option value="">Founded Year</option>
              {years.reverse().map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>

            <Input placeholder="Headquarters" {...register("headquarters")} />
          </section>

          {/* Branding */}
          <section className="bg-white p-6 rounded-xl border border-green-100 shadow-md space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2 text-green-700">
              <Globe className="w-5 h-5 text-green-600" /> Branding & Description
            </h2>

            <Textarea placeholder="About Company" {...register("aboutCompany")} />
            <Textarea placeholder="Mission" {...register("mission")} />
            <Textarea placeholder="Vision" {...register("vision")} />
            <Input placeholder="Logo URL" {...register("logoUrl")} />
          </section>

          {/* Contact */}
          <section className="bg-white p-6 rounded-xl border border-green-100 shadow-md space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2 text-green-700">
              <Users className="w-5 h-5 text-green-600" /> Contact Information
            </h2>

            <Input placeholder="Country" {...register("country")} />
            <Input placeholder="City" {...register("city")} />
            <Input placeholder="Address" {...register("address")} />

            <Controller
              control={control}
              name="phone"
              render={({ field }) => (
                <PhoneInput
                  country={"us"}
                  value={field.value}
                  onChange={field.onChange}
                  inputClass="border rounded-lg w-full p-3 bg-green-50"
                />
              )}
            />

            <Input placeholder="Website" {...register("website")} />
          </section>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">

          {/* Social */}
          <section className="bg-white p-6 rounded-xl border border-green-100 shadow-md space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2 text-green-700">
              <LinkIcon className="w-5 h-5 text-green-600" /> Social Links
            </h2>

            <Input placeholder="LinkedIn" {...register("linkedin")} />
            <Input placeholder="Twitter" {...register("twitter")} />
            <Input placeholder="Facebook" {...register("facebook")} />
            <Input placeholder="Instagram" {...register("instagram")} />
          </section>

          {/* Hiring */}
          <section className="bg-white p-6 rounded-xl border border-green-100 shadow-md space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2 text-green-700">
              <Mail className="w-5 h-5 text-green-600" /> Hiring Details
            </h2>

            <Input placeholder="Hiring Email" {...register("hiringEmail")} />
            <Input placeholder="Hiring Manager" {...register("hiringManager")} />
            <Input placeholder="Departments (comma separated)" {...register("departments")} />
          </section>
        </div>

        {/* BUTTON */}
        <div className="md:col-span-2">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 hover:bg-green-700 text-white rounded-full py-4 text-lg font-semibold shadow-lg transition"
          >
            {profile ? "Update Profile" : "Create Profile"}
          </Button>
        </div>
      </form>
    </div>
  );
}
