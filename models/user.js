const mongoose = require("mongoose");

const User = mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    mobileNumber: {
        type: String,
        unique: true
    },
    name: String,
    password: String,
    otp: Number,
    oAuthToken: {
        type: String,
        default: null
    }
});

module.exports = mongoose.model("User", User);