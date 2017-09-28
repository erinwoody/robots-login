const express = require("express");
const authRoutes = express.Router();
const Robot = require("../models/Robot");
const bcrypt = require("bcryptjs");

authRoutes.get("/signup", (req, res) => {
  res.render("signup");
});

//////SIGNUP/////

authRoutes.post("/signup", (req, res) => {
  let newRobot = new Robot(req.body); //schema name
  console.log("newRobot: ", newRobot);

  if (!newRobot.job) {
    newRobot.job = null;
  }

  let salt = bcrypt.genSaltSync(10);
  newRobot.password = bcrypt.hashSync(newRobot.password, salt);
  newRobot
    .save()
    .then(function(savedUser) {
      console.log("savedUser: ", savedUser);
      res.redirect("/auth/login");
    })
    .catch(function(err) {
      if (!err) res.status(500).send("Error saving user!");
    });
});

authRoutes.get("/login", (req, res) => {
  res.render("login");
});

/////LOGIN/////

authRoutes.post("/login", (req, res) => {
  let reqUsername = req.body.username;
  let reqPassword = req.body.password;

  Robot.findOne({
    username: reqUsername
  }).then(function(foundUser) {
    if (!foundUser) {
      return res.render("login", {
        errors: ["No users found."]
      });
    }

    const authorized = bcrypt.compareSync(reqPassword, foundUser.password);

    if (!authorized) {
      return res.render("index", {
        errors: ["Password does not match."]
      });
    }

    delete foundUser.password;
    req.session.user = foundUser;
    res.redirect("/user/profile");
  });
});

module.exports = authRoutes;
