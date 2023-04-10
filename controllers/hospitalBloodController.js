const HospitalBlood = require("../models/hospitalBlood-model");
const Hospital = require("../models/hospital-model");
const BloodUnit = require("../models/bloodUnit-model");

exports.getAllHospitalBlood = async (req, res) => {
  try {
    const hospitalBlood = await HospitalBlood.find();
    if (hospitalBlood.length) {
      res.status(200).json(hospitalBlood);
    } else {
      res.status(200).json([]);
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.createHospitalBlood = async (req, res) => {
  try {
    console.log(req.body);
    const bloodUnit = await BloodUnit.findOne({
      bloodType: req.body.bloodType,
    });
    const hospital = await Hospital.findOne({
      hospitalCode: req.body.selectedHospital,
    });

    // Finding the best blood unit for the specified requested blood unit
    //Reduce blood unit quantity per request
    if (!bloodUnit) {
      return res.status(404).json({ message: "Blood Unit not found" });
    } else {
      if (bloodUnit.units < req.body.quantity) {
        return res.status(400).json({
          message: `Insufficient ${bloodUnit.bloodType} blood quantity`,
        });
      } else {
        const updatedBloodUnit = await BloodUnit.findOneAndUpdate(
          { bloodType: bloodUnit.bloodType },
          { units: bloodUnit.units - req.body.quantity },
          { new: true }
        );
        if (updatedBloodUnit) {
          console.log("Blood Unit updated successfully!");
        } else {
          console.log("Blood unit not found");
        }
      }
    }
    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }
    const hospitalBlood = new HospitalBlood({
      bloodType: req.body.bloodType,
      hospitalCode: hospital.hospitalCode,
      room: req.body.room,
      quantity: req.body.quantity,
    });
    await hospitalBlood.save();

    res.status(201).json(hospitalBlood);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getBloodTypesToReceive = (bloodType) => {
  const canReceiveFrom = {
    "A+": ["A+", "A-", "O+", "O-"],
    "O+": ["O+", "O-"],
    "B+": ["B+", "B-", "O+", "O-"],
    "AB+": ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    "A-": ["A-", "O-"],
    "O-": ["O-"],
    "B-": ["B-", "O-"],
    "AB-": ["AB-", "A-", "B-", "O-"],
  };
  if (!validBloodTypes.includes(bloodType)) {
    return [];
  }

  return canReceiveFrom[bloodType];
};

exports.getBloodTypesToDonate = (bloodType) => {
  const canDonateTo = {
    "A+": ["A+", "AB+"],
    "O+": ["O+", "A+", "B+", "AB+"],
    "B+": ["B+", "AB+"],
    "AB+": ["AB+"],
    "A-": ["A+", "A-", "AB+", "AB-"],
    "O-": ["A+", "B+", "AB+", "A-", "B-", "AB-", "O+", "O-"],
    "B-": ["B+", "B-", "AB+", "AB-"],
    "AB-": ["AB+", "AB-"],
  };

  if (!validBloodTypes.includes(bloodType)) {
    return [];
  }

  return canDonateTo[bloodType];
};
