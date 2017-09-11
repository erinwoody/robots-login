const express = require("express");
profileRoutes = express.Router();
const Robot = require("../models/Robot");


profileRoutes.get("/profile/:id", (req, res) => {
    Robot.findOne({
        _id: ObjectId(req.params.id)
    }, function (err, foundRobot) {
        if (err) res.status(500).send(err);
        if (!foundRobot) res.send("No robot found");
        res.render('profile', foundRobot);
    });
});

