const BloodUnit = require('../models/bloodUnit-model');

// GET all blood units
exports.getAllBloodUnits = async (req, res) => {
    try {
        const bloodUnits = await BloodUnit.find();
        res.status(200).json(bloodUnits);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET a single blood unit by ID
exports.getBloodUnitById = async (req, res) => {
    try {
        const bloodUnit = await BloodUnit.findById(req.params.cid);
        if (!bloodUnit) {
            return res.status(404).json({ message: 'Blood unit not found' });
        }
        res.status(200).json(bloodUnit);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST a new blood unit
exports.createBloodUnit = async (req, res) => {
    const bloodUnit = new BloodUnit({
        bloodType: req.body.bloodType,
        collectionDate: req.body.collectionDate,
        expiryDate: req.body.expiryDate,
        isFrozen: req.body.isFrozen
    });

    try {
        const newBloodUnit = await bloodUnit.save();
        res.status(201).json(newBloodUnit);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// PUT (update) an existing blood unit by ID
exports.updateBloodUnitById = async (req, res) => {
    try {
        const bloodUnit = await BloodUnit.findById(req.params.cid);
        if (!bloodUnit) {
            return res.status(404).json({ message: 'Blood unit not found' });
        }

        bloodUnit.bloodType = req.body.bloodType || bloodUnit.bloodType;
        bloodUnit.collectionDate = req.body.collectionDate || bloodUnit.collectionDate;
        bloodUnit.expiryDate = req.body.expiryDate || bloodUnit.expiryDate;
        bloodUnit.isFrozen = req.body.isFrozen || bloodUnit.isFrozen;

        const updatedBloodUnit = await bloodUnit.save();
        res.status(200).json(updatedBloodUnit);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE a blood unit by ID
exports.deleteBloodUnitById = async (req, res) => {
    try {
        const bloodUnit = await BloodUnit.findById(req.params.cid);
        if (!bloodUnit) {
            return res.status(404).json({ message: 'Blood unit not found' });
        }
        await bloodUnit.remove();
        res.status(200).json({ message: 'Blood unit deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
