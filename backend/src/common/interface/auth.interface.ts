export type UserRole =  "recruiter" | "jobseeker";

export interface RegisterDto {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role?: UserRole;   
}

export interface LoginDto {
  email: string;
  password: string;
  userAgent?: string | undefined;
  role?: UserRole | undefined;   
}
export interface resetPasswordDto {
  password: string;
  verificationCode: string;
}