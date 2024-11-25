const Student = require("../models/Student");
const Subjects = require("../models/Subjects");

module.exports = {
  /**
   * @description This function is used to create student
   */
  createStudent: async (req, res) => {
    try {
      const bodyData = req.body;

      const createData = await Student.create(bodyData);

      return res.status(201).json({
        status: 201,
        data: {},
        message: "done",
      });
    } catch (error) {
      console.log("error", error);

      return res.status(500).json({
        status: 500,
        data: {},
        message: "Something wents wrong",
      });
    }
  },

  /**
   * @description This function is used to edit student
   */
  editStudents: async (req, res) => {
    try {
      const bodyData = req.body;

      if (!bodyData && !bodyData.id) {
        return res.status(400).json({
          status: 400,
          data: {},
          message: "id is missing",
        });
      }

      await Student.updateOne({ _id: bodyData.id }, bodyData);

      return res.status(200).json({
        status: 200,
        data: {},
        message: "done",
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        data: {},
        message: "Something wents wrong",
      });
    }
  },

  /**
   * @description This function is used to get student details, subject details & specialSubject Details as well.
   */
  getStudents: async (req, res) => {
    try {
      const id = req.query.id;

      if (!id) {
        return res.status(400).json({
          status: 400,
          data: {},
          message: "id is missing",
        });
      }

      //find students details
      let findData = await Student.findById({ _id: id })
        .populate("educationBoard", "fullName shortName")
        .exec();

      if (!findData) {
        return res.status(400).json({
          status: 400,
          data: {},
          message: "No any details exist",
        });
      }
      // Converts this document into a plain-old JavaScript object
      findData = findData.toObject();

      //find students subjects
      const findSubjects = await Subjects.find({
        _id: { $in: findData.subjects },
      });
      //append data
      findData["subjectsArr"] = findSubjects || [];

      //append special subjects
      const findspecificSubjects = await Subjects.find({
        _id: { $in: findData.specificSubjects },
      });

      findData["specificSubjectsArr"] = findspecificSubjects || [];

      return res.status(200).json({
        status: 200,
        data: findData,
        message: "done",
      });
    } catch (error) {
      console.log("error", error);

      return res.status(500).json({
        status: 500,
        data: {},
        message: "Something wents wrong",
      });
    }
  },

  /**
   * @description This function is used to create subjects by admin.
   */
  createSubject: async (req, res) => {
    try {
      const bodyData = req.body;

      //find exist data
      const findData = await Subjects.findOne({
        name: bodyData.name,
        subjectCode: bodyData.subjectCode,
      });

      if (findData) {
        return res.status(400).json({
          status: 400,
          data: {},
          message: "Subject already exist",
        });
      }
      await Subjects.create(bodyData);

      return res.status(201).json({
        status: 201,
        data: {},
        message: "done",
      });
    } catch (error) {
      console.log("error", error);

      return res.status(500).json({
        status: 500,
        data: {},
        message: "Something wents wrong",
      });
    }
  },

  /**
   * @description This function is used to add/update student subjects & special subjects
   */
  appendSubjectWithStudents: async (req, res) => {
    try {
      const { id, subjectArr, specificSubjectsArr } = req.body;

      //find exist data
      const findData = await Student.findOne({
        _id: id,
      });

      if (!findData) {
        return res.status(400).json({
          status: 400,
          data: {},
          message: "Student does not exist",
        });
      }

      //add/upate students subjects
      await Student.updateOne(
        { _id: id },
        { $push: { subjects: { $each: subjectArr } } }
      );

      //add/upate students specificSubjects
      await Student.updateOne(
        { _id: id },
        { $push: { specificSubjects: { $each: specificSubjectsArr } } }
      );

      return res.status(200).json({
        status: 200,
        data: {},
        message: "done",
      });
    } catch (error) {
      console.log("error", error);

      return res.status(500).json({
        status: 500,
        data: {},
        message: "Something wents wrong",
      });
    }
  },
};
