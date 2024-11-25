require("dotenv").config();
const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3001;

//use JOSN middleware
app.use(express.json());

//imports routes
const EducationBoardRoutes = require("./routes/EducationBoardRoutes");
const StudentRoutes = require("./routes/StudentRoutes");

//use routers
app.use("/board", EducationBoardRoutes);
app.use("/student", StudentRoutes);

//db connection
mongoose.connect(process.env.DB_URL).then(() => {
  console.log("DB Connected");
  //listining the server
  app.listen(PORT, () => {
    console.log("server are listing at port", PORT);
  });
});
