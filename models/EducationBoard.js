const mongoose = require("mongoose");

const EducationBoard = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    shortName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("education_board", EducationBoard);
