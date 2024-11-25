const express = require("express");
const Router = express.Router();

const {
  createEducationBoard,
  updateEducationBoard,
  listAllBoards,
  deleteBoards,
} = require("../Controllers/EducationBoardController");

Router.post("/add-board", createEducationBoard);
Router.patch("/edit-board", updateEducationBoard);
Router.get("/list-all-board", listAllBoards);
Router.delete("/delete-board", deleteBoards);

module.exports = Router;
