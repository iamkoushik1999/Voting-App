const jwt = require("jsonwebtoken");
const AdminModel = require("../models/adminModel");
const VoterModel = require("../models/voterModel");

const isAdmin = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      res.status(401);
      throw new Error("You are not logged in as admin");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await AdminModel.findById(decoded._id);
    if (!admin) {
      res.status(401);
      throw new Error("Admin account not found");
    }

    req.admin = admin;
    next();
  } catch (error) {
    next(error);
  }
};

const isVoter = async (req, res, next) => {
  try {
    const { voterToken } = req.cookies;
    if (!voterToken) {
      res.status(401);
      throw new Error("You are not logged in as a voter");
    }

    const decoded = jwt.verify(voterToken, process.env.JWT_SECRET);
    const voter = await VoterModel.findById(decoded._id);
    if (!voter) {
      res.status(401);
      throw new Error("Voter account not found");
    }

    req.voter = voter;
    next();
  } catch (error) {
    next(error);
  }
};

// Allows either an admin or a logged-in voter (e.g. viewing candidates/results)
const isAdminOrVoter = async (req, res, next) => {
  if (req.cookies.token) return isAdmin(req, res, next);
  if (req.cookies.voterToken) return isVoter(req, res, next);
  res.status(401);
  next(new Error("Please log in to continue"));
};

module.exports = { isAdmin, isVoter, isAdminOrVoter };
