const CandidateModel = require("../models/candidateModel");

// Get All Candidates
exports.getAllCandidates = async (req, res) => {
  const allCandidates = await CandidateModel.find().sort({ candidateName: 1 });
  res.status(200).json({ success: true, allCandidates });
};

// Add Candidate
exports.addCandidate = async (req, res) => {
  const { candidateName, candidatePartyName } = req.body;
  if (!candidateName || !candidatePartyName) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const candidate = await CandidateModel.create({
    candidateName,
    candidatePartyName,
  });

  res.status(201).json({ success: true, message: "Candidate added", candidate });
};

// Delete Candidate
exports.deleteCandidate = async (req, res) => {
  const { id } = req.params;
  const candidate = await CandidateModel.findByIdAndDelete(id);
  if (!candidate) {
    res.status(404);
    throw new Error("No candidate found");
  }
  res.status(200).json({ success: true, message: "Candidate deleted" });
};
