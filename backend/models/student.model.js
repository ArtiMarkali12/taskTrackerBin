const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    enrollmentNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    department: {
      type: String,
      required: true,
    },

    className: {
      type: String,
      required: true,
    },

    year: {
      type: String,
      enum: ["First Year", "Second Year", "Third Year", "Final Year"],
      default: "First Year",
    },

    assignedTeacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    subjects: [
      {
        name: String,
        code: String,
      },
    ],

    tasksAssigned: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ],

    createdByAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true, collection: "students" } // ⬅ Explicitly name the collection
);

module.exports = mongoose.model("Student", studentSchema);
