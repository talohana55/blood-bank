const BloodUnit = require("../models/bloodUnit-model");
const { ObjectId } = require("mongodb");

// GET all blood units
exports.getAllBloodUnits = async (req, res) => {
  try {
    console.log("Here");
    const bloodUnits = await BloodUnit.find();
    if (bloodUnits.length) {
      res.status(200).json(bloodUnits);
    } else {
      res.status(200).json([]);
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// GET a single blood unit by ID
exports.getBloodUnitByType = async (req, res) => {
  try {
    const { type } = req.params;
    if (!["A+", "O+", "B+", "AB+", "A-", "O-", "B-", "AB-"].includes(type)) {
      return res.status(400).json({ message: "Invalid blood type" });
    }
    const bloodUnit = await BloodUnit.findOne({ bloodType: type });
    if (bloodUnit) {
      res.status(200).json(bloodUnit);
    } else {
      res.status(200).json();
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// POST a new blood unit
exports.createBloodUnit = async (req, res) => {
  try {
    var ObjectID = require("mongodb").ObjectId;
    var objectId = new ObjectID();
    const bloodUnit = new BloodUnit({
      cid: objectId,
      ...req.body,
    });
    await bloodUnit.save();
    res.status(201).json(bloodUnit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT (update) an existing blood unit by type
exports.updateBloodUnitByType = async (req, res) => {
  try {
    const { type, quantity } = req.body;

    console.log(type);
    const bloodUnit = await BloodUnit.findOneAndUpdate(
      { bloodType: type },
      { units: +quantity },
      { new: true }
    );
    console.log(bloodUnit);
    if (bloodUnit) {
      res.status(200).json("Blood Unit updated successfully!");
    } else {
      res.status(404).json({ message: "Blood unit not found" });
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// DELETE a blood unit by ID
exports.deleteBloodUnitById = async (req, res) => {
  try {
    const { cid } = req.body;
    const bloodUnit = await BloodUnit.deleteOne({ cid: cid });
    if (bloodUnit.deletedCount === 1) {
      console.log("OK!");
      res.status(200).json("Blood Unit removed successfully!");
    } else {
      console.log("problem");
      res.status(404).json({ message: err.message });
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
