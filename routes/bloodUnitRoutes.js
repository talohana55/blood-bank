const express = require("express");

const {
  getAllBloodUnits,
  getBloodUnitByType,
  createBloodUnit,
  addBloodUnitByType,
  deleteBloodUnitById,
  subtractBloodUnitByType,
  displayONegativeBloodUnit,
  getONegativeBloodUnit,
} = require("../controllers/bloodUnitController");

const router = express.Router();

router.route("/api/bloodUnits/get").get(getAllBloodUnits);
router.route("/api/bloodUnits/O_negative").get(displayONegativeBloodUnit);
router.route("/api/bloodUnits/get/:type").get(getBloodUnitByType);
router.route("/api/bloodUnits/create").post(createBloodUnit);
router.route("/api/bloodUnits/add/:type").put(addBloodUnitByType);
router.route("/api/bloodUnits/subtract/:type").put(subtractBloodUnitByType);
router.route("/api/bloodUnits/:id").delete(deleteBloodUnitById);
router.route("/api/bloodUnits/get/O_negative").post(getONegativeBloodUnit);

module.exports = router;
