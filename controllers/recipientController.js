const Recipient = require('../models/recipient-model');

// Create a new recipient
exports.createRecipient = async (req, res) => {
    try {
        const recipient = new Recipient({
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
        const savedRecipient = await recipient.save();
        res.status(201).json(savedRecipient);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


// Get all recipients
exports.getAllRecipients = async (req, res) => {
    try {
        const recipients = await Recipient.find();
        res.json(recipients);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single recipient
exports.getRecipient = async (req, res) => {
    try {
        const recipient = await Recipient.findById(req.params.cid);
        if (!recipient) throw Error('Recipient not found');
        res.json(recipient);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

// Update a recipient
exports.updateRecipient = async (req, res) => {
    try {
        const recipient = await Recipient.findByIdAndUpdate(req.params.cid, req.body, { new: true });
        res.json(recipient);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a recipient
exports.deleteRecipient = async (req, res) => {
    try {
        const recipient = await Recipient.findByIdAndDelete(req.params.cid);
        res.json(recipient);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};
