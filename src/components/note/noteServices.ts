import { Note } from "./noteModel";

import AppError from "../../utils/AppError";
import { GetNotesFilter } from "./dto/getNotesFilter";

class NoteServices {
  async getNotes(filter: GetNotesFilter) {
    let where: Partial<Note> = {};

    if (filter.userId) {
      where.userId = filter.userId;
    }

    const notes = await Note.findAll({
      where,
      order: [["updatedAt", "DESC"]],
    });

    return notes;
  }

  async getNote(id: string) {
    const note = await Note.findOne({
      where: {
        id,
      },
    });

    return note;
  }

  async createNote(id: string, body: any) {
    const rawData = { ...body };
    rawData.userId = id;
    const note = await Note.create(rawData);

    return note;
  }

  async editNote(id: string, userId: string, body: any) {
    try {
      const note = await this.getNote(id);
      if (note?.userId === userId) {
        await note.update(body);

        return note;
      } else {
        throw new AppError(
          "Anda tidak memiliki akses untuk melakukan perintah ini!",
          400,
        );
      }
    } catch (error) {
      throw new AppError("unknown error", 500);
    }
  }
}

export default new NoteServices();
