const mongoose = require("mongoose");
const { Schema } = mongoose;

const DonorSchema = new mongoose.Schema(
    {
        cid: {
            type: String,
            required: true,
            unique: true,
        },
        ID: {
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
        }
    }
)

const Donor = mongoose.model('Donor', DonorSchema, "Donor");
module.exports = Donor;
