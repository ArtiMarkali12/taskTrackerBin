const adminModel = require("../models/admin.model");
const userService = require("../services/user.service");
const jwt = require("jsonwebtoken");




// 1️⃣ Register user (open route)
exports.registerUser = async (req, res) => {
  try {
    const { firstname, middlename, lastname, email, password, role,permissions,contactNumber,department } = req.body;

    const user = await userService.registerUser({
      firstname,
      middlename,
      lastname,
      email,
      password,
      role,
      contactNumber
    });

let admin={};
    if(user.isAdmin()){
      admin= await adminModel.create({
        user_id:user._id,
        department,
        permissions
      })
    }

    res.status(201).json({
     
      designation: admin.designation,
  
      token:user.generateJWT(),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 2️⃣ Login user (admin/student)
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.loginUser(email, password);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

// 3️⃣ Admin creates student
exports.createStudent = async (req, res) => {
  try {
    const { name, email, password, username } = req.body;
    const student = await userService.createStudent({
      name,
      email,
      password,
      username,
    });

    res.status(201).json({
      message: "Student created successfully",
      student,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 4️⃣ Get all users (admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
