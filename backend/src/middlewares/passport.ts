// src/middlewares/passport.ts
import passport from "passport";
import { setupJwtStrategy } from "../common/strategies/jwt.strategy";
import { setupGoogleStrategy } from "../common/strategies/google.strategy";
import { setupLinkedInStrategy } from "../common/strategies/linkedIn.strategy";

const initializePassport = () => {
  setupJwtStrategy(passport);
  setupGoogleStrategy(passport);
  setupLinkedInStrategy(passport);
};

initializePassport();
export default passport;

