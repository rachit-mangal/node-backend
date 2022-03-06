const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const { User, validate } = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

// Get All Users sorted by name
router.get("/", async (req, res) => {
  User.find()
    .sort("name")
    .select("-password")
    .then((users) => {
      res.send(users);
    })
    .catch((e) => console.log("error is here", e));
});

// Get current user
router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

// POST API - Create new user

router.post("/", async (req, res) => {
  // Validatiion.
  const { error, value } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  user = await User.findOne({ email: req.body.email });
  if (user) return res.send("Account with email already exists");

  user = new User(_.pick(req.body, ["email", "password", "role"]));

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  user.save().then((result) => {
    const token = user.generateAuthToken();
    res
      .header("x-auth-token", token)
      .send(_.pick(user, ["_id", "username", "email", "role"]));
  });
});

module.exports = router;
