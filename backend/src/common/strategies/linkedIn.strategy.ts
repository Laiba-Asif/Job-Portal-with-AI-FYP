import { PassportStatic } from "passport";
import { Strategy as LinkedInStrategy, Profile } from "passport-linkedin-oauth2";
import { config } from "../../config/app.config";

export const setupLinkedInStrategy = (passport: PassportStatic) => {
  passport.use(
    new LinkedInStrategy(
      {
        clientID: config.LINKEDIN_CLIENT_ID!,
        clientSecret: config.LINKEDIN_CLIENT_SECRET!,
        callbackURL: `${config.BASE_URL}${config.BASE_PATH || "/api/v1"}/auth/linkedin/callback`,
        scope: ["r_emailaddress", "r_liteprofile"],
      },
      (accessToken, refreshToken, profile: Profile, done) => {
        done(null, {
          provider: "linkedin",
          providerId: profile.id, // <-- required
          profile,
          accessToken,
          refreshToken,
        });
      }
    )
  );
};
