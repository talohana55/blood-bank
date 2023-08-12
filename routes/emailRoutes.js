const express = require("express");

const { sendUrgentEmail } = require("../controllers/emailController");

const router = express.Router();

router.route("/emailApi/urgentEmail").post(sendUrgentEmail);

module.exports = router;
