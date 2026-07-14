const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const adminSchema = mongoose.Schema(
  {
    adminName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    adminPassword: {
      type: String,
      required: true,
      select: false,
    },
  },
  { versionKey: false, timestamps: true }
);

adminSchema.methods.getJWTToken = function () {
  return jwt.sign({ _id: this._id, role: "admin" }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
};

module.exports = mongoose.model("Admin", adminSchema);
