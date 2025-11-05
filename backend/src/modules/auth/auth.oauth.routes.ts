import express from "express";
import passport from "../../middlewares/passport";
import {AuthService} from "./auth.service";
import { setAuthenticationCookies } from "./utils/cookies";

const router = express.Router();
const authService = new AuthService();
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

/**
 * Start OAuth flow
 */
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/linkedin", passport.authenticate("linkedin"));

/**
 * Callback handlers - use custom callback so we can control tokens/cookies
 */
router.get("/google/callback", (req, res, next) => {
  passport.authenticate("google", { session: false }, async (err, payload) => {
    if (err || !payload) {
      console.error("Google OAuth error", err);
      return res.redirect(`${FRONTEND_URL}/auth/error`);
    }

    try {
      const { provider, profile } = payload as any;
      const email = (profile.emails && profile.emails[0] && profile.emails[0].value) ?? null;
      if (!email) return res.redirect(`${FRONTEND_URL}/auth/error?reason=no_email`);

      const result = await authService.oauthLoginOrRegister(provider, {
        providerId: profile.id,
        email,
        name: profile.displayName || `${profile.name?.givenName || ""} ${profile.name?.familyName || ""}`,
        rawProfile: profile,
      });

      // result: { user, accessToken, refreshToken, mfaRequired }
      const { user, accessToken, refreshToken } = result;

      // set cookies and redirect to frontend (frontend will fetch session/profile)
      setAuthenticationCookies({ res, accessToken, refreshToken });
      return res.redirect(`${FRONTEND_URL}/auth/success`);
    } catch (e) {
      console.error("Google callback handling error:", e);
      return res.redirect(`${FRONTEND_URL}/auth/error`);
    }
  })(req, res, next);
});

router.get("/linkedin/callback", (req, res, next) => {
  passport.authenticate("linkedin", { session: false }, async (err: Error, payload:any) => {
    if (err || !payload) {
      console.error("LinkedIn OAuth error", err);
      return res.redirect(`${FRONTEND_URL}/auth/error`);
    }

    try {
      const { provider, profile } = payload as any;
      const email = (profile.emails && profile.emails[0] && profile.emails[0].value) ?? null;
      if (!email) return res.redirect(`${FRONTEND_URL}/auth/error?reason=no_email`);

      const result = await authService.oauthLoginOrRegister(provider, {
        providerId: profile.id,
        email,
        name: profile.displayName || `${profile.name?.givenName || ""} ${profile.name?.familyName || ""}`,
        rawProfile: profile,
      });

      const { user, accessToken, refreshToken } = result;

      setAuthenticationCookies({ res, accessToken, refreshToken });
      return res.redirect(`${FRONTEND_URL}/auth/success`);
    } catch (e) {
      console.error("LinkedIn callback handling error:", e);
      return res.redirect(`${FRONTEND_URL}/auth/error`);
    }
  })(req, res, next);
});

export default router;
