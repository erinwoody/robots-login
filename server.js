const express = require("express");
const mustacheExpress = require("mustache-express");
const session = require("express-session");
const logger = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const sessionConfig = require("./sessionConfig");
const checkAuth = require("./middlewares/checkAuth");
const indexRoutes = require("./routes/indexRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const profileRoutes = require("./routes/profileRoutes");
const mongoose = require("mongoose");
const bluebird = require("bluebird");



const app = express();
const port = process.env.PORT || 8000;

mongoose.Promise = bluebird;
mongoose.connect("mongodb://localhost:27017/robots");


// TEMPLATING ENGINE
app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

// MIDDLEWARE
app.use(express.static(path.join(__dirname, "./public")));
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session(sessionConfig));

// ROUTES
app.use("/", indexRoutes);
app.use("/auth", authRoutes);
app.use("/user", checkAuth, userRoutes);
app.use("/profile", profileRoutes);



//ROBOTS
// app.get("/", (req, res) => {
//     Robot.find({}).toArray((err, foundRobot) => {
//         if (err) res.status(500).send(err);
//         res.render('index', {
//             robot: foundRobot
//         });
//         console.log(foundRobot);
//     });
// });

// app.get("/profile/:id", (req, res) => {
//     Robot.findOne({
//         _id: ObjectId(req.params.id)
//     }, function (err, foundRobot) {
//         if (err) res.status(500).send(err);
//         if (!foundRobot) res.send("No robot found");
//         // res.send(foundRobot);
//         res.render('profile', foundRobot);
//     });
// });

// app.get("/employed", (req, res) => {
//     Robot.find({
//         job: {
//             $ne: null
//         }
//     }).toArray((err, foundRobot) => {
//         if (err) res.status(500).send(err);
//         res.render('index', {
//             robot: foundRobot
//         })
//     });
// });

// app.get("/unemployed", (req, res) => {
//     Robot.find({
//         job: null
//     }).toArray((err, foundRobot) => {
//         if (err) res.status(500).send(err);
//         res.render('index', {
//             robot: foundRobot
//         })
//     });
// });


// //LOGIN
// app.get("/signup", (req, res) => {
//     res.render("signup"); 
// });

// app.post("/signup", (req, res) => {
//     let newRobot = req.body;

//     console.log("newRobot: ", newRobot);
//     robot.push(newRobot);
//     console.log("robot: ", robot);
//     res.redirect("/login");
// });

// app.get("/login", (req, res) => {
//     res.render("login");
// });

// app.post("/login", (req, res) => {
//     let reqUsername = req.body.username;
//     let reqPassword = req.body.password;

//     let foundRobot = users.find(robot => robot.username === reqUsername);
//     if (!foundRobot) {
//         return res.render("login", { errors: ["User not found"] });
//     }

//     if (foundRobot.password === reqPassword) {
//         delete foundRobot.password;
//         req.session.robot = foundRobot;
//         res.redirect("/");
//     }   else {
//         return res.render("login", { errors: ["Password does not match"] });    
//     }
// });


app.listen(8000, () => console.log('It works!'));

