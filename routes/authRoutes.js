const express = require("express");
const { register, login } = require("../controllers/userController");

const router = express.Router();

router.route("/api/auth/register").post(register);
router.route("/api/auth/login").post(login);

module.exports = router;
