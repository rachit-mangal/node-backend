const mongoose = require("mongoose");
const winston = require("winston");
const config = require("config");

module.exports = function (app) {
  // mongoose.connect(config.mongodb_url).then((r) => {
  //   console.log("connected to mongodb");
  //   winston.info("Connected to MongoDB");
  // });

  mongoose.connect(" mongodb://localhost/playground").then((r) => {
    console.log("connected to mongodb");
    winston.info("Connected to MongoDB");
  });
  // .catch((err) => console.error("could not connect to db", err));
};
