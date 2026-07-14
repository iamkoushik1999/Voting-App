const AdminModel = require("../models/adminModel");
const bcrypt = require("bcryptjs");
const { sendToken } = require("../utils/sendToken");

// Admin Login
const logIn = async (req, res) => {
  const { adminName, adminPassword } = req.body;
  if (!adminName || !adminPassword) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const admin = await AdminModel.findOne({ adminName }).select("+adminPassword");
  if (!admin) {
    res.status(401);
    throw new Error("Incorrect credentials");
  }

  if (await bcrypt.compare(adminPassword, admin.adminPassword)) {
    sendToken(res, admin, "Welcome back", 200);
  } else {
    res.status(401);
    throw new Error("Incorrect credentials");
  }
};

// Logout
const logout = async (req, res) => {
  res
    .status(200)
    .cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })
    .json({ success: true, message: "Logged out successfully" });
};

// Admin Profile
const getAdminProfile = async (req, res) => {
  res.status(200).json({
    success: true,
    admin: { id: req.admin._id, adminName: req.admin.adminName },
  });
};

module.exports = {
  logIn,
  logout,
  getAdminProfile,
};
