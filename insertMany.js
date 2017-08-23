const express = require("express");
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const dbUrl = "mongodb://localhost:27017/robots";

const app = express();

let data = require('./data').users;

app.get("/insertMany", function (req, res) {

    MongoClient.connect(dbUrl, function (err, db) {
        if (err) {
            res.status(500).send(err);
        }

        //give a link to the collection you pass in
        let Robots = db.collection("robots");

        Robots.insertMany(data, function (err, savedUsers) {
            if (err) {
                res.status(500).send(err);
            }

            res.send(savedUsers);
            db.close();
        });
    });
});


app.listen(8000, () => console.log('It works!'));