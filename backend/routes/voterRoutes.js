const express = require("express");
const router = express.Router();
const {
  getAllVoters,
  addVoter,
  deleteVoter,
  voterLogin,
  logout,
  profile,
  vote,
} = require("../controller/voterController");
const { isAdmin, isVoter } = require("../middleware/authMiddleware");
const { loginLimiter } = require("../middleware/rateLimiter");

// Admin-managed
router.get("/all", isAdmin, getAllVoters);
router.post("/add", isAdmin, addVoter);
router.delete("/delete/:id", isAdmin, deleteVoter);

// Voter self-service
router.post("/login", loginLimiter, voterLogin);
router.get("/logout", logout);
router.get("/me", isVoter, profile);
router.put("/vote/:id", isVoter, vote);

module.exports = router;
