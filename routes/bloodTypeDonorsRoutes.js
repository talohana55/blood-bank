const express = require("express");

const { getDonors } = require("../controllers/bloodTypeDonorsController");

const router = express.Router();

router.route("/bloodtypes").get(getDonors);

module.exports = router;