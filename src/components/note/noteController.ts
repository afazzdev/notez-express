import { Request, Response } from "express";
import { ok } from "../../utils/responseJson";
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
}

export default new NoteController();
