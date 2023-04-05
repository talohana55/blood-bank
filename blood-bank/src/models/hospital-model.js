const mongoose = require("mongoose");

const HospitalSchema = new mongoose.Schema(
  {
    cid: {
      type: String,
      unique: true,
      require: true,
    },
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
  { timestamps: true, cid: false }
);

const Hospital = mongoose.model("Hospital", HospitalSchema, "Hospital");
module.exports = Hospital;
