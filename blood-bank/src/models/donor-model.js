const mongoose = require("mongoose");

const DonorSchema = new mongoose.Schema(
  {
    donorID: {
      type: String,
      unique: true,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    date: {
      type: Date,
      required: true,
    },
    healthCondition: {
      type: Boolean,
    },
    creditCard: {
      cardNumber: {
        type: String,
        required: true,
        unique: true,
      },
      cardHolderName: {
        type: String,
        required: true,
      },
      expirationDate: {
        type: Date,
        required: true,
      },
      cvv: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

const Donor = mongoose.model("Donor", DonorSchema, "Donor");
module.exports = Donor;
