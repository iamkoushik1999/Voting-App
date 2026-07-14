const express = require("express");
const router = express.Router();
const { getAllMessages } = require("../controller/messageController");
const { isAdmin } = require("../middleware/authMiddleware");

router.get("/all", isAdmin, getAllMessages);

module.exports = router;
