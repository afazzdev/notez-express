import { Request, Response } from "express";
import { ok } from "../../utils/responseJson";
import userService from "./userService";

class UserController {
  async getUsers(req: Request, res: Response) {
    const users = await userService.getUsers(req.query);

    return ok(res, {
      data: users,
    });
  }

  async getUser(req: Request, res: Response) {
    return ok(res, {
      data: req.user,
    });
  }

  async getProfile(req: Request, res: Response) {
    const user = await userService.getProfile(req.user?.id!);

    return ok(res, {
      data: user,
    });
  }
}

export default new UserController();
