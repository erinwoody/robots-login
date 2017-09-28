const express = require("express");
const indexRoutes = express.Router();
const Robot = require("../models/Robot");
const robotList = require("../data");
const bcrypt = require('bcryptjs');

indexRoutes.get("/", (req, res) => {
  Robot.find().then(foundRobots => {
    console.log(foundRobots);
    if (!foundRobots) {
      res.status(500).send(err);
    }
    console.log(foundRobots);
    res.render("index", { users: foundRobots }); //sets what the first page is
  });
});

// indexRoutes.post("/createallthembots", (req, res) => {
//   console.log("robotList: ", robotList);
//   robotList.users.forEach(function(robot) {

//     let newRobot = new Robot(robot); //schema name
//     console.log("newRobot: ", newRobot);

//     if (!newRobot.job) {
//       newRobot.job = null;
//     }

//     let salt = bcrypt.genSaltSync(10);
//     newRobot.password = bcrypt.hashSync("password", salt);
//     newRobot
//       .save()
//       .then(function(savedRobot) {
//         console.log("savedRobot: ", savedRobot);
//       })
//       .catch(function(err) {
//         if (!err) res.status(500).send("Error saving user!");
//       });
//   });
// });

module.exports = indexRoutes;
