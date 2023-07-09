const Donor = require("../models/donor-model");
const { saveLog } = require("./logger");
const generateToken = require("../common/generateToken.js");
//Create a new donor
exports.createDonor = async (req, res) => {
  try {
    const {
      donorID,
      fullName,
      email,
      address,
      date,
      creditCard,
      healthCondition,
    } = req.body;
    const newDonor = new Donor({
      donorID,
      fullName,
      type: "Donor",
      email,
      address,
      date,
      creditCard,
      healthCondition,
    });
    const obj = {
      _id: newDonor.donorID,
      email: newDonor.email,
      type: "Donor",
    };
    const token = await generateToken(obj);
    const savedDonor = await newDonor.save();
    saveLog("createDonor", `Donor id: ${savedDonor.donorID}`);
    res.status(201).json({
      message: "Donor created successfully",
      donor: savedDonor,
      token,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
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
    const { id } = req.params;
    const donor = await Donor.findById({ _id: id });
    if (donor) {
      res.status(200).json(donor);
    } else {
      res.status(200).json();
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Update a donor
exports.updateDonor = async (req, res) => {
  try {
    const donor = await Donor.findOneAndUpdate(
      { _id: req.body._id },
      { ...req.body },
      { new: true }
    );
    if (donor) {
      console.log("OK!");
      saveLog("updateDonor", `Donor id: ${donor._id}`);
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
    const { _id } = req.body;
    const donor = await Donor.deleteOne({ _id });
    if (donor.deletedCount === 1) {
      console.log("OK!");
      saveLog("deleteDonor", `Donor id: ${donor._id}`);
      res.status(200).json("Donor removed successfully!");
    } else {
      console.log("problem");
      res.status(404).json({ message: err.message });
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
