import { Router } from "express";
import { recruiterController } from "./recruiter.module";

const RecruiterRoutes = Router();

RecruiterRoutes.get("/profile", recruiterController.getProfileData);
RecruiterRoutes.post("/profile", recruiterController.postProfileData);
RecruiterRoutes.put("/profile", recruiterController.updateProfileData);


export default RecruiterRoutes;
