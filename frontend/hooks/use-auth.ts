"use client";

import { getUserSessionQueryFn } from "@/app/api/auth/api";
import { useQuery } from "@tanstack/react-query";

const useAuth = () => {
  const query = useQuery({
    queryKey: ["authUser"],
    queryFn: getUserSessionQueryFn,
    staleTime: Infinity,
    initialData: () => {
      if (typeof window !== "undefined") {
        const cached = localStorage.getItem("authUser");
        return cached ? JSON.parse(cached) : undefined;
      }
      return undefined;
    },
    
  });
  return query;
};

export default useAuth;