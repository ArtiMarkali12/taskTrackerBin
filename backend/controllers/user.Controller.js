// backend/controllers/userController.js
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

// Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "secretKey", { expiresIn: "30d" });
};

// 1) Open register - use this once to create first admin (or you can create admin directly in DB)
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role, username } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "Email already registered" });

    const user = await User.create({ name, email, username, password, role });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 2) Login (admin or student)
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 3) Admin creates student (protected route)
exports.createStudent = async (req, res) => {
  try {
    const { name, email, password, username } = req.body;

    // only admin allowed (middleware already checks)
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });

    const student = await User.create({
      name,
      email,
      username,
      password,
      role: "student",
    });

    res.status(201).json({
      message: "Student created",
      student: {
        _id: student._id,
        name: student.name,
        email: student.email,
        username: student.username,
        role: student.role
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 4) Admin: list all users (protected)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
