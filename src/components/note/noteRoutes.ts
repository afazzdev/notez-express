import BaseRouter from "../base/baseRouter";
import noteController from "./noteController";

import { catchAsync } from "../../utils/catchAsync";
import { authController } from "../user";

class NoteRoutes extends BaseRouter {
  routes(): void {
    this.router
      .route("/:id")
      .get(catchAsync(noteController.getNote))
      .patch(authController.authenticate, catchAsync(noteController.editNote))
      .delete(
        authController.authenticate,
        catchAsync(noteController.deleteNote),
      );
    this.router
      .route("/")
      .get(catchAsync(noteController.getNotes))
      .post(authController.authenticate, catchAsync(noteController.createNote));
  }
}

export default new NoteRoutes().router;
