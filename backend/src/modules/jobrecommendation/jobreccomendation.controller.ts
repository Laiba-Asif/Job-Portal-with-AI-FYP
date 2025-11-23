import { Request, Response } from "express";
import { asyncHandler } from "../../middlewares/asyncHandler";
import { JobReccomendationService } from "./jobreccomendation.service"
import { BadRequestException } from "../../common/utils/catch-errors";
import { HTTPSTATUS } from "../../config/http.config";

export class JobReccomendationController{
    private jobReccomendationService: JobReccomendationService
    constructor(jobReccomendationService: JobReccomendationService){
        this.jobReccomendationService = jobReccomendationService
    }


    public getAllJobreccomendation = asyncHandler(async (req: Request, res: Response): Promise<any> => {
            const userId = (req as any).user?.id || (req as any).user?._id;
            if (!userId) throw new BadRequestException("User ID missing");

            const jobs = await this.jobReccomendationService.getAllJobreccomendation(userId);
            return res.status(HTTPSTATUS.OK).json({ jobs });
        });
}