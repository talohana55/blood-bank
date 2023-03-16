const mongoose = require("mongoose");
const { Schema } = mongoose;

const DonorSchema = new mongoose.Schema(
    {
        cid: {
            type: String,
            required: true,
            unique: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        bloodType: {
            type: String,
            required: true,
        },
        birthDate: {
            type: Date,
            required: true,
        },
        contactNumber: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        donations: [{ type: Schema.Types.ObjectId, ref: 'BloodUnitSchema' }]

    }
)

const Donor = mongoose.model('Donor', DonorSchema, "Donor");
module.exports = Donor;
