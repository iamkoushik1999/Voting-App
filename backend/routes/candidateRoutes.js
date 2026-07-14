const express = require("express");
const router = express.Router();
const { getAllCandidates, addCandidate, deleteCandidate } = require("../controller/candidateController");
const { isAdmin, isAdminOrVoter } = require("../middleware/authMiddleware");

// Voters and admins can both view candidates (voter needs it to cast a vote / see results)
router.get("/all", isAdminOrVoter, getAllCandidates);
router.post("/add", isAdmin, addCandidate);
router.delete("/delete/:id", isAdmin, deleteCandidate);

module.exports = router;
