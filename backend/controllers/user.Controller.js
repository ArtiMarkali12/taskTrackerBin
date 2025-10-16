// backend/controllers/user.controller.js
const adminModel = require("../models/admin.model");
const studentModel = require("../models/student.model");
const teacherModel = require("../models/teacher.model"); // ✅ Added
const userService = require("../services/user.service");
const jwt = require("jsonwebtoken");

// 1️⃣ Register user (Admin / Student / Teacher)
exports.registerUser = async (req, res) => {
  try {
    const {
      firstname,
      middlename,
      lastname,
      email,
      password,
      role,
      permissions,
      contactNumber,
      department,
      enrollmentNumber,
      className,
      year,
    } = req.body;

    // 🧩 Create base user
    const user = await userService.registerUser({
      firstname,
      middlename,
      lastname,
      email,
      password,
      role,
      contactNumber,
    });

    let profile = null;

    // 🧩 If Admin → create Admin profile
    if (user.role === "admin") {
      profile = await adminModel.create({
        user_id: user._id,
        department: department || "Computer Science",
        permissions:
          permissions || [
            "create_teacher",
            "create_student",
            "view_reports",
            "delete_user",
            "manage_tasks",
          ],
      });
    }

    // 🧩 If Student → create Student profile
    if (user.role === "student") {
      profile = await studentModel.create({
        user_id: user._id,
        enrollmentNumber,
        department,
        className,
        year,
      });
    }

    // 🧩 If Teacher → create Teacher profile
    if (user.role === "teacher") {
      profile = await teacherModel.create({
        user_id: user._id,
        department: department || "Computer Science",
        designation: "Assistant Professor",
        subjectsTaught: [],
      });
    }

    // 🪙 Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "defaultSecretKey",
      { expiresIn: "30d" }
    );

    // ✅ Response
    res.status(201).json({
      message: "✅ User registered successfully",
      user: {
        id: user._id,
        name: `${user.firstname} ${user.lastname}`,
        role: user.role,
        email: user.email,
      },
      profile,
      token,
    });
  } catch (err) {
    console.error("❌ Registration error:", err.message);
    res.status(500).json({ message: err.message });
  }
};

// 2️⃣ Login User
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.loginUser(email, password);

    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "defaultSecretKey",
      { expiresIn: "30d" }
    );

    res.json({
      message: "✅ Login successful",
      user: {
        id: user._id,
        name: `${user.firstname} ${user.lastname}`,
        role: user.role,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    console.error("❌ Login error:", err.message);
    res.status(500).json({ message: err.message });
  }
};

// 3️⃣ Get All Users (Admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
