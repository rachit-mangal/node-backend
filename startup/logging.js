const mongoose = require("mongoose");
const winston = require("winston");

module.exports = function () {
  winston.handleExceptions(
    new winston.transports.File({ filename: "logs/unCaughtException.log" })
  );

  process.on("unhandledRejection", (ex) => {
    console.log("error loog");
    console.log(ex);
    throw ex;
  });
};
