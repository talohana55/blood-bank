const express = require("express");

const {
  getAllDonors,
  getDonor,
  createDonor,
  updateDonor,
  deleteDonor,
} = require("../controllers/donorController");

const router = express.Router();

router.route("/api/donors/get").get(getAllDonors);
router.route("/api/donors/get/:ID").get(getDonor);
router.route("/api/donors/create").post(createDonor);
router.route("/api/donors/:id").put(updateDonor);
router.route("/api/donors/:id").delete(deleteDonor);

module.exports = router;
