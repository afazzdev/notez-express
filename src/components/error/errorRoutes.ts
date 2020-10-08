import { ErrorRequestHandler } from "express";
import errorController from "./errorController";

export default <ErrorRequestHandler>function ErrorRoutes(err, _, res, __) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    errorController.sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    const { message, isOperational, status, statusCode } = err;
    let error = Object.assign(
      { message, isOperational, status, statusCode },
      err,
    );

    errorController.sendErrorProd(error, res);
  }
};
