const BloodUnit = require("../models/bloodUnit-model");
const { ObjectId } = require("mongodb");
const { saveLog } = require("./logger");

// GET all blood units
exports.getAllBloodUnits = async (req, res) => {
  try {
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
    saveLog("createBloodUnit", `Blood Unit id: ${bloodUnit.cid}`);
    res.status(201).json(bloodUnit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT (update) an existing blood unit by type
exports.addBloodUnitByType = async (req, res) => {
  try {
    console.log(req.body);
    const { type, quantity } = req.body;
    const bloodUnit = await BloodUnit.findOneAndUpdate(
      { bloodType: type },
      { $inc: { units: quantity } }
    );
    if (bloodUnit) {
      saveLog(
        "addBloodUnitByType",
        `Blood Unit type: ${type}, quantity: ${quantity}`
      );
      res.status(200).json({
        message: `Blood unit ${bloodUnit.bloodType} added successfully`,
      });
    } else {
      res.status(404).json({ message: "Blood unit not found" });
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.subtractBloodUnitByType = async (req, res) => {
  try {
    console.log(req.body);
    const { type, quantity } = req.body;
    const bloodUnit = await BloodUnit.findOne({ bloodType: type });
    if (!bloodUnit) {
      return res.status(404).json({ message: `Blood unit ${type} not found` });
    }
    const updatedUnits = Math.max(0, bloodUnit.units - quantity);
    const updatedBloodUnit = await BloodUnit.findOneAndUpdate(
      { bloodType: type },
      { units: updatedUnits },
      { new: true }
    );
    saveLog(
      "subtractBloodUnitByType",
      `Blood Unit type: ${type}, quantity: ${quantity}, updated quantity: ${updatedUnits}`
    );
    res.status(200).json({
      message: `Blood unit ${type} subtracted successfully`,
      bloodUnit: updatedBloodUnit,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE a blood unit by ID
exports.deleteBloodUnitById = async (req, res) => {
  try {
    const { cid } = req.body;
    const bloodUnit = await BloodUnit.deleteOne({ cid: cid });
    if (bloodUnit.deletedCount === 1) {
      console.log("OK!");
      saveLog("deleteBloodUnitById", `Blood Unit type: ${type}`);
      res
        .status(200)
        .json(`Blood Unit  ${bloodUnit.bloodType} removed successfully!`);
    } else {
      console.log("problem");
      res.status(404).json({ message: err.message });
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Display O negative blood units
exports.displayONegativeBloodUnit = async (req, res) => {
  try {
    const bloodUnit = await BloodUnit.findOne({ bloodType: "O-" });

    if (bloodUnit) {
      res.status(200).json({ quantity: bloodUnit.units });
    } else {
      res.status(404).json({ message: "Blood unit not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET O negative blood units
exports.getONegativeBloodUnit = async (req, res) => {
  try {
    console.log("Hererere");
    const type = "O-";
    const bloodUnit = await BloodUnit.findOne({ bloodType: type });
    console.log(bloodUnit);
    if (!bloodUnit) {
      return res.status(404).json({ message: `Blood unit ${type} not found` });
    }
    const quantity = bloodUnit.units;
    bloodUnit.units = 0;
    await bloodUnit.save();
    res.status(200).json({
      message: `Withdrawn ${quantity} units of O- blood type successfully`,
      bloodUnit: bloodUnit,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
