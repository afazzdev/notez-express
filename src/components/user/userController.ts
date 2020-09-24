import { Request, Response } from "express";
import userServices from "./userServices";

class UserController {
  async signUp(req: Request, res: Response) {
    const newUser = await userServices.signUp(req.body);

    return res.json(newUser);
  }

  async signIn(req: Request, res: Response) {
    const newUser = await userServices.signIn(req.body);

    return res.json(newUser);
  }
}

export default new UserController();
