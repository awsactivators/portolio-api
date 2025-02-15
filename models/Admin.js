const mongoose = require("mongoose");
const { scryptSync } = require("crypto");

const db = require("../db");

const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const Admin = mongoose.model("Admin", AdminSchema);

async function authenticateAdmin(username, pw) {
  await db.connect();
  let key = scryptSync(pw, process.env.SALT, 64);
  
  let result = await Admin.findOne({
    username: username,
    password: key.toString("base64")
  });

  // Returns true if admin exists, false otherwise
  return !!result; 
}

async function getAdmin(username) {
  await db.connect();
  
  let result = await Admin.findOne({ username });
  
  return result ? result : false;
}

async function addAdmin(username, pw) {
  await db.connect();
  
  let admin = await getAdmin(username);
  
  if (!admin) {
    let key = scryptSync(pw, process.env.SALT, 64);
    let newAdmin = new Admin({
      username: username,
      password: key.toString("base64")
    });

    let result = await newAdmin.save();
    
    // Returns true if successfully saved
    return result === newAdmin; 
  } else {
    // Admin already exists
    return false; 
  }
}

module.exports = {
  authenticateAdmin,
  getAdmin,
  addAdmin
};
