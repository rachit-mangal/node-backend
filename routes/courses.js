const { Course, validate } = require("../models/course");
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

// Get All Courses sorted by name

router.get("/", async (req, res) => {
  Course.find()
    .sort("name")
    .then((courses) => {
      res.send(courses);
    })
    .catch((e) => console.log("error is here", e));
});

// API with params
router.get("/:id", [auth, role], async (req, res) => {
  let course = await Course.findById(req.params.id);
  if (!course)
    return res
      .status(404)
      .send(
        "no course found with given id or something went wrong in fetching information"
      );
  res.send(course);
});

// POST API - Create new course

router.post("/", async (req, res) => {
  // Validatiion.
  const { error, value } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let course = new Course(req.body);
  course
    .save()
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
});

// PUT API - Update Course

router.put("/:id", async (req, res) => {
  // Checking if course exists and updating.
  let course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!course) return res.status(400).send("Course with given id not found!");
  // Validaition of request
  const { error, value } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  res.send(course);
});

// DELETE API

router.delete("/:id", async (req, res) => {
  console.log(req.params.id);
  const course = await Course.findByIdAndRemove(req.params.id);
  console.log(course);
  if (!course) return res.status(404).send("No course found with given id");
  return res.send(course);
});

module.exports = router;
