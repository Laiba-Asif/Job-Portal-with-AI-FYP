import API from "@/lib/axios-client";

export const getRecruiterProfile = async () => {
  return await API.get("/recruiter/profile");
};

export const postRecruiterProfile = async (payload: any) => {
  return await API.post("/recruiter/profile", payload);
};
export const updateRecruiterProfile = async (payload: any) => {
  return await API.put("/recruiter/profile", payload);
};