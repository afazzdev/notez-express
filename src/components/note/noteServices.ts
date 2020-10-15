import { Note } from "./noteModel";

import AppError from "../../utils/AppError";
import { GetNotesFilter } from "./dto/getNotesFilter";

class NoteServices {
  async getNotes(filter: GetNotesFilter) {
    const filterCopy = filter as GetNotesFilter & { [key: string]: any };
    const { ...rest } = filter;
    let where: Partial<Note> & { [key: string]: any } = {};

    for (let key of Object.keys(rest)) {
      where[key] = filterCopy[key];
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

  async deleteNote(userId: string, id: string) {
    try {
      const note = await Note.findByPk(id);

      if (note?.userId === userId) {
        return note.destroy();
      } else {
        throw new AppError(
          "Anda tidak memiliki akses untuk menghapus note ini!",
          401,
        );
      }
    } catch (e) {
      throw new AppError("Unknown error occured!", 500);
    }
  }
}

export default new NoteServices();
