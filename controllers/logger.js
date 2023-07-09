const Log = require("../models/log-model");
const fs = require("fs");
const path = require("path");

exports.saveLog = async (action, args) => {
  const log = new Log({
    lid: new mongoose.Types.ObjectId(),
    action: action,
    args: args,
    time: new Date(),
  });

  try {
    await log.save();
    console.log(`Log: ${action} ${log.time} Saved!`);
    return { success: true, message: `Log: ${action} ${log.time} Saved!` };
  } catch (err) {
    console.log(err.message);
    return { success: false, message: err.message };
  }
};


exports.getLogs = async (req, res) => {
  try {
    console.log("Fetching logs...");
    const start = Date.now();
    const logs = await Log.find({});
    console.log(`Logs fetched in ${Date.now() - start} ms`);

    let response = "";
    logs.forEach(function (log, index) {
      console.log(`Processing log ${index + 1} of ${logs.length}`);
      let timeString = `${log.time.getDate()}-${log.time.getMonth()}-${log.time.getFullYear()} ${log.time.getHours()}:${log.time.getMinutes()}:${log.time.getSeconds()}`;
      let logContent = `${timeString}: Function:${log.action}, Arguments:${log.args}\n`;
      console.log(log);

      writeFileRecursive("log.txt", logContent);
      response += logContent;
    });

    res.json({
      success: true,
      message: "Logs fetched successfully",
      data: response,
    });
  } catch (err) {
    console.error("Failed to fetch logs:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

const writeFileRecursive = (file, data) => {
  try {
    const dirname = path.dirname(file);
    if (!fs.existsSync(dirname)) {
      fs.mkdirSync(dirname, { recursive: true });
    }
    fs.writeFileSync(file, data, { flag: "a" });
    console.log("Log file written successfully");
  } catch (err) {
    console.error(`Error writing to file: ${err.message}`);
  }
};
