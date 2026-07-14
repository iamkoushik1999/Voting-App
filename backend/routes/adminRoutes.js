const express = require("express");
const router = express.Router();
const { logIn, logout, getAdminProfile } = require("../controller/adminController");
const { isAdmin } = require("../middleware/authMiddleware");
const { loginLimiter } = require("../middleware/rateLimiter");

router.post("/login", loginLimiter, logIn);
router.get("/logout", logout);
router.get("/me", isAdmin, getAdminProfile);

module.exports = router;
