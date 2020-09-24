import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { ExtractJwt, Strategy, StrategyOptions } from "passport-jwt";
import { userServices, UserAttributes } from "../components/user";

import AppError from "../utils/AppError";

declare global {
  namespace Express {
    interface User extends UserAttributes {}
  }
}

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET!,
};

const strategy: Strategy = new Strategy(options, (payload, done) => {
  (async () => {
    const user = await userServices.checkUser(payload);

    if (user) {
      done(null, user);
    } else {
      done(null, false, {
        status: "fail",
        message: "User tidak ditemukan!",
      });
    }
  })().catch((err) => done(err, false));
});

passport.use(strategy);

export function authenticate(req: Request, res: Response, next: NextFunction) {
  passport.authenticate("jwt", { session: false }, function (err, user) {
    if (err) {
      return next(err);
    }

    if (!user) {
      return next(new AppError("User tidak terdaftar!", 401));
    }

    req.user = user;
    delete req.query.password;

    next();
  })(req, res, next);
}

export default passport.initialize;
