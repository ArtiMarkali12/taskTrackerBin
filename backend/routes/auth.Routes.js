import express from "express";
import { loginUser, registerStudent } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", protect, registerStudent); // only admin can access

export default router;
