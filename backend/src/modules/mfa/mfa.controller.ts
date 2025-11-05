import { Request, Response } from "express";
import { asyncHandler } from "../../middlewares/asyncHandler";
import { MFAService } from "./mfa.service";
import { HTTPSTATUS } from "../../config/http.config";
import {verifyMfaForLoginSchema, verifyMfaSchema} from '../../common/validators/mfa.validator'
import { setAuthenticationCookies } from "../auth/utils/cookies";

export class MFAController{
    private mfaService:MFAService;

    constructor(mfaService:MFAService){
        this.mfaService = mfaService
    }

    public generateMFASetup = asyncHandler(async(req:Request, res:Response):Promise<any>=>{
      const {message,
            secret,
            qrImageUrl} =  await this.mfaService.generateMFASetup(req)

        return res.status(HTTPSTATUS.OK).json({
            message,
            secret,
            qrImageUrl
        })
    })

    public verifyMFASetup = asyncHandler(async(req:Request, res:Response):Promise<any>=>{
        const {code , secretKey} = verifyMfaSchema.parse({
            ...req.body,
        })

        const {userPreference, message} = await this.mfaService.verifyMFASetup(req, code , secretKey)

        return res.status(HTTPSTATUS.OK).json({
            message:message,
            userPreference:userPreference
        })
    })
    public revokeMFA = asyncHandler(async(req:Request, res:Response):Promise<any>=>{
      const {message, userPreference} = await this.mfaService.revokeMFA(req)

      return res.status(HTTPSTATUS.OK).json({
        message,
        userPreference
      })
    })
    public verifyMFAForLogin = asyncHandler(async(req:Request, res:Response):Promise<any>=>{

      const {code , email , userAgent} = verifyMfaForLoginSchema.parse({
        ...req.body,
        userAgent: req.headers["user-agent"]    
      })

      const {accessToken , refreshToken , user} =  await this.mfaService.verifyMFAForLogin(code , email , userAgent)

      return setAuthenticationCookies({res ,accessToken , refreshToken }).status(HTTPSTATUS.OK).json({
        message:"",
        user
      })

    })
}