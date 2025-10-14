// backend/models/userModel.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");




const userSchema = new mongoose.Schema({
  name: { type: String, required: true },  
  email: { type: String, required: true, unique: true },
  username: { type: String, unique: true }, // this attribute is cancelled
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "teacher", "student"], default: "student" }
}, { timestamps: true });

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getFullName = function () {
  const { firstname, middlename, lastname } = this.fullname;
  return [firstname, middlename, lastname].filter(Boolean).join(" ");
};


userSchema.methods.generateJWT = function () {
  return jwt.sign(
    { id: this._id, role: this.role, email: this.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

userSchema.methods.isAdmin = function () {
  return this.role === "admin";
};

userSchema.methods.isTeacher = function () {
  return this.role === "teacher";
};

userSchema.methods.isStudent = function () {
  return this.role === "student";
};



module.exports = mongoose.model("User", userSchema);
