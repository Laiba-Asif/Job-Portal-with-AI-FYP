import jwt, { SignOptions } from "jsonwebtoken";
import { ErrorCode } from "../../common/enums/error-code.enums";
import { VerificationEnum } from "../../common/enums/verification-code.enum";
import { LoginDto, RegisterDto, resetPasswordDto } from "../../common/interface/auth.interface";
import crypto from "crypto";
import {
  BadRequestException,
  HttpException,
  InternalServerException,
  NotFoundException,
  UnauthorizedException,
} from "../../common/utils/catch-errors";
import {
    anHourFromNow,
  calculateExpirationDate,
  fortyFiveMinutesFromNow,
  ONE_DAY_IN_MS,
  threeMinutesAgo,
} from "../../common/utils/date-time";
import SessionModel from "../../database/models/session.model";
import UserModel from "../../database/models/user.model";
import VerificationCodeModel from "../../database/models/verification.model";
import { config } from "../../config/app.config";
import {
  refreshTokenSignOptions,
  RefreshTPayload,
  signJwtToken,
  verifyJwtToken,
} from "./utils/jwt";
import { sendEmail } from "../../mailers/mailer";
import { passwordResetTemplate, verifyEmailTemplate } from "../../mailers/templates/template";
import { HTTPSTATUS } from "../../config/http.config";
import { hashValue } from "../../common/utils/bcrypt";
import { logger } from "../../common/utils/logger";

export class AuthService {
  public async register(registerData: RegisterDto) {
    const { name, email, password, role } = registerData;

    const existingUser = await UserModel.exists({ email });

    if (existingUser) {
      throw new BadRequestException(
        "User already exists with this email",
        ErrorCode.AUTH_EMAIL_ALREADY_EXISTS
      );
    }

    const newUser = await UserModel.create({
      name,
      email,
      password,
      role,
    });

    const userId = newUser._id;

    const verification = await VerificationCodeModel.create({
      userId,
      type: VerificationEnum.EMAIL_VERIFICATION,
      expiresAt: fortyFiveMinutesFromNow(),
    });

    // Sending verification email link
    const verificationUrl = `${config.FRONTEND_URL}/auth/confirm-account?code=${verification.code}`;
    await sendEmail({
      to: newUser.email,
      ...verifyEmailTemplate(verificationUrl),
    });

    return {
      user: newUser,
    };
  }

  // login

  public async login(loginData: LoginDto) {
    const { email, password, userAgent } = loginData;
    logger.info(`Login attempt for email: ${email}`);

    const user = await UserModel.findOne({
      email: email,
    });
    if (!user) {
      logger.warn(`Login failed: User with email ${email} not found`);
      throw new BadRequestException(
        "Invalid Password or Email Provided",
        ErrorCode.AUTH_USER_NOT_FOUND
      );
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
       logger.warn(`Login failed: Invalid password for email: ${email}`);
      throw new BadRequestException(
        "Invalid Password or Email Provided",
        ErrorCode.AUTH_USER_NOT_FOUND
      );
    }

    // check if the user enabled 2fa return user = null
    if(user.userPreference.enable2FA){
       logger.info(`2FA required for user ID: ${user._id}`);
      return {
        user:null,
      role: user.role,
      accessToken:"",
      refreshToken:"",
      mfaRequired: true,
      }
    }
logger.info(`Creating session for user ID: ${user._id}`);
    const session = await SessionModel.create({
      userId: user._id,
      userAgent,
    });

    const accessToken = signJwtToken({
      userId: user._id,
      sessionId: session._id,
      role: user.role,
    });

    const refreshToken = signJwtToken(
      {
        sessionId: session._id,
      },
      refreshTokenSignOptions
    );

    logger.info(`Login successful for user ID: ${user._id}`);
    return {
      user,
      role: user.role,
      accessToken,
      refreshToken,
      mfaRequired: false,
    };
  }

  // refresh token

  public refreshToken = async (refreshToken: string) => {
    const { payload } = verifyJwtToken<RefreshTPayload>(refreshToken, {
      secret: refreshTokenSignOptions.secret,
    });

    if (!payload) {
      throw new UnauthorizedException("Invalid refresh token");
    }

    const session = await SessionModel.findById(payload.sessionId);
    const now = Date.now();

    if (!session) {
      throw new UnauthorizedException("session doesn't exist");
    }

    if (!session.expiredAt || session.expiredAt.getTime() <= now) {
      throw new UnauthorizedException("session expired");
    }

    const sessionRequireRefresh =
      session.expiredAt?.getTime() - now <= ONE_DAY_IN_MS;
    if (sessionRequireRefresh) {
      session.expiredAt = calculateExpirationDate(
        config.JWT.REFRESH_EXPIRES_IN
      );
      await session.save();
    }

    const newRefreshToken = sessionRequireRefresh
      ? signJwtToken(
          {
            sessionId: session._id,
          },
          refreshTokenSignOptions
        )
      : undefined;

    const accessToken = signJwtToken({
  userId: session.userId,
  sessionId: session._id,
  role: (await UserModel.findById(session.userId))?.role,
});

    return {
      newRefreshToken,
      accessToken,
    };
  };

  public async verifyEmail(code: string) {
    const validCode = await VerificationCodeModel.findOne({
      code: code,
      type: VerificationEnum.EMAIL_VERIFICATION,
      expiresAt: { $gt: new Date() },
    });

    if (!validCode) {
      throw new BadRequestException("Invalid or expired verification code");
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      validCode.userId,
      {
        isEmailVerified: true,
      },
      { new: true }
    );

    if (!updatedUser) {
      throw new BadRequestException(
        "Unable to verify email address",
        ErrorCode.VALIDATION_ERROR
      );
    }

    await validCode.deleteOne();
    return {
      user: updatedUser,
    };
  }

   public async forgotPassword(email: string) {
    const user = await UserModel.findOne({
      email: email,
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    //check mail rate limit is 2 emails per 3 or 10 min
    const timeAgo = threeMinutesAgo();
    const maxAttempts = 2;

    const count = await VerificationCodeModel.countDocuments({
      userId: user._id,
      type: VerificationEnum.PASSWORD_RESET,
      createdAt: { $gt: timeAgo },
    });

    if (count >= maxAttempts) {
      throw new HttpException(
        "Too many request, try again later",
        HTTPSTATUS.TOO_MANY_REQUESTS,
        ErrorCode.AUTH_TOO_MANY_ATTEMPTS
      );
    }

    const expiresAt = anHourFromNow();
    const validCode = await VerificationCodeModel.create({
      userId: user._id,
      type: VerificationEnum.PASSWORD_RESET,
      expiresAt,
    });

    const resetLink = `${config.FRONTEND_URL}/auth/reset-password?code=${
      validCode.code
    }&exp=${expiresAt.getTime()}`;

    const { data, error } = await sendEmail({
      to: user.email,
      ...passwordResetTemplate(resetLink),
    });

    if (!data?.id) {
      throw new InternalServerException(`${error?.name} ${error?.message}`);
    }

    return {
      url: resetLink,
      emailId: data.id,
    };
  }

  public async resetPassword({ password, verificationCode }: resetPasswordDto) {
    const validCode = await VerificationCodeModel.findOne({
      code: verificationCode,
      type: VerificationEnum.PASSWORD_RESET,
      expiresAt: { $gt: new Date() },
    });

    if (!validCode) {
      throw new NotFoundException("Invalid or expired verification code");
    }

    const hashedPassword = await hashValue(password);

    const updatedUser = await UserModel.findByIdAndUpdate(validCode.userId, {
      password: hashedPassword,
    });

    if (!updatedUser) {
      throw new BadRequestException("Failed to reset password!");
    }

    await validCode.deleteOne();

    await SessionModel.deleteMany({
      userId: updatedUser._id,
    });

    return {
      user: updatedUser,
    };
  }

   public async logout(sessionId: string) {
    return await SessionModel.findByIdAndDelete(sessionId);
  }

  // inside AuthService class
public async oauthLoginOrRegister(
  provider: string,
  oauthData: { providerId: string; email: string; name?: string; rawProfile?: any },
  userAgent?: string
) {
  const { providerId, email, name } = oauthData;

  // 1) Try to find user by provider
  let user = await UserModel.findOne({
    "providers.provider": provider,
    "providers.providerId": providerId,
  });

  // 2) If not found, try by email and link provider
  if (!user) {
    user = await UserModel.findOne({ email });
    if (user) {
      const alreadyLinked = (user.providers || []).some(
        (p) => p.provider === provider && p.providerId === providerId
      );
      if (!alreadyLinked) {
        user.providers = user.providers || [];
        user.providers.push({ provider, providerId });
        await user.save();
      }
    }
  }

  // 3) If still not found, create new user
  if (!user) {
    const randomPassword = crypto.randomBytes(32).toString("hex"); // auto hashed
    user = await UserModel.create({
      name: name || "Unnamed",
      email,
      password: randomPassword,
      role: "pending",       // user selects later
      isEmailVerified: true, // trusted provider email
      providers: [{ provider, providerId }],
    });
  }

  // 4) Create session (important!)
  const session = await SessionModel.create({
    userId: user._id,
    userAgent,
  });

  // 5) Generate tokens
  const accessToken = signJwtToken({
    userId: user._id,
    sessionId: session._id,
    role: user.role,
  });

  const refreshToken = signJwtToken(
    { sessionId: session._id },
    refreshTokenSignOptions
  );

  // 6) Return results
  return {
    user: user.toJSON(),
    accessToken,
    refreshToken,
    mfaRequired: !!user.userPreference?.enable2FA,
  };
}
}
