const VoterModel = require("../models/voterModel");
const CandidateModel = require("../models/candidateModel");
const ContactMessageModel = require("../models/contactMessageModel");

// Safe aggregate counts for the homepage - no PII.
exports.getStats = async (req, res) => {
  const [totalVoters, totalCandidates, totalVotesCast] = await Promise.all([
    VoterModel.countDocuments(),
    CandidateModel.countDocuments(),
    VoterModel.countDocuments({ isVoted: true }),
  ]);

  res.status(200).json({
    success: true,
    stats: { totalVoters, totalCandidates, totalVotesCast },
  });
};

exports.submitContactMessage = async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  await ContactMessageModel.create({ name, email, subject, message });

  res.status(201).json({
    success: true,
    message: "Thank you for reaching out. We'll get back to you soon.",
  });
};
