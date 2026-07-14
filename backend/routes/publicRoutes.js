const express = require("express");
const router = express.Router();
const { getStats, submitContactMessage } = require("../controller/publicController");
const rateLimit = require("express-rate-limit");

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many messages sent. Please try again later." },
});

router.get("/stats", getStats);
router.post("/contact", contactLimiter, submitContactMessage);

module.exports = router;
