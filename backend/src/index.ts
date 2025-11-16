import 'dotenv/config'
import express from "express";
import type { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser"
import cors from 'cors'
import { config } from './config/app.config'
import connectDb from './database/database';
import { errorHandler } from './middlewares/errorHandler';
import { HTTPSTATUS } from './config/http.config';
import { asyncHandler } from './middlewares/asyncHandler';
import authRoutes from './modules/auth/auth.routes';
import passport from './middlewares/passport';
import sessionRoutes from './modules/session/session.routes';
import { authenticateJWT } from './common/strategies/jwt.strategy';
import mfaRoutes from './modules/mfa/mfa.routes';
import jobRoutes from './modules/jobseeker/jobseeker.routes';
import userRoutes from './modules/user/user.route';
import RecruiterRoutes from './modules/recruiter/recruiter.route';
import JobRoutes from './modules/jobs/jobs.routes';


const app = express()
const BASE_PATH = config.BASE_PATH
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: config.FRONTEND_URL,
    credentials: true
}))

app.use(cookieParser())
app.use(passport.initialize())


// routes
app.get(
  "/",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.status(HTTPSTATUS.OK).json({ message: "API is running" });
  })
);

app.use(`${BASE_PATH}/auth`, authRoutes)
app.use(`${BASE_PATH}/user`,authenticateJWT, userRoutes)
app.use(`${BASE_PATH}/mfa`, mfaRoutes)

app.use(`${BASE_PATH}/session`,authenticateJWT, sessionRoutes)
app.use(`${BASE_PATH}/jobseeker`,authenticateJWT, jobRoutes)
app.use(`${BASE_PATH}/recruiter`,authenticateJWT, RecruiterRoutes)
app.use(`${BASE_PATH}/jobs`,authenticateJWT, JobRoutes)

// error handler
app.use(errorHandler)

app.listen(config.PORT, async() => {
    console.log(`Server is running on port ${config.PORT} in ${config.NODE_ENV} mode`)
    await connectDb();
})
