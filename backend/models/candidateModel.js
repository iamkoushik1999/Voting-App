const mongoose = require("mongoose");

const candidateSchema = mongoose.Schema(
  {
    candidateName: {
      type: String,
      required: true,
      trim: true,
    },
    candidatePartyName: {
      type: String,
      required: true,
      trim: true,
    },
    voteCount: {
      type: Number,
      default: 0,
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("Candidate", candidateSchema);
