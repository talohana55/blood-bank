const BloodTransaction = require("../models/bloodTransaction-model");
const Donor = require("../models/donor-model");
const { saveLog } = require("./logger");

// GET all blood units
exports.getAllBloodTransaction = async (req, res) => {
  try {
    const bloodTransaction = await BloodTransaction.find();
    if (bloodTransaction.length) {
      res.status(200).json(bloodTransaction);
    } else {
      res.status(200).json([]);
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// GET a single blood unit by ID
exports.getBloodTransactionById = async (req, res) => {
  try {
    const { id } = req.body;
    const bloodTransaction = await BloodTransaction.findOne({ _id: id });
    if (!bloodTransaction) {
      res.status(200).json(bloodTransaction);
    } else {
      res.status(200).json();
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// GET all blood transactions by Donor Id
exports.getBloodTransactionByUserId = async (req, res) => {
  try {
    const { donorId } = req.body;
    const bloodTransactions = await BloodTransaction.find({ donorID: donorId });
    if (!bloodTransactions) {
      res.status(200).json(bloodTransactions);
    } else {
      res.status(200).json();
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// GET all donors by blood type
exports.getDonorsByBloodType = async (req, res) => {
  try {
    const { bloodType } = req.params;
    const bloodTransactionsPromise = await BloodTransaction.find({
      bloodType: bloodType,
    });

    let donorIds = bloodTransactionsPromise.map(
      (transaction) => transaction["donorID"]
    );
    donorIds = Array.from(new Set(donorIds));

    let promises = donorIds.map((id) =>
      Donor.find({ donorID: id }).select("donorID fullName email")
    );
    let donors = await Promise.all(promises);
    donors = donors.filter((donor) => donor.length != 0);
    console.log(donors);
    if (donors) {
      res.status(200).json(donors);
    } else {
      res.status(200).json([]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// POST a new blood transaction
exports.createBloodTransaction = async (req, res) => {
  try {
    const donor = await Donor.findOne({ ID: req.body.donorID });
    if (!donor) {
      return res.status(404).json({ message: "Donor not found" });
    }
    const bloodTransaction = new BloodTransaction({
      bloodType: req.body.bloodType,
      date: req.body.date,
      donorID: donor.ID,
      quantity: req.body.quantity,
    });
    await bloodTransaction.save();
    saveLog(
      "createBloodTransaction",
      `Donor id: ${bloodTransaction.donorID} ,Blood Type: ${bloodTransaction.bloodType}, quantity: ${bloodTransaction.quantity}`
    );
    res.status(201).json(bloodTransaction);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT (update) an existing blood unit by ID
exports.updateBloodTransactionById = async (req, res) => {
  try {
    const bloodTransaction = await BloodTransaction.findOneAndUpdate(
      { cid: req.body.cid },
      { ...req.body },
      { new: true }
    );
    if (bloodTransaction) {
      console.log("OK!");
      saveLog(
        "updateBloodTransactionById",
        `Blood Transaction id: ${bloodTransaction.cid}`
      );
      res.status(200).json("blood Transaction  updated successfully!");
    } else {
      console.log("problem");
      res.status(404).json({ message: err.message });
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// DELETE a blood unit by ID
exports.deleteBloodTransactionById = async (req, res) => {
  try {
    const { cid } = req.body;
    const bloodTransaction = await BloodTransaction.deleteOne({ cid: cid });
    if (bloodTransaction.deletedCount === 1) {
      console.log("OK!");
      saveLog(
        "deleteBloodTransactionById",
        `Blood Transaction id: ${bloodTransaction.cid}`
      );
      res.status(200).json("blood Transaction removed successfully!");
    } else {
      console.log("problem");
      res.status(404).json({ message: err.message });
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
