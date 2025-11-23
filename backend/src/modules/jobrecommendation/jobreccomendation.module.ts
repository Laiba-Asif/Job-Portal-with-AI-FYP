import { JobReccomendationController } from "./jobreccomendation.controller";
import { JobReccomendationService } from "./jobreccomendation.service";


const jobreccomendationService = new JobReccomendationService();
const jobreccomendationController = new JobReccomendationController(jobreccomendationService);

export {jobreccomendationController,jobreccomendationService}