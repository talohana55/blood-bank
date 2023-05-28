const mongoose = require("mongoose");
const { Schema } = mongoose;

const BloodUnitSchema = new Schema({
  bloodType: {
    type: String,
    enum: ["A+", "O+", "B+", "AB+", "A-", "O-", "B-", "AB-"],
    required: true,
  },
  units: {
    type: Number,
    required: true,
  },
});
const BloodUnit = mongoose.model("BloodUnit", BloodUnitSchema, "BloodUnit");
module.exports = BloodUnit;
