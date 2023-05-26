const mongoose = require("mongoose");

const LogScheme = new mongoose.Schema({
  lid: {
    type: String,
    unique: true,
    required: true,
  },
  action: {
    type: String,
    unique: false,
    required: true,
  },
  args: {
    type: String,
    unique: false,
    required: false,
  },
  time: {
    type: Date,
    unique: false,
    required: true,
  },
});

const Log = mongoose.model('Log', LogScheme,"Log");
module.exports = Log;