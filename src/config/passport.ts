import passport from "passport";
import { ExtractJwt, Strategy, StrategyOptions } from "passport-jwt";
import authService from "../components/auth/authService";

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET!,
};

const strategy: Strategy = new Strategy(options, (payload, done) => {
  (async () => {
    try {
      const user = await authService.checkUser(payload);

      if (user) {
        done(null, user);
      } else {
        done(null, false, {
          status: "fail",
          message: "User tidak ditemukan!",
        });
      }
    } catch (error) {
      done(error, false);
    }
  })();
});

passport.use(strategy);

export default passport;
