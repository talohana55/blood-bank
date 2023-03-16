const Donor = require('../models/donor-model');

// Create a new donor
exports.createDonor = async (req, res) => {
    try {
        const donor = new Donor({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            gender: req.body.gender,
            bloodType: req.body.bloodType,
            birthDate: req.body.birthDate,
            contactNumber: req.body.contactNumber,
            email: req.body.email,
            address: req.body.address,
            donations: req.body.donations
        });
        const savedDonor = await donor.save();
        res.status(201).json(savedDonor);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get all donors
exports.getAllDonors = async (req, res) => {
    try {
        const donors = await Donor.find();
        res.json(donors);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single donor
exports.getDonor = async (req, res) => {
    try {
        const donor = await Donor.findById(req.params.cid);
        if (!donor) throw Error('Donor not found');
        res.json(donor);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

// Update a donor
exports.updateDonor = async (req, res) => {
    try {
        const donor = await Donor.findByIdAndUpdate(req.params.cid, req.body, { new: true });
        res.json(donor);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a donor
exports.deleteDonor = async (req, res) => {
    try {
        const donor = await Donor.findByIdAndDelete(req.params.cid);
        res.json(donor);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};
