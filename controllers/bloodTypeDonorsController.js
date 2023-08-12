const BloodTransaction = require("../models/bloodTransaction-model");

exports.getDonors = async (req, res) => {
  const { bloodType } = req.body;

  try {
    const bloodTransactions = BloodTransaction.find({
      bloodType: bloodType,
    }).then((result) => {
      console.log(result);
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
