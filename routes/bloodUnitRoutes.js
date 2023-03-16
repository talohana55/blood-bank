const express = require('express');

const {
    getAllBloodUnits,
    getBloodUnitById,
    createBloodUnit,
    updateBloodUnitById,
    deleteBloodUnitById
} = require("../controllers/bloodUnitController");


const router = express.Router();

router.route("/api/bloodUnits/get").get(getAllBloodUnits);
router.route("/api/bloodUnits/get/id").get(getBloodUnitById);
router.route("/api/bloodUnits/create").post(createBloodUnit);
router.route("/api/bloodUnits/:id").put(updateBloodUnitById);
router.route("/api/bloodUnits/:id").delete(deleteBloodUnitById);


module.exports = router;
