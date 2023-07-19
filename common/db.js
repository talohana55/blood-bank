const mongoose = require("mongoose");

const dbUrl = process.env.MONGO_URI;
const db = mongoose.createConnection(dbUrl, {
  maxPoolSize: 200,
});

module.exports = db;
