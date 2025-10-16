// backend/controllers/user.controller.js
const bcrypt = require("bcrypt");
const adminModel = require("../models/admin.model");
const studentModel = require("../models/student.model");
const teacherModel = require("../models/teacher.model");
const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const jwt = require("jsonwebtoken");

// 🔐 Helper function to generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET || "defaultSecretKey",
    { expiresIn: "30d" }
  );
};

// 1️⃣ Register user (Admin / Student / Teacher)
exports.registerUser = async (req, res) => {
  try {
    const {
      firstname,
      middlename,
      lastname,
      email,
      password,
      designation,
      subjectsTaught,
      role,
      assignedTeachers,
      permissions,
      contactNumber,
      department,
      enrollmentNumber,
      course,
      batch,
    } = req.body;

    // Create main user
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

    // 👑 ADMIN PROFILE
    if (role === "admin") {
      profile = await adminModel.create({
        user_id: user._id,
        department: department || "Computer Science",
        permissions: permissions || [
          "create_teacher",
          "create_student",
          "view_reports",
          "delete_user",
          "manage_tasks",
        ],
      });
    }

    // 🎓 STUDENT PROFILE
    if (role === "student") {
      profile = await studentModel.create({
        user_id: user._id,
        enrollmentNumber,
        course,
        batch,
        assignedTeachers,
      });
    }

    // 👩‍🏫 TEACHER PROFILE
    if (role === "teacher") {
      profile = await teacherModel.create({
        user_id: user._id,
        department: department || "Information Technology",
        designation: designation || "Assistant Professor",
        subjectsTaught,
      });
    }

    // ✅ Generate token
    const token = generateToken(user);

    res.status(201).json({
      message: "✅ User registered successfully",
      token,
    });
  } catch (err) {
    console.error("❌ Registration error:", err.message);
    res.status(500).json({ message: err.message });
  }
};

// 2️⃣ Login User (Final Fixed)
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) throw new Error("User not found");
    const isMatch = await user.matchPassword(password);
    if (!isMatch) throw new Error("Invalid  password");

    const token = generateToken(user);

    res.status(200).json({
      message: "✅ Login successful",
      user: {
        id: user._id,
        name: `${user.fullname.firstname} ${user.fullname.lastname}`,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    console.error("❌ Login error:", err.message);

    // 🧠 Return 401 for invalid credentials, not 500
    if (
      err.message === "User not found" ||
      err.message === "Invalid email or password"
    ) {
      return res.status(401).json({ message: err.message });
    }

    // Any other error → 500
    res.status(500).json({ message: "Internal server error" });
  }
};

// 3️⃣ Get All Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
