const { isInteger, intersection } = require('lodash');
const mongoose = require('mongoose');
const InfoCovid = require('./InfoCovid');
const InfoGripe = require('./InfoGripe');
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true
        },
        lastName: {
            type: String,
            require: true
        },
        age: {
            type: Number,
            require: true
        },
        dni: {
            type: Number,
            require: true
        },
        email: {
            type: String,
            require: true
        },
        infoCovid: {
            type: ObjectId,
            ref: "InfoCovid",
            require: false
        },
        infoGripe: {
            type: ObjectId,
            ref: "InfoGripe",
            require: false
        },
    }
);

module.exports = mongoose.model("User", userSchema);