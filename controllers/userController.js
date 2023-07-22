const User = require("../models/user-model").default;
const generateToken = require("../common/generateToken.js");


exports.register = async (req, res) => {
  const { userName, password, type } = req.body;
  try {
    const existingUser = await User.findOne({ userName: userName });
    if (existingUser) {
      return res
        .status(401)
        .json({ success: false, error: "User already exists" });
    }

    const user = await User.create({
      userName,
      password,
      type,
    });
    if (user) {
      const obj = {
        _id: user._id,
        type: user.userType,
      };
      const token = await generateToken(obj);
      return res.status(200).json({ success: true, user, token });
    }
  } catch (err) {
    res.status(500).send({ success: false, error: err.message });
  }
};

exports.login = async (req, res) => {
  const { userName, password } = req.body;
  try {
    const user = await User.findOne({ userName, userType: "User" });
    if (!user || !(await user.comparePassword(password))) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid User Name or Password" });
    }
    const obj = {
      _id: user._id,
      type: user.userType,
    };
    const token = await generateToken(obj);
    return res.status(200).json({ success: true, user, token });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};
