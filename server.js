const express = require("express");
const mustacheExpress = require("mustache-express");
const path = require("path");
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const ObjectId = mongo.ObjectID;
const dbUrl = "mongodb://localhost:27017/robots";
let DB;
let robots;
const app = express();

app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

app.use(express.static(path.join(__dirname, "public")));


//Connect to DB
MongoClient.connect(dbUrl, (err, db) => {
    if (err) {
        return console.log("Error connecting to database:", err);
    }

    DB = db;
    Robots = db.collection("robots");
});

app.get("/", (req, res) => {
    Robots.find({}).toArray((err, foundRobots) => {
        if (err) res.status(500).send(err);
        res.render('index', {
            users: foundRobots
        });
        console.log(foundRobots);
    });
});

app.get("/profile/:id", (req, res) => {
    Robots.findOne({
        _id: ObjectId(req.params.id)
    }, function (err, foundRobot) {
        if (err) res.status(500).send(err);
        if (!foundRobot) res.send("No user found");
        // res.send(foundRobot);
        res.render('profile', foundRobot);
    });
});

app.get("/employed", (req, res) => {
    Robots.find({
        job: {
            $ne: null
        }
    }).toArray((err, foundRobots) => {
        if (err) res.status(500).send(err);
        res.render('index', {
            users: foundRobots
        })
    });
});

app.get("/unemployed", (req, res) => {
    Robots.find({
        job: null
    }).toArray((err, foundRobots) => {
        if (err) res.status(500).send(err);
        res.render('index', {
            users: foundRobots
        })
    });
});

app.listen(8000, () => console.log('It works!'));

