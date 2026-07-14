const VoterModel = require("../models/voterModel");
const CandidateModel = require("../models/candidateModel");
const bcrypt = require("bcryptjs");
const { getNextSequence } = require("../models/counterModel");
const { sendTokenVoter } = require("../utils/sendToken");

// Get All Voters
exports.getAllVoters = async (req, res) => {
  const allVoters = await VoterModel.find().sort({ createdAt: -1 });
  res.status(200).json({ success: true, allVoters });
};

// Add Voter (admin sets the initial password; voterId is auto-generated)
exports.addVoter = async (req, res) => {
  const { name, mobile, password } = req.body;
  if (!name || !mobile || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  if (password.length < 8) {
    res.status(400);
    throw new Error("Password must be at least 8 characters");
  }

  const voterExists = await VoterModel.findOne({ mobile });
  if (voterExists) {
    res.status(400);
    throw new Error("A voter with this mobile number already exists");
  }

  const seq = await getNextSequence("voterId");
  const voterId = `V-${String(seq).padStart(6, "0")}`;
  const hashedPassword = await bcrypt.hash(password, 12);

  const voter = await VoterModel.create({
    name,
    mobile,
    voterId,
    password: hashedPassword,
    isVoted: false,
  });

  res.status(201).json({
    success: true,
    message: "Voter added",
    voter: {
      id: voter._id,
      name: voter.name,
      mobile: voter.mobile,
      voterId: voter.voterId,
      isVoted: voter.isVoted,
    },
    // Returned once so the admin can hand these credentials to the voter.
    generatedPassword: password,
  });
};

// Delete Voter
exports.deleteVoter = async (req, res) => {
  const { id } = req.params;
  const voter = await VoterModel.findByIdAndDelete(id);
  if (!voter) {
    res.status(404);
    throw new Error("No voter found");
  }
  res.status(200).json({ success: true, message: "Voter deleted" });
};

// Voter Login
exports.voterLogin = async (req, res) => {
  const { voterId, password } = req.body;
  if (!voterId || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const voter = await VoterModel.findOne({ voterId }).select("+password");
  if (!voter) {
    res.status(401);
    throw new Error("Voter not found. Ask the admin to register you.");
  }

  if (await bcrypt.compare(password, voter.password)) {
    sendTokenVoter(res, voter, "Welcome back", 200);
  } else {
    res.status(401);
    throw new Error("Incorrect credentials");
  }
};

// Voter Logout
exports.logout = async (req, res) => {
  res
    .status(200)
    .cookie("voterToken", null, { expires: new Date(Date.now()), httpOnly: true })
    .json({ success: true, message: "Logged out successfully" });
};

// Voter Profile
exports.profile = async (req, res) => {
  const voter = req.voter;
  res.status(200).json({
    success: true,
    voter: {
      id: voter._id,
      name: voter.name,
      voterId: voter.voterId,
      mobile: voter.mobile,
      isVoted: voter.isVoted,
    },
  });
};

// Vote. Both the "claim the ballot" and the tally increment are atomic
// single-document updates, so two concurrent requests from the same voter
// can't both succeed - and no link is stored between voter and candidate.
exports.vote = async (req, res) => {
  const { id } = req.params;

  const candidateExists = await CandidateModel.exists({ _id: id });
  if (!candidateExists) {
    res.status(404);
    throw new Error("Candidate not found");
  }

  const claimedBallot = await VoterModel.findOneAndUpdate(
    { _id: req.voter._id, isVoted: false },
    { isVoted: true }
  );
  if (!claimedBallot) {
    res.status(400);
    throw new Error("You have already voted");
  }

  await CandidateModel.findByIdAndUpdate(id, { $inc: { voteCount: 1 } });

  res.status(200).json({
    success: true,
    message: "Vote cast successfully. Thank you for your contribution.",
  });
};
