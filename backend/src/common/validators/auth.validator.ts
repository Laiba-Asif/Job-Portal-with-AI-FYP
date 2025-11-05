import {z} from "zod"

export const emailSchema = z.string().trim().email().min(1).max(255)
const passwordSchema = z.string().trim().min(6).max(255)
export const verificationCodeSchema = z.string().trim().min(1).max(25)


const registerSchema = z.object({
    name:z.string().trim().min(1).max(255),
    email:emailSchema,
    password:passwordSchema,
    confirmPassword:passwordSchema,
    role: z.enum(["recruiter", "jobseeker"]),
 
}).refine((val)=>val.password === val.confirmPassword,{
    message:"Password do not match",
    path:["confirmPassword"]
})



const loginSchema = z.object({
    email:emailSchema,
    password:passwordSchema,
   userAgent: z.string().optional(),
})

export const verificationEmailSchema = z.object({
  code: verificationCodeSchema,
});

export const resetPasswordSchema = z.object({
  password: passwordSchema,
  verificationCode: verificationCodeSchema,
});
export {registerSchema , loginSchema}