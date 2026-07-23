const roleMiddleware = require("../middleware/roleMiddleware");
const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    createIssue,
    getIssues,
    getIssueById,
    updateIssue,
    deleteIssue,
} = require("../controllers/issueController");

router.post("/", authMiddleware, createIssue);
router.get("/", authMiddleware, getIssues);
router.get("/:id", authMiddleware, getIssueById);
router.put("/:id", authMiddleware, updateIssue);
router.delete(
    "/:id",
    authMiddleware,
    deleteIssue
);
module.exports = router;