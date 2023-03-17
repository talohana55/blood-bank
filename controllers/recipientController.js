const Recipient = require("../models/recipient-model");

// Get all recipients
exports.getAllRecipients = async (req, res) => {
  try {
    const recipients = await Recipient.find();
    if (recipients.length) {
      res.status(200).json(recipients);
    } else {
      res.status(200).json([]);
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Get a single recipient
exports.getRecipient = async (req, res) => {
  try {
    const { id } = req.body;
    const recipient = await Recipient.findOne({ cid: id });
    if (recipient) {
      res.status(200).json(recipient);
    } else {
      res.status(200).json();
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Create a new recipient
exports.createRecipient = async (req, res) => {
  try {
    var objectId = new ObjectId();
    const recipient = new Recipient({
      cid: objectId,
      birthDate: new Date(req.body.birthDate),
      ...req.body,
    });
    await recipient.save();
    res.status(201).json(recipient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a recipient
exports.updateRecipient = async (req, res) => {
  try {
    const recipient = await Recipient.findOneAndUpdate(
      { cid: req.body.cid },
      { ...req.body },
      { new: true }
    );
    if (recipient) {
      console.log("OK!");
      res.status(200).json("Recipient updated successfully!");
    } else {
      console.log("problem");
      res.status(404).json({ message: err.message });
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Delete a recipient
exports.deleteRecipient = async (req, res) => {
  try {
    const { cid } = req.body;
    const recipient = await Recipient.deleteOne({ cid: cid });
    if (recipient.deletedCount === 1) {
      console.log("OK!");
      res.status(200).json("Recipient removed successfully!");
    } else {
      console.log("problem");
      res.status(404).json({ message: err.message });
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
