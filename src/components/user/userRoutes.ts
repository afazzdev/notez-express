import { catchAsync } from "../../utils/catchAsync";
import authController from "../auth";
import BaseRouter from "../base/baseRouter";
import userController from "./userController";

class UserRouter extends BaseRouter {
  routes(): void {
    this.router.post("/signup", catchAsync(authController.signUp));
    this.router.post("/signin", catchAsync(authController.signIn));

    this.router
      .route("/:id")
      .get(authController.authenticate, catchAsync(userController.getUser));
    this.router
      .route("/")
      .get(authController.authenticate, catchAsync(userController.getUsers));
  }
}

export default new UserRouter().router;
