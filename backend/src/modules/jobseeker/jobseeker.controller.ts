import { BadRequestException } from "../../common/utils/catch-errors";
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
         if (!userId) throw new BadRequestException("User not authenticated");
     
       await this.jobseekerService.uploadResume(file, userId);
      return res
        .status(HTTPSTATUS.OK)
        .json({ message: "Resume uploaded successfully" });
    }
  );

 public getProfileData = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const userId = (req as any).user?.id || (req as any).user?._id;
 if (!userId) throw new BadRequestException("User ID missing");
    const profile = await this.jobseekerService.getProfileData(userId);

    return res.status(HTTPSTATUS.OK).json({
      profile,
    });
  }
);

}
