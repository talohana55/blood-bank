const BloodUnit = require("../models/bloodUnit-model");
const { ObjectId } = require("mongodb");

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
exports.getBloodUnitById = async (req, res) => {
  try {
    const { id } = req.body;
    const bloodUnit = await BloodUnit.findOne({ cid: id });
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
      collectionDate: new Date(req.body.collectionDate),
      expiryDate: new Date(req.body.expiryDate),
      ...req.body,
    });
    await bloodUnit.save();
    res.status(201).json(bloodUnit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT (update) an existing blood unit by ID
exports.updateBloodUnitById = async (req, res) => {
  try {
    const bloodUnit = await BloodUnit.findOneAndUpdate(
      { cid: req.body.cid },
      { ...req.body },
      { new: true }
    );
    if (bloodUnit) {
      console.log("OK!");
      res.status(200).json("Blood Unit updated successfully!");
    } else {
      console.log("problem");
      res.status(404).json({ message: err.message });
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
