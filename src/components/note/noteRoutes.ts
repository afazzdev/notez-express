import BaseRouter from "../base/baseRouter";
import noteController from "./noteController";

class UserRoutes extends BaseRouter {
  routes(): void {
    this.router.route("/").get(noteController.getNotes);
  }
}

export default new UserRoutes().router;
