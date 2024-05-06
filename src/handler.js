const { nanoid } = require("nanoid");
const notes = require("./notes");

const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title,
    tags,
    id,
    body,
    createdAt,
    updatedAt,
  };
  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id == id).length > 0;

  if (isSuccess) {
    const response = h.response({
      //   error: "false",
      status: "success",
      message: "catatan berhasil ditambahkan",
      data: {
        noteId: id,
      },
    });
    // response.header('Access-Control-Allow-Origin', '*');
    response.code(201);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "gagal ditambahkan",
  });
  response.code(500);
  return response;
};

const getAllNotesHandler = () => ({
  status: "success",
  data: {
    notes,
  },
});

const getNoteById = (request, h) => {
  const { id } = request.params;

  const note = notes.filter((n) => n.id === id)[0];

  if (note !== undefined) {
    return {
      status: "success",
      data: {
        note,
      },
    };
  }
  const response = h.response({
    status: "fail",
    message: "Catatan tidak ditemukan",
  });
  response.code(404);
  return response;
};

const editNotesById = (request, h) => {
  const { id } = request.params;
  const { title, tags, body } = request.payload;
  const updatedAt = new Date().toISOString();

  const index = notes.findIndex((note) => note.id === id);

  if (index === -1) {
    const response = h.response({
      status: "fail",
      message: `gagal mengubah data! ${index},   (${id})`,
    });
    response.code(500);
    return response;
  } //
  notes[index] = {
    ...notes[index],
    title,
    tags,
    body,
    updatedAt,
  };
  const response = h.response({
    status: "success",
    message: `data berhasil diubah`,
  });
  response.code(201);
  // return response;

  return response;
};

const deleteNotesById = (request, h) => {
  const { id } = request.params;

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: "success",
      message: "data berhasil dihapus",
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "data gagal dihapus",
  });
  response.code(501);
  return response;
};

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteById,
  editNotesById,
  deleteNotesById,
};
