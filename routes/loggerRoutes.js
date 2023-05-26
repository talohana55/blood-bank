const express = require("express");

const { getLogs } = require("../controllers/logger");

const router = express.Router();

router.route("/logger").get(getLogs);

module.exports = router;
