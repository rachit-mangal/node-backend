const _ = require("lodash");
const config = require("config");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const { valid } = require("joi");
const router = express.Router();

// Authorize User

function validateUser(user) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(user);
}

router.post("/", async (req, res) => {
  console.log(req.body);
  const { error } = validateUser(req.body);

  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).send("check this, there is no user with this id. ");
  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword)
    return res.status(400).send("Invalid username or password");

  // When successful ,we have to return a jwt web token.
  if (user && validPassword) {
    const token = user.generateAuthToken();
    res.send(token);
  }
});

module.exports = router;
