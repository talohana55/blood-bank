const mongoose = require("mongoose");

const UserScheme = new mongoose.Schema({
  uid: {
    type: String,
    unique: true,
    require: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    unique: false,
    required: true,
  },
  userType: {
    type: String,
    enum: ["Admin", "User", "Student"],
    default: "User",
    required: true,
    unique: false,
  },
});

const User = mongoose.model("User", UserScheme, "User");
module.exports = User;
