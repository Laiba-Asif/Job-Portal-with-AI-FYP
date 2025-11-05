"use client";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, MailCheckIcon, Loader } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";
import { toast } from "@/hooks/use-toast";
import { forgotPasswordMutationFn } from "@/app/api/auth/api";

export default function ForgotPassword() {
  const params = useSearchParams();
  const email = params.get("email");

  const [isSubmitted, setIsSubmitted] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: forgotPasswordMutationFn,
  });

  const formSchema = z.object({
    email: z.string().trim().email().min(1, {
      message: "Email is required",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: email || "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values , {
      onSuccess: () => {
        setIsSubmitted(true);
      },
      onError: (error) => {
        console.error(error);
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };

  return (
    <main className="w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-100 dark:from-[#0f1115] dark:to-[#14161a] px-4">
      {!isSubmitted ? (
        <div className="w-full max-w-md bg-white dark:bg-[#1c1e23] shadow-lg rounded-2xl p-8">
          <div className="flex justify-center mb-6">
            <Logo />
          </div>

          <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
            Reset your password
          </h1>
          <p className="mt-2 mb-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Enter the email address associated with your account and we’ll send
            you reset instructions.
          </p>

          <Form {...form}>
            <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-gray-700 dark:text-gray-300">
                      Email address
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="you@example.com"
                        autoComplete="off"
                        className="h-[44px] text-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                disabled={isPending}
                className="h-[44px] text-white font-medium rounded-lg bg-gradient-to-br from-indigo-600 via-purple-600 to-cyan-400  hover:bg-[#5145cd] transition-colors"
              >
                {isPending && <Loader className="animate-spin mr-2 h-4 w-4" />}
                Send reset instructions
              </Button>
            </form>
          </Form>
        </div>
      ) : (
        <div className="w-full max-w-md bg-white dark:bg-[#1c1e23] shadow-lg rounded-2xl p-8 flex flex-col items-center text-center">
          <MailCheckIcon size="48" className="text-[#635bff] mb-4 animate-bounce" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Check your email
          </h2>
          <p className="mt-2 mb-6 text-sm text-gray-600 dark:text-gray-400">
            We just sent a password reset link to{" "}
            <span className="font-medium text-gray-900 dark:text-gray-200">
              {form.getValues("email")}
            </span>
            .
          </p>
          <Link href="/">
            <Button className="h-[44px] bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400  text-white font-medium rounded-lg flex items-center gap-2">
              Go to login <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      )}
    </main>
  );
}
