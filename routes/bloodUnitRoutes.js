const express = require("express");

const {
  getAllBloodUnits,
  getBloodUnitByType,
  createBloodUnit,
  updateBloodUnitByType,
  deleteBloodUnitById,
} = require("../controllers/bloodUnitController");

const router = express.Router();

router.route("/api/bloodUnits/get").get(getAllBloodUnits);
router.route("/api/bloodUnits/get/:type").get(getBloodUnitByType);
router.route("/api/bloodUnits/create").post(createBloodUnit);
router.route("/api/bloodUnits/update").put(updateBloodUnitByType);
router.route("/api/bloodUnits/:id").delete(deleteBloodUnitById);

module.exports = router;
