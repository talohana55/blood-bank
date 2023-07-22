const express = require('express');

const {
    getAllBloodTransaction,
    getBloodTransactionById,
    createBloodTransaction,
    updateBloodTransactionById,
    deleteBloodTransactionById,
} = require("../controllers/bloodTransactionController");


const router = express.Router();

router.route("/api/bloodTransaction/get").get(getAllBloodTransaction);
router.route("/api/bloodTransaction/get/id").get(getBloodTransactionById);
router.route("/api/bloodTransaction/create").post(createBloodTransaction);
router.route("/api/bloodTransaction/:id").put(updateBloodTransactionById);
router.route("/api/bloodTransaction/:id").delete(deleteBloodTransactionById);


module.exports = router;
