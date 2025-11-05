"use client";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader } from "lucide-react";
import Logo from "@/components/logo";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { verifyMFALoginMutationFn } from "@/app/api/auth/api";
import { toast } from "@/hooks/use-toast";

const VerifyMfa = () => {
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email");

  const { mutate, isPending } = useMutation({
    mutationFn: verifyMFALoginMutationFn,
  });

  const FormSchema = z.object({
    pin: z.string().min(6, {
      message: "Your one-time password must be 6 characters.",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    if (!email) {
      router.replace("/");
      return;
    }
    mutate(
      { code: values.pin, email },
      {
        onSuccess: (response) => {
          console.log(response);
          router.replace(`/${response.data.user.role}/dashboard`);
          toast({
            title: "Success",
            description: response?.data?.message,
          });
        },
        onError: (error) => {
          toast({
            title: "Error",
            description: error.message,
            variant: "destructive",
          });
        },
      }
    );
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-950 rounded-2xl shadow-xl p-8 space-y-6 border border-slate-200 dark:border-slate-800">
        {/* Logo */}
        <div className="flex justify-center">
          <Logo />
        </div>

        {/* Heading */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
            Multi-Factor Authentication
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Enter the 6-digit code from your authenticator app to continue.
          </p>
        </div>

        {/* OTP Form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">One-time code</FormLabel>
                  <FormControl>
                    <div className="flex justify-center">
                      <InputOTP
                        className="flex gap-3"
                        maxLength={6}
                        pattern={REGEXP_ONLY_DIGITS}
                        {...field}
                      >
                        {[0, 1, 2, 3, 4, 5].map((i) => (
                          <InputOTPSlot
                            key={i}
                            index={i}
                            className="!w-12 !h-14 text-lg rounded-lg border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500"
                          />
                        ))}
                      </InputOTP>
                    </div>
                  </FormControl>
                  <FormMessage className="text-center mt-2" />
                </FormItem>
              )}
            />

            {/* Continue Button */}
            <Button
              disabled={isPending}
              className="w-full h-11 text-white font-medium bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400"
            >
              {isPending && <Loader className="animate-spin mr-2 h-4 w-4" />}
              Continue <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </form>
        </Form>

        {/* Secondary Action */}
        <Button
          type="button"
          variant="ghost"
          className="w-full text-sm text-slate-600 dark:text-slate-300 hover:underline"
          onClick={() => router.replace("/auth/login")}
        >
          Return to sign in
        </Button>
      </div>
    </main>
  );
};

export default VerifyMfa;
