const mongoose = require('mongoose');
const { Schema } = mongoose;

const BloodUnitSchema = new Schema({
    cid: {
        type: String,
        required: true,
        unique: true,
    },
    bloodType: {
        type: String,
        enum: ['A+', 'O+', 'B+', 'AB+', 'A-', 'O-', 'B-', 'AB-' ],
        required: true,
    },
    donorId: {
        type: String,
        required: true,
    },
    recipientId: {
        type: String,
        required: true,
    },
    collectionDate: {
        type: Date,
        required: true,
    },
    expiryDate: {
        type: Date,
        required: true,
    },
    isFrozen: {
        type: Boolean,
        required: true,
    }
});
const BloodUnit = mongoose.model('BloodUnit', BloodUnitSchema, "BloodUnit");
module.exports = BloodUnit;