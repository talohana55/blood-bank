const mongoose = require("mongoose");

const HospitalSchema = new mongoose.Schema(
  {
    hospitalName: {
      type: String,
      unique: true,
      required: true,
    },
    hospitalCode: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Hospital = mongoose.model("Hospital", HospitalSchema, "Hospital");
module.exports = Hospital;
