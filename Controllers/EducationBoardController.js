const EducationBoard = require("../models/EducationBoard");

module.exports = {
  /**
   * @description This function is used to create education board by admin.
   */
  createEducationBoard: async (req, res) => {
    try {
      //getting data from admin
      const { fullName, shortName } = req.body;

      //validation of body
      if (!fullName || !shortName) {
        return res.status(400).json({
          status: 400,
          data: {},
          message: "Please Provide Full Name and Short Name",
        });
      }

      //check that already exist or not
      const findExist = await EducationBoard.findOne({ fullName, shortName });
      if (findExist) {
        return res.status(400).json({
          status: 400,
          data: {},
          message: "Details already exist with same name",
        });
      }
      //   create data in db
      const addData = await EducationBoard.create(req.body);

      return res.status(201).json({
        status: 201,
        data: addData,
        message: "done",
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        data: {},
        message: "Something Wents Wrong!",
      });
    }
  },

  /**
   * @description This function is used to edit education board by admin
   */
  updateEducationBoard: async (req, res) => {
    try {
      //getting data from admin
      const { fullName, shortName, id } = req.body;

      //validation of body
      if (!fullName || !shortName || !id) {
        return res.status(400).json({
          status: 400,
          data: {},
          message: "Details are missing to update",
        });
      }

      //check that already exist or not
      const findExist = await EducationBoard.findOne({ _id: id });
      if (!findExist) {
        return res.status(400).json({
          status: 400,
          data: {},
          message: "No any details exist",
        });
      }
      //   create data in db
      await EducationBoard.updateOne({ _id: id }, req.body);

      return res.status(200).json({
        status: 200,
        data: {},
        message: "done",
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        data: {},
        message: "Something Wents Wrong!",
      });
    }
  },

  /**
   * @description This function is used to get education board for admin
   */
  listAllBoards: async (req, res) => {
    try {
      //check that already exist or not
      const findAll = await EducationBoard.find({});

      return res.status(200).json({
        status: 200,
        count: findAll.length,
        data: findAll,
        message: "done",
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        data: {},
        message: "Something Wents Wrong!",
      });
    }
  },

  /**
   * @description This function is used to delete education board by admin
   */
  deleteBoards: async (req, res) => {
    try {
      //getting data from admin
      const { id } = req.body;

      //validation of body
      if (!id) {
        return res.status(400).json({
          status: 400,
          data: {},
          message: "id is  missing to update",
        });
      }

      //check that already exist or not
      const findExist = await EducationBoard.findOne({ _id: id });
      if (!findExist) {
        return res.status(400).json({
          status: 400,
          data: {},
          message: "No any details exist",
        });
      }
      //   create data in db
      const updateData = await EducationBoard.deleteOne({ _id: id });

      return res.status(200).json({
        status: 200,
        data: {},
        message: "done",
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        data: {},
        message: "Something Wents Wrong!",
      });
    }
  },
};
