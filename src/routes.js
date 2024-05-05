const {
  addNoteHandler,
  getAllNotesHandler,
  getNoteById,
  editNotesById,
  deleteNotesById,
} = require("./handler");

const routes = [
  {
    method: "POST",
    path: "/notes",
    handler: addNoteHandler,
    options: {
      cors: {
        origin: ["*"],
      },
    },
  },
  {
    method: "GET",
    path: "/notes",
    handler: getAllNotesHandler,
    
  },
  {
    method: "GET",
    path: "/notes/{id}",
    handler: getNoteById,
    
  },
  {
    method: "PUT",
    path: "/notes/{id}",
    handler: editNotesById,
    
  },
  {
    method: "DELETE",
    path: "/notes/{id}",
    handler: deleteNotesById,
    
  },
];

module.exports = routes;
