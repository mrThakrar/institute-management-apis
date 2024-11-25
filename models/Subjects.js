const mongoose = require("mongoose");

const Subjects = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    subjectCode: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("subjects", Subjects);
