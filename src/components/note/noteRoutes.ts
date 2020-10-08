import BaseRouter from "../base/baseRouter";
import noteController from "./noteController";

import { catchAsync } from "../../utils/catchAsync";

class UserRoutes extends BaseRouter {
  routes(): void {
    this.router.route("/:id").get(catchAsync(noteController.getNote));
    this.router.route("/").get(catchAsync(noteController.getNotes));
  }
}

export default new UserRoutes().router;
