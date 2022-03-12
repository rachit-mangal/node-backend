const mongoose = require("mongoose");
const winston = require("winston");
const config = require("config");
const logger = require("../middleware/logger");
const { conformsTo } = require("lodash");
const { contentSecurityPolicy } = require("helmet");

module.exports = function (app) {
  mongoose.connect(config.mongodb_url).then((r) => {
    logger.info("Connected to MongoDB");
  });

  // mongoose.connect("mongodb://localhost/new").then((r) => {
  //   console.log("connected to mongodb");
  //   logger.info("Connected to MongoDB");
  // });
};
