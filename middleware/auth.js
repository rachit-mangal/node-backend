const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token)
    return res.status(401).send("no token specified, so can't access");
  console.log("token is", token, config.get("jwtPrivateKey"));

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded;
    console.log("user is decoded", decoded);
    next();
  } catch (ex) {
    res.status(400).send("Invalid Token");
  }
};
