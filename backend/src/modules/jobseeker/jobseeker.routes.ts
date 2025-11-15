

import { Router } from "express";
import { jobseekerController } from "./jobseeker.module";
import { upload } from "../../middlewares/upload.middleware";

const jobRoutes = Router()

jobRoutes.get("/get-profile", jobseekerController.getProfileData);
jobRoutes.post('/upload-resume',upload.single("resume"), jobseekerController.uploadResume)


export default jobRoutes