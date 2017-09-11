const express = require("express");
userRoutes = express.Router();

userRoutes.get("/profile", (req, res) => {
  res.render("profile", { user: req.session.user });
});

module.exports = userRoutes;
