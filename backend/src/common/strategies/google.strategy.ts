import { PassportStatic } from "passport";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import { config } from "../../config/app.config";

export const setupGoogleStrategy = (passport: PassportStatic) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: config.GOOGLE_CLIENT_ID!,
        clientSecret: config.GOOGLE_CLIENT_SECRET!,
        callbackURL: `${config.BASE_URL}${config.BASE_PATH || "/api/v1"}/auth/google/callback`,
      },
      (accessToken, refreshToken, profile: Profile, done) => {
        done(null, {
          provider: "google",
          providerId: profile.id, // <-- required
          profile,
          accessToken,
          refreshToken,
        } as any);
      }
    )
  );
};
