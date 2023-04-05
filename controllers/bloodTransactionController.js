const BloodTransaction = require("../models/bloodTransaction-model");
const Donor = require("../models/donor-model");

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
    const bloodTransaction = await BloodTransaction.findOne({ cid: id });
    if (!bloodTransaction) {
      res.status(200).json(bloodTransaction);
    } else {
      res.status(200).json();
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// POST a new blood transaction
exports.createBloodTransaction = async (req, res) => {
  try {
    const donor = await Donor.findOne({ ID: req.body.donorID });
    if (!donor) {
      console.log("NOT Found");
      return res.status(404).json({ message: "Donor not found" });
    }
    const bloodTransaction = new BloodTransaction({
      bloodType: req.body.bloodType,
      date: req.body.date,
      donorID: donor.ID,
      quantity: req.body.quantity,
    });
    await bloodTransaction.save();

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
      res.status(200).json("blood Transaction removed successfully!");
    } else {
      console.log("problem");
      res.status(404).json({ message: err.message });
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
