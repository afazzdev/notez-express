import { Request, Response, CookieOptions, NextFunction } from "express";
import jwt from "jsonwebtoken";

import passport from "../../config/passport";

import { User, UserAttributes } from "../user";
import authService from "./authService";

import AppError from "../../utils/AppError";
import { ok, created } from "../../utils/responseJson";

declare global {
  namespace Express {
    interface User extends UserAttributes {}
  }
}

function createSendToken(
  res: Response,
  user: User,
  statusCode?: 201 | 200 | number,
) {
  const signToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET!, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  };
  const token = signToken(user.id);

  const cookieOptions: CookieOptions = {
    expires: new Date(
      Date.now() +
        parseInt(process.env.JWT_COOKIE_EXPIRES_IN!) * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  // remove password from output
  // @ts-ignore
  user.password = undefined;

  if (statusCode === 201) {
    return created(res, {
      token,
      data: user,
    });
  } else {
    return ok(res, {
      token,
      data: user,
    });
  }
}

class AuthController {
  async signUp(req: Request, res: Response, _: NextFunction) {
    const newUser = await authService.signUp(req.body);

    return createSendToken(res, newUser!, 201);
  }

  async signIn(req: Request, res: Response, _: NextFunction) {
    const user = await authService.signIn(req.body);

    return createSendToken(res, user!);
  }

  authenticate(req: Request, res: Response, next: NextFunction) {
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
}

export default new AuthController();
