import { Request, Response } from "express";
import { created, ok } from "../../utils/responseJson";
import noteServices from "./noteServices";

class NoteController {
  async getNotes(_: Request, res: Response) {
    const notes = await noteServices.getNotes();

    return ok(res, { data: notes });
  }

  async getNote(req: Request, res: Response) {
    const notes = await noteServices.getNote(req.params.id);

    return ok(res, { data: notes });
  }

  async createNote(req: Request, res: Response) {
    const note = await noteServices.createNote(req.user?.id!, req.body);

    return created(res, {
      data: note,
    });
  }

  async editNote(req: Request, res: Response) {
    const edittedNote = await noteServices.editNote(
      req.params.id,
      req.user?.id!,
      req.body,
    );

    return ok(res, {
      data: edittedNote,
    });
  }
}

export default new NoteController();
