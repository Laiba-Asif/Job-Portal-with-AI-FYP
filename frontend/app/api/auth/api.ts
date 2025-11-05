import API from "@/lib/axios-client"

type LoginType = {
    email:string;
    password:string;
}
type RegisterType = {
    name:string;
    email:string;
    password:string;
    confirmPassword:string;
    role: 'admin' | 'recruiter' | 'jobseeker';
}
type ResetType ={
    password:string,
     verificationCode:string
}

type verifyEmailType = { code: string };
type verifyMFAType = { code: string; secretKey: string };
type mfaLoginType = { code: string; email: string };

type SessionType = {
  _id: string;
  userId: string;
  userAgent: string;
  createdAt: string;
  expiresAt: string;
  isCurrent: boolean;
};

type SessionResponseType = {
  message: string;
  sessions: SessionType[];
};

export type mfaType = {
  message: string;
  secret: string;
  qrImageUrl: string;
};


export const registerMutationFn = async(data:RegisterType) =>{
    return await API.post("/auth/register",data)
}
export const loginMutationFn = async(data:LoginType) =>{
    return await API.post("/auth/login",data)
}
export const forgotPasswordMutationFn = async(email:string) =>{
    return await API.post("/auth/password/forgot",email)
}
export const resetPasswordMutationFn = async(data:ResetType) =>{
    return await API.post("/auth/password/reset",data)
}
export const verifyEmailMutationFn = async(code:string) =>{
    return await API.post("/auth/verify/email",code)
}

export const verifyMFALoginMutationFn = async (data: mfaLoginType) =>
  await API.post(`/mfa/verify-login`, data);

export const logoutMutationFn = async () => await API.post(`/auth/logout`);

export const mfaSetupQueryFn = async () => {
  const response = await API.get<mfaType>(`/mfa/setup`);
  return response.data;
};

export const verifyMFAMutationFn = async (data: verifyMFAType) =>
  await API.post(`/mfa/verify`, data);

export const revokeMFAMutationFn = async () => await API.put(`/mfa/revoke`, {});

export const getUserSessionQueryFn = async () => await API.get(`/session/`);

export const sessionsQueryFn = async () => {
  const response = await API.get<SessionResponseType>(`/session/all`);
  return response.data;
};

export const sessionDelMutationFn = async (id: string) =>
  await API.delete(`/session/${id}`);