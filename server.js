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
const employmentRoutes = require("./routes/employmentRoutes");
const mongoose = require("mongoose");
const bluebird = require("bluebird");
const bcrypt = require("bcryptjs");


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
app.use("/employment", employmentRoutes);
app.use("/login", authRoutes);
app.use("/signup", authRoutes);

//PORT
app.listen(8000, () => console.log('It works!'));

