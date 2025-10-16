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

    course: {
      type: String,
      required: true,
    },

    batch: {
      type: String,
      default: "demo batch",
    },

  assignedTeachers: [{
    type: mongoose.Schema.Types.ObjectId,
    
    ref: "User",
  }],

    subjects: [
      {
        name: String,
        code: String,
      },
    ],

    tasksCompleted: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
  },
  { timestamps: true, collection: "students" } // ensures separate "students" collection
);

module.exports = mongoose.model("Student", studentSchema);
