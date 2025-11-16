import { Request, Response } from "express";
import { asyncHandler } from "../../middlewares/asyncHandler";
import { JobService } from "./job.service";
import { BadRequestException } from "../../common/utils/catch-errors";
import { HTTPSTATUS } from "../../config/http.config";

export class JobsController {
    private jobService: JobService;

    constructor(jobService: JobService) {
        this.jobService = jobService;
    }

    // GET /jobs
    public getAllJobs = asyncHandler(async (req: Request, res: Response): Promise<any> => {
        const recruiterId = (req as any).user?.id || (req as any).user?._id;
        if (!recruiterId) throw new BadRequestException("User ID missing");

        const jobs = await this.jobService.getAllJobs(recruiterId);
        return res.status(HTTPSTATUS.OK).json({ jobs });
    });

    // GET /jobs/:id
    public getJobById = asyncHandler(async (req: Request, res: Response): Promise<any> => {
        const recruiterId = (req as any).user?.id || (req as any).user?._id;
        const jobId = req.params.id;
         if (!jobId) {
        throw new BadRequestException("Job ID is missing");
    }
        const job = await this.jobService.getJobById(jobId, recruiterId);
        return res.status(HTTPSTATUS.OK).json({ job });
    });

    // POST /jobs
    public createJob = asyncHandler(async (req: Request, res: Response): Promise<any> => {
        const recruiterId = (req as any).user?.id || (req as any).user?._id;
        const companyId = req.body.companyId;
        if (!companyId) throw new BadRequestException("Company ID is required");

        const job = await this.jobService.createJob(req.body, recruiterId, companyId);
        return res.status(HTTPSTATUS.CREATED).json({ job });
    });

    // PUT /jobs/:id
    public updateJob = asyncHandler(async (req: Request, res: Response): Promise<any> => {
        const recruiterId = (req as any).user?.id || (req as any).user?._id;
        const jobId = req.params.id;

         if (!jobId) {
        throw new BadRequestException("Job ID is missing");
    }
        const job = await this.jobService.updateJob(jobId, req.body, recruiterId);
        return res.status(HTTPSTATUS.OK).json({ job });
    });

    // DELETE /jobs/:id
    public deleteJobPost = asyncHandler(async (req: Request, res: Response): Promise<any> => {
        const recruiterId = (req as any).user?.id || (req as any).user?._id;
        const jobId = req.params.id;

         if (!jobId) {
        throw new BadRequestException("Job ID is missing");
    }
        const result = await this.jobService.deleteJob(jobId, recruiterId);
        return res.status(HTTPSTATUS.OK).json(result);
    });
}
