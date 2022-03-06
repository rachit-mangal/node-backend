require("express-async-errors");
const config = require("config");
const dbDebugger = require("debug")("app:db");
const startupDebugger = require("debug")("app:startup");

const logger = require("./middleware/logger");
const express = require("express");
const app = express();
require("./startup/logging")();
require("./startup/db")();
require("./startup/routes")(app);
require("./startup/config")();
require("./startup/validation")();
require("./startup/prod")(app);

// Inbuuilt Middleware to manage public files
app.use(express.static("public"));

const port = process.env.PORT || 3000;
app.listen(port, () => logger.info(`Listening on port ${port}`));
