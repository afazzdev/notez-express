import { Response } from "express";
import AppError from "../../utils/AppError";

interface IError extends AppError {}
class ErrorController {
  sendErrorDev(err: IError, res: Response) {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }

  sendErrorProd = (err: IError, res: Response) => {
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    } else {
      // 1) Log to the console
      console.error("ERROR!");

      //2) Send generic message
      res.status(500).json({
        status: "error",
        message: "Something went wrong!",
      });
    }
  };
}

export default new ErrorController();
