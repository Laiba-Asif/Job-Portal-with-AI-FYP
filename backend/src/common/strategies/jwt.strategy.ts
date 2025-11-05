
import { ExtractJwt, StrategyOptionsWithRequest, Strategy as JwtStrategy } from "passport-jwt";
import { UnauthorizedException } from "../utils/catch-errors";
import { ErrorCode } from "../enums/error-code.enums";
import { config } from "../../config/app.config";
import passport, { PassportStatic } from "passport";
import { userService } from "../../modules/user/user.module";
import { Request, Response, NextFunction } from "express";

interface JwtPayload {
  userId: string;
  sessionId: string;
  role: "jobseeker" | "recruiter" | "admin"|"pending";
}

const options: StrategyOptionsWithRequest = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    (req) => {
      const accessToken = req.cookies.accessToken;
      if (!accessToken) {
        throw new UnauthorizedException(
          "Unauthorized access token",
          ErrorCode.AUTH_TOKEN_NOT_FOUND
        );
      }
      return accessToken;
    },
  ]),
  secretOrKey: config.JWT.SECRET,
  audience: ["jobseeker", "admin", "recruiter","pending"],
  algorithms: ["HS256"],
  passReqToCallback: true,
};

export const setupJwtStrategy = (passport: PassportStatic) => {
  passport.use(
     "jwt",  
    new JwtStrategy(options, async (req, payload: JwtPayload, done) => {
      try {
        const user = await userService.findUserById(payload.userId);
        if (!user) {
          return done(null, false);
        }
        req.sessionId = payload.sessionId;
        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    })
  );
};

export const authenticateJWT = passport.authenticate("jwt", { session: false });

// Role-based authorization middleware
export const authorizeRoles = (...allowedRoles: JwtPayload["role"][]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) {
      return res.status(403).json({ message: "Forbidden: Unauthorized" });
    }

    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({ message: "Forbidden: Role not allowed" });
    }

    next();
  };
};


// import { ExtractJwt, StrategyOptionsWithRequest,Strategy as JwtStrategy } from "passport-jwt";
// import { UnauthorizedException } from "../utils/catch-errors";
// import { ErrorCode } from "../enums/error-code.enums";
// import { config } from "../../config/app.config";
// import  passport,{ PassportStatic } from "passport";
// import { userService } from "../../modules/user/user.module";
// import { NextFunction } from "express";

// interface JwtPayload{
//     userId:string;
//     sessionId:string;
//     role: "jobseeker" | "recruiter" | "admin";
// }




// const options : StrategyOptionsWithRequest ={
//     jwtFromRequest:ExtractJwt.fromExtractors([
//         (req)=>{
//             const accessToken = req.cookies.accessToken;
//             if(!accessToken){
//                 throw new UnauthorizedException("Unauthorized Access Token",
//                     ErrorCode.AUTH_TOKEN_NOT_FOUND
//                 )
//             }
//             return accessToken
//         }
//     ]),

//     secretOrKey:config.JWT.SECRET,
//     audience:['jobseeker','recruiter','admin'],
//     algorithms:['HS256'],
//     passReqToCallback:true
// }


// export const setupJwtStrategy = (passport: PassportStatic) => {
//   passport.use(
//     new JwtStrategy(options, async (req, payload: JwtPayload, done) => {
//       try {
//         const user = await userService.findUserById(payload.userId);
//         if (!user) {
//           return done(null, false);
//         }
//         req.sessionId = payload.sessionId;
//         return done(null, user);
//       } catch (error) {
//         return done(error, false);
//       }
//     })
//   );

// };




// export const authenticateJWT = passport.authenticate("jwt", { session: false });

