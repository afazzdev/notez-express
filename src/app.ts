import path from "path";
import express, { Application } from "express";
import cors from "cors";

import note from "./components/note";
import user from "./components/user";
import globalErrorHandler from "./components/error";

import AppError from "./utils/AppError";
import passport from "./config/passport";

class App {
  app: Application;

  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
  }

  middleware() {
    // static
    this.app.use(
      "/public",
      express.static(path.join(__dirname, "..", "public")),
    );

    this.app.use(cors());
    this.app.use(express.json({ limit: "10kb" }));

    // Passport initialize
    this.app.use(passport.initialize());

    if (process.env.NODE_ENV !== "production") {
      this.app.use(require("morgan")("dev"));
    }
  }

  routes() {
    this.app.use("/api/notes", note);
    this.app.use("/api/users", user);

    this.app.all("*", (req, _, next) => {
      next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
    });
    this.app.use(globalErrorHandler);
  }
}

export default new App().app;
