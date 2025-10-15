const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  // Reference to the main User document
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // This links to userModel.js
    required: true,
    unique: true, // One user = one admin profile
  },

  // Additional fields specific to Admin
  department: {
    type: String,
    default: "Computer Science",
  },
  designation: {
    type: String,
    default: "Admin",
  },
  permissions: {
    type: [String],
    default: [
      "create_teacher",
      "create_student",
      "view_reports",
      "delete_user",
      "manage_tasks"
    ],
  },
  
  
  managedTeachers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  managedStudents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model("Admin", adminSchema);
