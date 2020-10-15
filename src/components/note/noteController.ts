import { Request, Response } from "express";
import { created, ok, noContent } from "../../utils/responseJson";
import noteServices from "./noteServices";

import { GetNotesFilter } from "./dto/getNotesFilter";

class NoteController {
  async getNotes(req: Request, res: Response) {
    const notes = await noteServices.getNotes(
      (req.query as unknown) as GetNotesFilter,
    );

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

  async deleteNote(req: Request, res: Response) {
    await noteServices.deleteNote(req.user?.id!, req.params.id);

    return noContent(res);
  }
}

export default new NoteController();
