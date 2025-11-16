import { Router } from "express";
import { jobController } from "./jobs.module";

const JobRoutes = Router();

// CRUD for Job Posts
JobRoutes.get("/", jobController.getAllJobs); 
JobRoutes.get("/:id", jobController.getJobById); 
JobRoutes.post("/", jobController.createJob); 
JobRoutes.put("/:id", jobController.updateJob); 
JobRoutes.delete("/:id", jobController.deleteJobPost); 

export default JobRoutes;
