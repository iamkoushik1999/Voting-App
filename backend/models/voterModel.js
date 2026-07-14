const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const voterSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    voterId: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    isVoted: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

voterSchema.methods.getJWTToken = function () {
  return jwt.sign({ _id: this._id, role: "voter" }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
};

module.exports = mongoose.model("Voter", voterSchema);
