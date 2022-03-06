
const mongoose = require("mongoose");
const Joi = require("joi");

function validateCourse(course) {
  const schema = Joi.object({ title: Joi.string().required().min(3) });
  return schema.validate(course);
}

const Course = new mongoose.model(
  "Course",
  new mongoose.Schema({
    title: { type: String, required: true, minLength: 3 },
  })
);

module.exports.Course = Course;
module.exports.validate = validateCourse;
