const mongoose = require("mongoose");

const { DBUSER, DBPWD, DBHOST, DBNAME } = process.env;

if (!DBUSER || !DBPWD || !DBHOST || !DBNAME) {
  console.error("ERROR: One or more database environment variables are missing.");
  process.exit(1);
}

const dbUrl = `mongodb+srv://${DBUSER}:${DBPWD}@${DBHOST}/${DBNAME}?retryWrites=true&w=majority`;

async function connect() {
  try {
    await mongoose.connect(dbUrl);
    console.log("MongoDB connected successfully.");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
}

module.exports = { connect };
