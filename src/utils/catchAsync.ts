import { RequestHandler } from "express";

export const catchAsync = (fn: Function): RequestHandler => (req, res, next) =>
  fn(req, res, next).catch(next);
