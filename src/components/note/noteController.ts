import { Request, Response } from "express";
import noteServices from "./noteServices";

class NoteController {
  async getNotes(_: Request, res: Response) {
    const notes = await noteServices.getNotes();

    return res.json(notes);
  }
}

export default new NoteController();
