const express = require("express");
const Router = express.Router();

const {
  createStudent,
  editStudents,
  getStudents,
  createSubject,
  appendSubjectWithStudents,
  getSubjects,
} = require("../Controllers/studentController");

Router.post("/add-student", createStudent);
Router.patch("/edit-student", editStudents);
Router.get("/get-student", getStudents);

//create subjects
Router.post("/add-subject", createSubject);
Router.patch("/update-student-subject", appendSubjectWithStudents);
Router.get("/get-subjects", getSubjects);

module.exports = Router;
