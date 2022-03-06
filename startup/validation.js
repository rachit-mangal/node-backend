const Joi = require("joi");

module.exports = function (app) {
  Joi.objectid = require("joi-objectid")(Joi);
};
