const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

// 🧩 1️⃣ Register new user
exports.registerUser = async ({
  firstname,
  middlename,
  lastname,
  email,
  password,
  role,
  contactNumber,
}) => {
  // Check if email already exists
  const userExists = await User.findOne({ email });
  if (userExists) throw new Error("Email already registered");

  // ✅ Hash password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const user = await User.create({
    fullname: { firstname, middlename, lastname },
    email,
    password, // ✅ store hashed password
    role,
    contactNumber,
  });

  return user;
};




// 🧩 4️⃣ Get all users
exports.getAllUsers = async () => {
  const users = await User.find().select("-password"); // exclude password
  return users;
};
