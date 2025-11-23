
import { Router } from "express";
import { jobreccomendationController } from "./jobreccomendation.module";

const jobreccomendationRoutes = Router()

jobreccomendationRoutes.get('/',jobreccomendationController.getAllJobreccomendation)

export default jobreccomendationRoutes