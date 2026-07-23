const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    analyzeIssue,
} = require("../controllers/aiController");

router.post("/analyze", authMiddleware, analyzeIssue);

module.exports = router;