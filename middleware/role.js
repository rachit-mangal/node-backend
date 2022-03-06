module.exports = function role(req, res, next) {
  console.log("checking for role");
  if (req.user.role !== "admin")
    return res.status(404).send("not admin, access demiex");

  next();
};
