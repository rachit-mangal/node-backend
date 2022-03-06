const logger = require("./logger");

module.exports = function error(err, req, res, next) {
  console.log("error loop is happening");
  logger.error(err);
  logger.info("info");
  res.status(500).send("Something failed.");
};
