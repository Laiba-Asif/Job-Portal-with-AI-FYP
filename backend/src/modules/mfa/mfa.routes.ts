import { Router } from "express";
import { authenticateJWT } from "../../common/strategies/jwt.strategy";
import { mfaController } from "./mfa.modules";

const mfaRoutes = Router()

mfaRoutes.get('/setup', authenticateJWT,mfaController.generateMFASetup)
mfaRoutes.post('/verify', authenticateJWT,mfaController.verifyMFASetup)
mfaRoutes.put('/revoke', authenticateJWT,mfaController.revokeMFA)
mfaRoutes.post('/verify-login', authenticateJWT,mfaController.verifyMFAForLogin)


export default mfaRoutes