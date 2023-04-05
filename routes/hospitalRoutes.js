const express = require("express");

const {
  getAllHospitals,
  getHospitalByCode,
  createHospital,
} = require("../controllers/hospitalController");

const router = express.Router();

router.route("/api/hospital/get").get(getAllHospitals);
router.route("/api/hospital/get/:hospitalCode").get(getHospitalByCode);
router.route("/api/hospital/create").post(createHospital);

module.exports = router;
