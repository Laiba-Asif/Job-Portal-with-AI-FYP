import { Request, Response } from "express";
import { asyncHandler } from "../../middlewares/asyncHandler";
import { UserService } from "./user.service";
import { HTTPSTATUS } from "../../config/http.config";
import { setAuthenticationCookies } from "../auth/utils/cookies";
import { refreshTokenSignOptions, signJwtToken } from "../auth/utils/jwt";
import SessionModel from "../../database/models/session.model";

export class UserController {
  private userService: UserService;

  constructor(authService: UserService) {
    this.userService = authService;
  }

  public updateRole = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const userId = req.user?.id || req.user?._id;
      const { role } = req.body;

      const userAgent = req.headers["user-agent"];

      const user = await this.userService.updateRole(userId, role);
      if (!user) {
        return res
          .status(HTTPSTATUS.NOT_FOUND)
          .json({ message: "User not found" });
      }
      // 🔑 Invalidate old sessions
      await SessionModel.deleteMany({ userId: user._id });

      // create a new session
      const session = await SessionModel.create({
        userId: user._id,
        userAgent,
      });

      // access token contains user role
      const accessToken = signJwtToken({
        userId: user._id,
        sessionId: session._id,
        role: user.role,
      });

      // refresh token contains only session
      const refreshToken = signJwtToken(
        { sessionId: session._id },
        refreshTokenSignOptions
      );

      // set cookies + return updated user + tokens
      return setAuthenticationCookies({ res, accessToken, refreshToken })
        .status(HTTPSTATUS.OK)
        .json({
          message: "User role updated successfully",
          data: user,
        });
    }
  );
}
