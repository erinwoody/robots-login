const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const robotSchema = new Schema({

    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    avatar: String,
    password: {
        type: String,
        required: true
    },
    address: {
        city: String,
        country: String
    },
    job: String,
    company: String,
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
    },
    university: String,
    skills: Array,

});

module.exports = mongoose.model("Robot", robotSchema);
