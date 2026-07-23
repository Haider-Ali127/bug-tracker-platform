const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getProfile,
  getAllUsers,
} = require("../controllers/userController");

router.get("/profile", authMiddleware, getProfile);

router.get("/", authMiddleware, getAllUsers);

module.exports = router;