const mongoose = require("mongoose");
const { Schema } = mongoose;

const HospitalBloodSchema = new Schema(
  {
    bloodType: {
      type: String,
      enum: ["A+", "O+", "B+", "AB+", "A-", "O-", "B-", "AB-"],
      required: true,
    },
    hospitalCode: {
      type: String,
      required: true,
    },
    room: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const HospitalBlood = mongoose.model(
  "HospitalBlood",
  HospitalBloodSchema,
  "HospitalBlood"
);
module.exports = HospitalBlood;
