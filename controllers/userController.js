const User = require("../models/user-model");
const bcrypt = require("bcrypt");

const BCRYT_SALT_ROUNDS = 10;

exports.registerAdminUser = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const user = User.findOne({ username: username });
    if (!user) {
      bcrypt.hash(password, BCRYT_SALT_ROUNDS).then((hashedPassword) => {
        const user = new User({
          username: username,
          password: hashedPassword,
          userType: "Admin",
        });
        user.save();
        res.status(200).json(user);
      });
    } else {
      res.status(400).json({ message: err.message });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.registerUserUser = async (req, res) => {
  try {
    
    const username = req.body.username;
    const password = req.body.password;
    const user = User.findOne({ username: username });
    if (!user) {
      bcrypt.hash(password, BCRYT_SALT_ROUNDS).then((hashedPassword) => {
        const user = new User({
          username: username,
          password: hashedPassword,
          userType: "User",
        });
        user.save();
        res.status(200).json(user);
      });
    } else {
      res.status(400).json({ message: err.message });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.registerStudentUser = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const user = User.findOne({ username: username });
    if (!user) {
      bcrypt.hash(password, BCRYT_SALT_ROUNDS).then((hashedPassword) => {
        const user = new User({
          username: username,
          password: hashedPassword,
          userType: "Student",
        });
        user.save();
        res.status(200).json(user);
      });
    } else {
      res.status(400).json({ message: err.message });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


exports.loginAdminUser = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const user = User.findOne({ username: username, userType: "Admin" });
    if (!user) {
      res.status(400).json({ message: err.message });
    } else {
      const samePassword = bcrypt.compare(password, user.password);
      if (!samePassword) {
        res.status(400).json({ message: err.message });
      } else {
        res.status(200).json(user);
      }
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.loginUserUser = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const user = User.findOne({ username: username, userType: "User" });
    if (!user) {
      res.status(400).json({ message: err.message });
    } else {
      const samePassword = bcrypt.compare(password, user.password);
      if (!samePassword) {
        res.status(400).json({ message: err.message });
      } else {
        res.status(200).json(user);
      }
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.loginStudentUser = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const user = User.findOne({ username: username, userType: "Student" });
    if (!user) {
      res.status(400).json({ message: err.message });
    } else {
      const samePassword = bcrypt.compare(password, user.password);
      if (!samePassword) {
        res.status(400).json({ message: err.message });
      } else {
        res.status(200).json(user);
      }
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
