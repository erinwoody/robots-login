const express = require("express");
const Robot = require("../models/Robot");
userRoutes = express.Router();

userRoutes.get("/profile", (req, res) => {
  res.render("profile", {
    users: req.session.user
  });
});

userRoutes.get("/update", (req, res) => {
  res.render("update", {
    users: req.session.user
  });
});


////UPDATE ENTRY////
userRoutes.post("/updateprofile/:id", function (req, res) {
  Robot.findByIdAndUpdate(req.params.id, req.body)
    .then(function (updatedRobot) {
      res.redirect(`/profile/${req.params.id}`);
    })
    .catch(function (err) {
      res.status(500).send(err);
    });
});


////DELETE ENTRY////
userRoutes.get("/deleteUser/:id", function (req, res) {
  Robot.findByIdAndRemove(req.params.id)
    .then(function (message) {
      return res.redirect("/");
    })
    .catch(function (err) {
      res.status(500).send(err);
    });
});



module.exports = userRoutes;