import { HTTPSTATUS } from "../../config/http.config";
import { asyncHandler } from "../../middlewares/asyncHandler";
import { JobseekerService } from "./jobseeker.service";
import { Request,Response } from 'express';

export class JobseekerController {
  private jobseekerService: JobseekerService;

  constructor(jobseekerService: JobseekerService) {
    this.jobseekerService = jobseekerService;
  }

  public uploadResume = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      // multer places the file on req.file
      const file = req.file as Express.Multer.File | undefined;
       
      if (!file) {
        return res
          .status(HTTPSTATUS.BAD_REQUEST)
          .json({ message: "No resume file provided" });
      }
      

      // If your authenticateJWT adds user to req.user, extract user id:
      const userId =
        (req as any).user?.id || (req as any).user?._id || undefined;

      // const saved = await this.jobseekerService.uploadResume(file, userId);
       await this.jobseekerService.uploadResume(file, userId);
      return res
        .status(HTTPSTATUS.OK)
        .json({ message: "Resume uploaded successfully" });
    }
  );

 public getResumeData = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const userId = (req as any).user?.id || (req as any).user?._id;

    const { user, parsedResume } = await this.jobseekerService.getResumeData(userId);

    return res.status(HTTPSTATUS.OK).json({
      user,
      parsedResume,
    });
  }
);

}
