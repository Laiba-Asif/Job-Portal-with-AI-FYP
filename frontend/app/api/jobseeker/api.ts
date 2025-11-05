import API from "@/lib/axios-client"


export const ParseResume = async (resume: File) => {
  const formData = new FormData();
  formData.append("resume", resume);
  return await API.post("/jobseeker/upload-resume", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};


export const getResume = async () => await API.get("/jobseeker/get-resume");