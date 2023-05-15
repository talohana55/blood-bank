const Donor = require("../models/donor-model");
const { saveLog } = require('./logger');

// Get all donors
exports.getAllDonors = async (req, res) => {
  try {
    const donors = await Donor.find();
    if (donors.length) {
      res.status(200).json(donors);
    } else {
      res.status(200).json([]);
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Get a single donor
exports.getDonor = async (req, res) => {
  try {
    const { ID } = req.params;
    const donor = await Donor.findOne({ ID });
    if (donor) {
      res.status(200).json(donor);
    } else {
      res.status(200).json();
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

//Create a new donor
exports.createDonor = async (req, res) => {
  try {
    var ObjectID = require("mongodb").ObjectId;
    var objectId = new ObjectID();
    const donor = new Donor({
      cid: objectId,
      ...req.body,
    });
    await donor.save();
    saveLog("createDonor", `Donor id: ${donor.cid}`);
    res.status(200).json(donor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a donor
exports.updateDonor = async (req, res) => {
  try {
    const donor = await Donor.findOneAndUpdate(
      { cid: req.body.cid },
      { ...req.body },
      { new: true }
    );
    if (donor) {
      console.log("OK!");
      saveLog("updateDonor", `Donor id: ${donor.cid}`);
      res.status(200).json("Donor updated successfully!");
    } else {
      console.log("problem");
      res.status(404).json({ message: err.message });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a donor
exports.deleteDonor = async (req, res) => {
  try {
    const { cid } = req.body;
    const donor = await Donor.deleteOne({ cid: cid });
    if (donor.deletedCount === 1) {
      console.log("OK!");
      saveLog("deleteDonor", `Donor id: ${donor.cid}`);
      res.status(200).json("Donor removed successfully!");
    } else {
      console.log("problem");
      res.status(404).json({ message: err.message });
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
