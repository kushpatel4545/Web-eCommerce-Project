const mongoose = require("mongoose");

const gUserSchema = new mongoose.Schema({
    username : String,
    userEmail : String,
    password : String,
    userPhoneNumber: Number,
    userShippingAddress : String,
});

const googleUser = mongoose.model("googleUser", gUserSchema);

module.exports = googleUser;