import { JobseekerController } from "./jobseeker.controller";
import { JobseekerService } from "./jobseeker.service";


const jobseekerService = new JobseekerService()
const jobseekerController = new JobseekerController(jobseekerService)

export {jobseekerService,jobseekerController}