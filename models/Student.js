const mongoose = require("mongoose");
const { Mediums, ClassCategory } = require("../utils/constants");

const StudentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    educationBoard: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "education_board",
    },
    medium: {
      type: String,
      required: true,
      enum: Mediums,
    },
    classCategory: {
      type: String,
      required: true,
      enum: ClassCategory,
    },
    classStandards: {
      type: String,
      required: true,
    },
    subjects: {
      type: Array,
      default: [],
    },
    specificSubjects: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("student", StudentSchema);
