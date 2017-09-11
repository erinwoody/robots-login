const express = require("express");
const indexRoutes = express.Router();
const Robot = require("../models/Robot");


indexRoutes.get("/", (req, res) => {
  Robot.find().then(foundRobots => {
    if (!foundRobots) {
      res.status(500).send(err);
    }
      console.log(foundRobots);
      res.render("index", { users: foundRobots });
    });

});

module.exports = indexRoutes;
