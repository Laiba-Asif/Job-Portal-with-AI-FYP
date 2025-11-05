"use client";

import React, { createContext, useContext, ReactNode } from "react";
import useAuth from "@/hooks/use-auth";
import Loading from "@/components/Loading";

type UserType = {
  name: string;
  email: string;
  role: "admin" | "recruiter" | "jobseeker";
  isEmailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  userPreference: {
    enable2FA: boolean;
  };
};

type AuthContextType = {
  user: UserType;
  error: any;
  isLoading: boolean;
  isFetching: boolean;
  refetch: () => void;
};

// ✅ Value, not a namespace
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data, error, isLoading, isFetching, refetch } = useAuth();
  const user = data?.data?.user;
    if (isLoading || isFetching) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider value={{ user, error, isLoading, isFetching, refetch }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
