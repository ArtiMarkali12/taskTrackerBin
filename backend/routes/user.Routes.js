// backend/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  createStudent,
  getAllUsers
} = require("../controllers/user.Controller");
const { protect, isAdmin } = require("../middleware/auth.middleware");

// Open register route (use it once to create first admin)
// POST /api/users/register
router.post("/register", registerUser);

// POST /api/users/login
router.post("/login", loginUser);

// Admin-only create student
// POST /api/users/create-student
router.post("/create-student", protect, isAdmin, createStudent);

// GET /api/users (admin only)
router.get("/", protect, isAdmin, getAllUsers);

module.exports = router;
