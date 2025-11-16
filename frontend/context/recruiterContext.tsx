

"use client";

import { createContext, useContext, ReactNode, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { getRecruiterProfile } from "@/app/api/recruiter/api";
import { useAuthContext } from "@/context/auth-provider";

export interface RecruiterProfileType {
  _id?: string;
  userId?: string;

  companyName: string;
  industry?: string;
  companySize?: string;
  foundedYear?: number;
  headquarters?: string;

  aboutCompany?: string;
  mission?: string;
  vision?: string;
  values?: string[];
  logoUrl?: string;
  bannerUrl?: string;

  country?: string;
  city?: string;
  address?: string;
  phone?: string;

  website?: string;
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;

  hiringEmail?: string;
  hiringManager?: string;
  departments?: string[];

  profileCompletion: number;

  createdAt?: string;
  updatedAt?: string;
}

interface RecruiterContextType {
  profile: RecruiterProfileType | null;
  isLoading: boolean;
  refetchProfile: () => void;
}

const RecruiterContext = createContext<RecruiterContextType | undefined>(
  undefined
);

export const RecruiterProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuthContext();

  const {
    data,
    isLoading,
    refetch,
    isFetching,
  } = useQuery<AxiosResponse<{ profile: RecruiterProfileType }>>({
    queryKey: ["recruiter-profile"],
    queryFn: getRecruiterProfile,
    enabled: !!user, // Run query only when user is logged in
  });

  return (
    <RecruiterContext.Provider
      value={{
        profile: data?.data?.profile ?? null,
        isLoading: isLoading || isFetching,
        refetchProfile: refetch,
      }}
    >
      {children}
    </RecruiterContext.Provider>
  );
};

export const useRecruiter = () => {
  const context = useContext(RecruiterContext);
  if (!context)
    throw new Error("useRecruiter must be used inside RecruiterProvider");
  return context;
};


// "use client";

// import { createContext, useContext, ReactNode } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { AxiosResponse } from "axios";
// import { getRecruiterProfile } from "@/app/api/recruiter/api";

// // -----------------------------
// // Profile Type (matches backend)
// // -----------------------------
// export interface RecruiterProfileType {
//   _id?: string;
//   userId?: string;

//   companyName: string;
//   industry?: string;
//   companySize?: string;
//   foundedYear?: number;
//   headquarters?: string;

//   aboutCompany?: string;
//   mission?: string;
//   vision?: string;
//   values?: string[];
//   logoUrl?: string;
//   bannerUrl?: string;

//   country?: string;
//   city?: string;
//   address?: string;
//   phone?: string;

//   website?: string;
//   linkedin?: string;
//   twitter?: string;
//   facebook?: string;
//   instagram?: string;

//   hiringEmail?: string;
//   hiringManager?: string;
//   departments?: string[];

//   profileCompletion: number;

//   createdAt?: string;
//   updatedAt?: string;
// }

// // -----------------------------
// interface RecruiterContextType {
//   profile: RecruiterProfileType | null;
//   isLoading: boolean;
//   refetchProfile: () => void;
// }

// const RecruiterContext = createContext<RecruiterContextType | undefined>(
//   undefined
// );

// // -----------------------------
// // Provider
// // -----------------------------
// export const RecruiterProvider = ({ children }: { children: ReactNode }) => {
//   const { data, isLoading, refetch } = useQuery<
//     AxiosResponse<{ profile: RecruiterProfileType }>
//   >({
//     queryKey: ["recruiter-profile"],
//     queryFn: getRecruiterProfile,
//     enabled: false, // Manual load after login
//   });

//   return (
//     <RecruiterContext.Provider
//       value={{
//         profile: data?.data?.profile ?? null,
//         isLoading,
//         refetchProfile: refetch,
//       }}
//     >
//       {children}
//     </RecruiterContext.Provider>
//   );
// };

// // -----------------------------
// // Hook
// // -----------------------------
// export const useRecruiter = () => {
//   const context = useContext(RecruiterContext);
//   if (!context)
//     throw new Error("useRecruiter must be used inside RecruiterProvider");
//   return context;
// };
