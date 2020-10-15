import { Response } from "express";
import AppError from "./AppError";

enum enumstatus {
  success = "success",
  failed = "failed",
}

interface IResponseJson<T> {
  data?: T;
  status?: enumstatus;
  message?: string;
  token?: string;
  error?: AppError;
  stack?: AppError["stack"];
}

const responseGeneric = <T>(
  res: Response,
  props: IResponseJson<T>,
  statusCode?: number,
): Response<IResponseJson<T>> => {
  const {
    status = enumstatus.success,
    data,
    message,
    error,
    stack,
    token,
  } = props;

  return res.status(statusCode!).json({
    status,
    message,
    token,
    data,
    error,
    stack,
  });
};

export const ok = <T>(
  res: Response,
  data: Pick<IResponseJson<T>, "data" | "status" | "token">,
) => responseGeneric(res, data, 200);

export const created = <T>(
  res: Response,
  data: Pick<IResponseJson<T>, "data" | "status" | "token">,
) => responseGeneric(res, data, 201);

export const noContent = (res: Response) => responseGeneric(res, {}, 204);

export const error = <T>(
  res: Response,
  data: Omit<IResponseJson<T>, "data" | "token">,
  statusCode: 400 | 401 | 500 | number,
) => responseGeneric(res, data, statusCode);
