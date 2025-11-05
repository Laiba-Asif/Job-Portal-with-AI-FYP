"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/auth-provider";


export default function AuthSuccessPage() {
  const router = useRouter();
  const { refetch } = useAuthContext();

  useEffect(() => {
    (async () => {
      const result = await refetch(); // result is { data, error }
        console.log("result", result);
      const user = result.data?.data?.user ; 
      console.log("user", user);

      if (!user) {
        router.push("/auth/login");
        console.log("No user found");
        return;
      }

      // role-based redirect
      if (!user.role || user.role === "pending") {
        router.push("/select-role");
        console.log("pending")
      } else if (user.role === "admin") {
        router.push("/admin/dashboard");
      } else if (user.role === "recruiter") {
        router.push("/recruiter/dashboard");
      } else {
        router.push("/jobseeker/dashboard");
      }
    })();
  }, [refetch, router]);

  return <p>Logging you in...</p>;
}
