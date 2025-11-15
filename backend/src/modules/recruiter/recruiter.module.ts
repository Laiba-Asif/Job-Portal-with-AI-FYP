import { RecruiterController } from "./recruiter.controller";
import { RecruiterService } from "./recruiter.service";


const recruiterService = new RecruiterService()
const recruiterController = new RecruiterController(recruiterService)

export {recruiterController , recruiterService}