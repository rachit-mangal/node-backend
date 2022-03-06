const config = require("config");

module.exports = function () {
  if (!config.get("jwtPrivateKey")) {
    throw new Error("Fatal Error: jwtKey is not defined");
    process.exit(1);
  }
};
