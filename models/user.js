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
    accessToken: String
});

module.exports = mongoose.model("User", User);