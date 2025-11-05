"use client";

import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { verifyEmailMutationFn } from "@/app/api/auth/api";
import { useMutation } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

export default function ConfirmAccount() {
  const router = useRouter();
  const params = useSearchParams();
  const code = params.get("code");

  const { mutate, isPending } = useMutation({
    mutationFn: verifyEmailMutationFn,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!code) {
      toast({
        title: "Error",
        description: "Confirmation token not found",
        variant: "destructive",
      });
      return;
    }
    mutate(
      { code },
      {
        onSuccess: () => {
          toast({
            title: "Success",
            description: "Account confirmed successfully",
          });
          router.replace("/auth/login");
        },
        onError: (error: any) => {
          toast({
            title: "Error",
            description: error?.message || "Something went wrong",
            variant: "destructive",
          });
        },
      }
    );
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-[#0b0b0c] px-4">
      <div className="w-full max-w-md bg-white dark:bg-[#111113] rounded-2xl shadow-lg p-8">
        <div className="flex justify-center mb-6">
          <Logo />
        </div>

        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white text-center">
          Confirm your account
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-center mt-2 text-sm">
          To activate your account, click the button below.
        </p>

        <form onSubmit={handleSubmit} className="mt-8">
          <Button
            disabled={isPending}
            type="submit"
            className="w-full h-11 text-base font-semibold rounded-xl bg-gradient-to-r from-[#635bff] to-[#00b4ff] text-white hover:opacity-90 transition"
          >
            {isPending && <Loader className="animate-spin mr-2 h-4 w-4" />}
            Confirm account
          </Button>
        </form>

        <p className="mt-6 text-sm text-gray-500 dark:text-gray-400 text-center">
          If you have any issues confirming your account, please contact{" "}
          <a
            className="text-[#635bff] hover:underline focus:outline-none focus:ring-2 focus:ring-[#635bff] rounded-sm"
            href="mailto:support@kasb.com"
          >
            support@kasb.com
          </a>
          .
        </p>
      </div>
    </main>
  );
}
