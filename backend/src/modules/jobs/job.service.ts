import { BadRequestException, NotFoundException } from "../../common/utils/catch-errors";
import JobModel from "../../database/models/JobPost.model";

export class JobService {

    // List all jobs for a recruiter
    public async getAllJobs(recruiterId: string) {
        if (!recruiterId) throw new BadRequestException("Recruiter ID missing");

        const jobs = await JobModel.find({ recruiterId }).sort({ createdAt: -1 });
        return jobs;
    }

    // Get single job by ID
    public async getJobById(jobId: string, recruiterId: string) {
        if (!jobId) throw new BadRequestException("Job ID missing");

        const job = await JobModel.findOne({ _id: jobId, recruiterId });
        if (!job) throw new NotFoundException("Job not found");

        return job;
    }

    // Create a new job
    public async createJob(data: any, recruiterId: string, companyId: string) {
        if (!recruiterId || !companyId) throw new BadRequestException("Recruiter or Company ID missing");

        const job = new JobModel({ ...data, recruiterId, companyId });
        return await job.save();
    }

    // Update an existing job
    public async updateJob(jobId: string, data: any, recruiterId: string) {
        if (!jobId) throw new BadRequestException("Job ID missing");

        const job = await JobModel.findOneAndUpdate(
            { _id: jobId, recruiterId },
            data,
            { new: true }
        );

        if (!job) throw new NotFoundException("Job not found");

        return job;
    }

    // Delete a job
    public async deleteJob(jobId: string, recruiterId: string) {
        if (!jobId) throw new BadRequestException("Job ID missing");

        const job = await JobModel.findOneAndDelete({ _id: jobId, recruiterId });
        if (!job) throw new NotFoundException("Job not found");

        return { message: "Job deleted successfully" };
    }
}
