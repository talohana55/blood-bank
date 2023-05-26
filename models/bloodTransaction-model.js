const mongoose = require("mongoose");
const { Schema } = mongoose;

const BloodTransactionSchema = new Schema(
  {
    bloodType: {
      type: String,
      enum: ["A+", "O+", "B+", "AB+", "A-", "O-", "B-", "AB-"],
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    donorID: {
      type: String,
      required: true,
    },
    splitTransaction: {
      wholeBlood: { type: Boolean, default: true },
      compressedSpherules: { type: Boolean },
      platelets: { type: Boolean },
      plasmaCryo: { type: Boolean },
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const BloodTransaction = mongoose.model(
  "BloodTransaction",
  BloodTransactionSchema,
  "BloodTransaction"
);
module.exports = BloodTransaction;
