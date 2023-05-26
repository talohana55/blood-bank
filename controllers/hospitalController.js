const Hospital = require("../models/hospital-model");
const { saveLog } = require("./logger");

// Get all hospital's
exports.getAllHospitals = async (req, res) => {
  try {
    const hospital = await Hospital.find();
    if (hospital.length) {
      res.status(200).json(hospital);
    } else {
      res.status(200).json([]);
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Get a single hospital by code
exports.getHospitalByCode = async (req, res) => {
  try {
    const { hospitalCode } = req.params;
    const hospital = await Hospital.findOne({ hospitalCode });
    if (hospital) {
      res.status(200).json(hospital);
    } else {
      res.status(200).json();
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
//Create a new hospital
exports.createHospital = async (req, res) => {
  try {
    var ObjectID = require("mongodb").ObjectId;
    var objectId = new ObjectID();
    const hospital = new Hospital({
      cid: objectId,
      ...req.body,
    });
    await hospital.save();
    saveLog("createHospital", `Hospital id: ${hospital.cid}`);
    res.status(200).json(hospital);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
