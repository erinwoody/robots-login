const express = require("express");
const employmentRoutes = express.Router();
const Robot = require("../models/Robot");

employmentRoutes.get("/employed", (req, res) => {
    Robot.find().where('job').ne(null).then(foundRobot => {
        res.render("index", { users: foundRobot });
    });
});

employmentRoutes.get("/unemployed", (req, res) => {
    Robot.find({ job: null }).then(foundRobot => {
        if (!foundRobot) {
            res.status(500).send(err);
        }
        res.render("index", { users: foundRobot });
    });

});


module.exports = employmentRoutes;
