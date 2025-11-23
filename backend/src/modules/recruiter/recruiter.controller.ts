import { Request, Response } from "express";
import { BadRequestException } from "../../common/utils/catch-errors";
import { HTTPSTATUS } from "../../config/http.config";
import { asyncHandler } from "../../middlewares/asyncHandler";
import { RecruiterService } from "./recruiter.service";

export class RecruiterController {
  private recruiterService: RecruiterService;

  constructor(recruiterService: RecruiterService) {
    this.recruiterService = recruiterService;
  }

  // -------------------- GET PROFILE --------------------
  public getProfileData = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const userId = (req as any).user?.id || (req as any).user?._id;
      if (!userId) throw new BadRequestException("User ID missing");

      const profile = await this.recruiterService.getProfileData(userId);

      return res.status(HTTPSTATUS.OK).json({ profile });
    }
  );

  // -------------------- POST CREATE/UPDATE PROFILE --------------------
  public postProfileData = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const userId = (req as any).user?.id || (req as any).user?._id;
      if (!userId) throw new BadRequestException("User ID missing");

      const profile = await this.recruiterService.postProfileData(userId, req.body);

      return res.status(HTTPSTATUS.CREATED).json({
        message: "Recruiter profile saved successfully",
        profile,
      });
    }
  );

  public updateProfileData = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const userId = (req as any).user?.id || (req as any).user?._id;
    if (!userId) throw new BadRequestException("User ID missing");

    const profile = await this.recruiterService.updateProfileData(userId, req.body);

    return res.status(HTTPSTATUS.OK).json({
      message: "Recruiter profile updated successfully",
      profile,
    });
  }
);
 public getCandidates = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const recruiterId = (req as any).user?.id || (req as any).user?._id;
    if (!recruiterId) throw new BadRequestException("User ID missing");

    const candidates = await this.recruiterService.getCandidates(recruiterId);

    return res.status(HTTPSTATUS.OK).json({
      message: "Candidates fetched successfully",
      candidates,
    });
  }
);

}

