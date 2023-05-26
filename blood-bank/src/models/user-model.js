const mongoose = require("mongoose");

const UserScheme = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserScheme, "User");
module.exports = User;
