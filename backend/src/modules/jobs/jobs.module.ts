import { JobService } from "./job.service"
import { JobsController } from "./jobs.controller"


const jobService = new JobService()
const jobController = new JobsController(jobService)

export { jobController,jobService }

