import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

// Map roles to allowed base routes
const roleRoutes: Record<string, string[]> = {
  recruiter: ["/recruiter"],
  admin: ["/admin"],
  jobseeker: ["/jobseeker"],
};

const publicRoutes = [
  "/",
  "/auth/signup",
  "/auth/confirm-account",
  "/auth/forgot-password",
  "/auth/verify-mfa",
];

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  const token = req.cookies.get("accessToken")?.value;


  if (!token) {
    console.log("🔹 No token found");
    return NextResponse.redirect(new URL("/", req.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);

    

    const role = payload.role as string;
  

    if (req.nextUrl.pathname.startsWith("/admin") && role !== "admin") {
      return NextResponse.redirect(new URL("/error/403", req.url));
    }

    if (req.nextUrl.pathname.startsWith("/recruiter") && role !== "recruiter") {
      return NextResponse.redirect(new URL("/error/403", req.url));
    }
    if (req.nextUrl.pathname.startsWith("/jobseeker") && role !== "jobseeker") {
      return NextResponse.redirect(new URL("/error/403", req.url));
    }

   


    return NextResponse.next();
  } catch (err) {
    console.error("JWT verification failed:", err);
    return NextResponse.redirect(new URL("/error/403", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/recruiter/:path*", "/jobseeker/:path*"],
};