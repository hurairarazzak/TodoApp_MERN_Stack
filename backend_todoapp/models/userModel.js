const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true, match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."], },
    password: { type: String, required: true },
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;