const BloodTransaction = require('../models/bloodTransaction-model');

// GET all blood units
exports.getAllBloodTransaction = async (req, res) => {
    try {
        const bloodTransaction = await BloodTransaction.find();
        res.status(200).json(bloodTransaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET a single blood unit by ID
exports.getBloodTransactionById = async (req, res) => {
    try {
        const bloodTransaction = await BloodTransaction.findById(req.params.cid);
        if (!bloodTransaction) {
            return res.status(404).json({ message: 'Blood unit not found' });
        }
        res.status(200).json(bloodTransaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST a new blood unit
exports.createBloodTransaction = async (req, res) => {
    const bloodTransaction = new BloodTransaction({
        bloodType: req.body.bloodType,
        donor: req.body.donor,
        recipient: req.body.recipient,
    });

    try {
        const newBloodTransaction = await BloodTransaction.save();
        res.status(201).json(newBloodTransaction);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// PUT (update) an existing blood unit by ID
exports.updateBloodTransactionById = async (req, res) => {
    try {
        const bloodTransaction = await BloodTransaction.findById(req.params.cid);
        if (!bloodTransaction) {
            return res.status(404).json({ message: 'Blood transaction not found' });
        }

        bloodTransaction.bloodType = req.body.bloodType || bloodTransaction.bloodType;
        bloodTransaction.donor = req.body.donor || bloodTransaction.donor;
        bloodTransaction.recipient = req.body.recipient || bloodTransaction.recipient;

        const updatedBloodTransaction = await bloodTransaction.save();
        res.status(200).json(updatedBloodTransaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE a blood unit by ID
exports.deleteBloodTransactionById = async (req, res) => {
    try {
        const bloodTransaction = await BloodTransaction.findById(req.params.cid);
        if (!bloodTransaction) {
            return res.status(404).json({ message: 'Blood transaction not found' });
        }
        await bloodTransaction.remove();
        res.status(200).json({ message: 'Blood transaction deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
