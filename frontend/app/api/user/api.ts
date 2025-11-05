import API from "@/lib/axios-client"


export const roleMutationFn = async(role: "recruiter" | "jobseeker") =>{
    return await API.put("/user/update-role",{role})
}