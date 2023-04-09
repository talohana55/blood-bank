const express = require("express");

const {
  getAllHospitalBlood,
  createHospitalBlood,
} = require("../controllers/hospitalBloodController");

const router = express.Router();

router.route("/api/hospitalBlood/get").get(getAllHospitalBlood);
router.route("/api/hospitalBlood/create").post(createHospitalBlood);

module.exports = router;
