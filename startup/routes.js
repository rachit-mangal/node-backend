const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const fs = require("fs");
const path = require("path");
const error = require("../middleware/error");
const auth = require("../routes/auth");
const users = require("../routes/users");
const courses = require("../routes/courses");

module.exports = function (app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(helmet());

  // var writeStream = fs.createWriteStream(
  //   path.join(__dirname, "/logs/access.log"),
  //   {
  //     flags: "a",
  //   }
  // );
  // console.log(writeStream);
  var writeStream = fs.createWriteStream("./output");

  app.use(
    morgan(
      ":date[web] :method :url - :status - :res[content-length] - :response-time ms - :remote-user"
    )
  );
  // Detailed request log in file.
  // app.use(
  //   morgan(
  //     ":date[web] :method :url - :status - :res[content-length] - :response-time ms - :remote-user",
  //     { stream: accessLogStream }
  //   )
  // );

  app.use("/api/auth", auth);
  app.use("/api/users", users);
  app.use("/api/courses", courses);
  app.use(error);
};
