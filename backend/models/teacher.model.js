const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
  {
    // Reference to main User document
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // one user = one teacher profile
    },

    // Teacher-specific details
    department: {
      type: String,
      required: true,
    },

    designation: {
      type: String,
      default: "Assistant Professor",
    },

    subjectsTaught: [
      {
        name: String,
        code: String,
      },
    ],

    studentsUnder: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // reference to student users
      },
    ],

    createdByAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Admin reference
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Teacher", teacherSchema);
