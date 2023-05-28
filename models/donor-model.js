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
    healthCondition: {
      hasReceivedGrowthHormoneTreatment: {
        type: Boolean,
        default: false,
      },
      hasFamilyNeurologicalDisease: {
        type: Boolean,
        default: false,
      },
      hasStayedInUK: {
        type: Boolean,
        default: false,
      },
      hasReceivedPaymentForSex: {
        type: Boolean,
        default: false,
      },
      hasPartnerWithHIV: {
        type: Boolean,
        default: false,
      },
      isHemophiliaPatient: {
        type: Boolean,
        default: false,
      },
      hasUsedIllegalDrugs: {
        type: Boolean,
        default: false,
      },
      hasUsedInjectedOrSnortedDrugs: {
        type: Boolean,
        default: false,
      },
      isCarrierOfHepatitis: {
        type: Boolean,
        default: false,
      },
      hasStayedInHighPrevalenceAIDSCountry: {
        type: Boolean,
        default: false,
      },
      hasEngagedInSexBetweenMen: {
        type: Boolean,
        default: false,
      },
      hasEngagedInSexWithHighRiskPartners: {
        type: Boolean,
        default: false,
      },
    },
  },
  { timestamps: true }
);

const Donor = mongoose.model("Donor", DonorSchema, "Donor");
module.exports = Donor;
