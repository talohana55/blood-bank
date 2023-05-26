const Log = require("../models/log-model");
const fs = require("fs");
const { ObjectId } = require("mongodb");
const path = require("path");

exports.saveLog = async (action, args) => {
  var ObjectID = require("mongodb").ObjectId;
  var objectId = new ObjectID();
  let time = new Date();
  const log = new Log({
    lid: objectId,
    action: action,
    args: args,
    time: time,
  });
  try {
    await log.save();
    console.log(`Log: ${action} ${time} Saved!`);
  } catch (err) {
    console.log(err.message);
  }
};

exports.getLogs = () => {
  Log.find({}, function (err, logs) {
    if (err) {
      console.error("Failed to fetch logs:", err);
      return;
    }

    // Using forEach
    logs.forEach(function (log) {
      // Process each log here
      let timeString = `${log.time.getDate()}-${log.time.getMonth()}-${log.time.getFullYear()} ${log.time.getHours()}:${log.time.getMinutes()}:${log.time.getSeconds()}`;
      let logContent = `${timeString}: Function:${log.action}, Arguments:${log.args}\n`;
      console.log(log);

      writeFileRecursive("log.txt", logContent);
    });
  });
};

const writeFileRecursive = (file, data) => {
  const dirname = path.dirname(file);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }
  fs.writeFileSync(file, data, { flag: "a" });
};
