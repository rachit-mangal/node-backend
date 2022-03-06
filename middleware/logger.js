const winston = require("winston");
const config = require("config");
const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp, stack }) => {
  return ` [${label} ${timestamp} ${level}: ${stack || message}`;
});

const prodLogger = createLogger({
  level: "debug",
  format: format.json(),
  format: combine(
    // format.colorize(),
    timestamp(),
    label({ label: "Winston is Logging : " }),
    format.errors({ stack: true }),
    myFormat
  ),
  defaultMeta: { service: "user-service" },
  transports: [
    new transports.File({
      filename: "./logs/error.log",
      level: "error",
      handleExceptions: true,
    }),
    new transports.File({
      filename: "./logs/combined.log",
      handleExceptions: true,
    }),
    // new transports.MongoDB({
    //   db: "mongodb://localhost/playground",
    //   collection: "errors",
    // }),
    new transports.Console(),
  ],
});

// Question - how to capture the following - route / request, usert details, IP and other relevant fields.

// Lets custom incorporate the fields for dev and production logger..

const devLogger = createLogger({
  level: "debug",
  format: format.simple(),
  format: combine(
    timestamp(),
    label({ label: "Winston is Logging : " }),
    format.errors({ stack: true }),
    myFormat
  ),
  defaultMeta: { service: "user-service" },
  transports: [
    // new transports.MongoDB({ db: "mongodb://localhost/playground" }),
    new transports.File({ filename: "./logs/error.log", level: "error" }),
    new transports.File({ filename: "./logs/combined.log", level: "info" }),
    new transports.Console({ level: "info" }),
  ],
});

const logger = process.env.NODE_END === "development" ? devLogger : prodLogger;

module.exports = logger;
