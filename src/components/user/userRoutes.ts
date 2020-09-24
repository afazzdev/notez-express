import BaseRouter from "../base/baseRouter";
import userController from "./userController";

class UserRouter extends BaseRouter {
  routes(): void {
    this.router.post("/signup", userController.signUp);
    this.router.post("/signin", userController.signIn);
  }
}

export default new UserRouter().router;
