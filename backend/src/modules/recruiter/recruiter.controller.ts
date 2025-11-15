import { RecruiterService } from "./recruiter.service";

export class RecruiterController{
    private recruiterService : RecruiterService

    constructor(recruiterService: RecruiterService) {
        this.recruiterService = recruiterService;
      }
}