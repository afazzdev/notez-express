import { Note } from "./noteModel";

class NoteServices {
  async getNotes() {
    const notes = await Note.findAll();

    return notes;
  }

  async getNote(id: number) {
    const note = await Note.findOne({
      where: {
        id,
      },
    });

    return note;
  }
}

export default new NoteServices();
