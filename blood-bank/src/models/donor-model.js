const mongoose = require("mongoose");

const DonorSchema = new mongoose.Schema(
  {
    cid: {
      type: String,
      unique: true,
      required: true,
    },
    ID: {
      type: String,
      unique: true,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const Donor = mongoose.model("Donor", DonorSchema, "Donor");
module.exports = Donor;
