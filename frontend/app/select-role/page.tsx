"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Briefcase, User } from "lucide-react";
import { useAuthContext } from "@/context/auth-provider";
import { roleMutationFn } from "../api/user/api";

const SelectRole = () => {
  const router = useRouter();
  const { refetch } = useAuthContext();

  const { mutate, isPending } = useMutation({
    mutationFn: roleMutationFn,
    onSuccess: async () => {
      const result = await refetch();
      const user = result.data?.data?.user;

      if (!user) {
        router.push("/login");
        return;
      }

      if (user.role === "recruiter") {
        router.push("/recruiter/dashboard");
      } else if (user.role === "jobseeker") {
        router.push("/jobseeker/dashboard");
      } else {
        router.push("/login");
      }
    },
    onError: (err: any) => {
      console.error("Role update failed", err);
    },
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      {/* Left - Recruiter */}
      <div className="flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-blue-400 text-white p-8">
        <Briefcase className="w-20 h-20 mb-6" />
        <h2 className="text-3xl font-bold mb-2">I’m a Recruiter</h2>
        <p className="text-center mb-6 text-blue-100">
          Post jobs, manage candidates, and find top talent for your company.
        </p>
        <button
          disabled={isPending}
          onClick={() => mutate("recruiter")}
          className="px-6 py-3 rounded-xl bg-white text-blue-600 font-semibold shadow hover:bg-gray-100 transition disabled:opacity-50"
        >
          Continue as Recruiter
        </button>
      </div>

      {/* Right - Job Seeker */}
      <div className="flex flex-col items-center justify-center bg-gradient-to-br from-green-600 to-green-400 text-white p-8">
        <User className="w-20 h-20 mb-6" />
        <h2 className="text-3xl font-bold mb-2">I’m a Job Seeker</h2>
        <p className="text-center mb-6 text-green-100">
          Discover opportunities, apply to jobs, and showcase your skills.
        </p>
        <button
          disabled={isPending}
          onClick={() => mutate("jobseeker")}
          className="px-6 py-3 rounded-xl bg-white text-green-600 font-semibold shadow hover:bg-gray-100 transition disabled:opacity-50"
        >
          Continue as Job Seeker
        </button>
      </div>
    </div>
  );
};

export default SelectRole;
