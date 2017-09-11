const express = require("express");
const indexRoutes = express.Router();
const Robot = require("../models/Robot");
// const mongoose = require("mongoose");
// const bluebird = require("bluebird");

indexRoutes.get("/", (req, res) => {
  Robot.find().then(foundRobots => {
    if (!foundRobots) {
      res.status(500).send(err);
    }
      console.log(foundRobots);
      res.render("index", { users: foundRobots });
    });
  // console.log(req.session);
  // res.render("index");
});

module.exports = indexRoutes;
