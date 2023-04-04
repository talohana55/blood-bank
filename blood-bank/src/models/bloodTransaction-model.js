const mongoose = require("mongoose");
const { Schema } = mongoose;
const { DonorSchema } = require("./donor-model");
const Donor = mongoose.model("Donor", DonorSchema);

const BloodTransactionSchema = new Schema({
  cid: {
    type: String,
    required: true,
    unique: true,
  },
  bloodType: {
    type: String,
    enum: ["A+", "O+", "B+", "AB+", "A-", "O-", "B-", "AB-"],
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Donor",
    required: true,
  },
});

const BloodTransaction = mongoose.model(
  "BloodTransaction",
  BloodTransactionSchema,
  "BloodTransaction"
);
module.exports = BloodTransaction;
