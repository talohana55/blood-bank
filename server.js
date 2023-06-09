const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 8080;

app.use(express.static(__dirname + "/blood-bank/dist/blood-bank"));

// All Routes
const bloodUnitsRoutes = require("./routes/bloodUnitRoutes");
const bloodTransactionsRoutes = require("./routes/bloodTransactionRoutes");
const donorsRoutes = require("./routes/donorRoutes");
const hospitalRoutes = require("./routes/hospitalRoutes");
const hospitalBloodRoutes = require("./routes/hospitalBloodRoutes");
const loggerRoutes = require("./routes/loggerRoutes");
const authRoutes = require("./routes/authRoutes");

// Use routes
app.use(bloodUnitsRoutes);
app.use(bloodTransactionsRoutes);
app.use(donorsRoutes);
app.use(hospitalRoutes);
app.use(hospitalBloodRoutes);
app.use(loggerRoutes);
app.use(authRoutes);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
  );
  next();
});

require("dotenv").config();
// Set the `strictQuery` option to `false`
mongoose.set("strictQuery", false);
const uri = process.env.MONGO_URI;
async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
}
connect();

app.listen(PORT, console.log(`The server is running on port: ${PORT}`));
