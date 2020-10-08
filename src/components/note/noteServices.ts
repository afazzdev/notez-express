import { Note } from "./noteModel";

class NoteServices {
  async getNotes() {
    const notes = await Note.findAll();

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
}

export default new NoteServices();
