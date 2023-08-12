const db = require("../common/db.js");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserScheme = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      enum: ["Admin", "User", "Student", "Worker"],
      default: "User",
      required: false,
    },
  },
  { timestamps: true }
);

UserScheme.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

UserScheme.methods.comparePassword = async function (password) {
  const user = this;
  try {
    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch;
  } catch (err) {
    return false;
  }
};

const User = db.model("User", UserScheme);

module.exports = User;
