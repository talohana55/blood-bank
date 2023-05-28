const express = require("express");

const {
  getAllDonors,
  getDonor,
  createDonor,
  updateDonor,
  deleteDonor,
} = require("../controllers/donorController");

const router = express.Router();

router.route("/api/donor/donors").get(getAllDonors);
router.route("/api/donor/get/:id").get(getDonor);
router.route("/api/donor/create").post(createDonor);
router.route("/api/donor/update/:id").put(updateDonor);
router.route("/api/donor/delete/:id").delete(deleteDonor);

module.exports = router;
