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
}) => {
  const userExists = await User.findOne({ email });
  if (userExists) throw new Error("Email already registered");

  // const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    fullname: { firstname, middlename, lastname },
    email,
    password,
    role,
  });

  return user;
};

// 🧩 2️⃣ Login user
exports.loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid email or password");

  return user;
};

// 🧩 3️⃣ Create student (by admin)
exports.createStudent = async ({ name, email, password, username }) => {
  const exists = await User.findOne({ email });
  if (exists) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  const student = await User.create({
    name,
    email,
    username,
    password: hashedPassword,
    role: "student",
  });

  // Return only selected fields
  return {
    _id: student._id,
    name: student.name,
    email: student.email,
    username: student.username,
    role: student.role,
  };
};

// 🧩 4️⃣ Get all users
exports.getAllUsers = async () => {
  const users = await User.find().select("-password");
  return users;
};
