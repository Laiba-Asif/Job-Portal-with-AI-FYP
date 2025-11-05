import { CookieOptions, Response } from "express";
import { config } from "../../../config/app.config";
import { calculateExpirationDate } from "../../../common/utils/date-time";

type cookiePayloadType = {
  res: Response;
  accessToken: string;
  refreshToken: string;
};
export const REFRESH_PATH= `${config.BASE_PATH}/auth/refresh`

const defaults:CookieOptions = {
    httpOnly:true,
    secure:config.NODE_ENV==="production"?true:false,
    sameSite: config.NODE_ENV === "production" ?"strict":"lax"
}

export const getRefreshTokenCookiesOptions = ():CookieOptions =>{
    const expiresIn = config.JWT.REFRESH_EXPIRES_IN;
    const expires = calculateExpirationDate(expiresIn)

    return {
        ...defaults,
        expires,
        path:REFRESH_PATH
    }
}
export const getAccessTokenCookiesOptions = ():CookieOptions =>{
    const expiresIn = config.JWT.EXPIRES_IN;
    const expires = calculateExpirationDate(expiresIn)

    return {
        ...defaults,
        expires,
        path:'/'
    }
}

export const setAuthenticationCookies = ({
  res,
  accessToken,
  refreshToken,
}: cookiePayloadType): Response =>
  res
    .cookie("accessToken", accessToken, getAccessTokenCookiesOptions())
    .cookie("refreshToken", refreshToken, getRefreshTokenCookiesOptions());





    
export const clearAuthenticationCookies = (res:Response):Response =>{
    return res.clearCookie("accessToken").clearCookie("refreshToken",{
        path:REFRESH_PATH
    })
}