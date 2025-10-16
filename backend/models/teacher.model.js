const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
  {
    // 🔗 Link to the main User document
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // one teacher per user
    },

    // 📘 Department the teacher belongs to
    department: {
      type: String,
      required: true,
      trim: true,
    },

    // 🧑‍🏫 Teacher's designation (default: Assistant Professor)
    designation: {
      type: String,
      default: "Assistant Professor",
      trim: true,
    },

    // 📚 Subjects taught by the teacher
    subjectsTaught: [
      {
        name: {
          type: String,
          required: true,
        },
        code: {
          type: String,
          required: true,
        },
      },
    ],

    // 👩‍🎓 Students managed/mentored by this teacher
    studentsUnder: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student", // connects to Student collection
      },
    ],

    // 🧑‍💼 Admin who created this teacher profile
    createdByAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Admin reference
    },
  },
  {
    timestamps: true,
    collection: "teachers", // ensures a separate "teachers" collection
  }
);

// ✅ Optional: helper method for debugging or API responses
teacherSchema.methods.getTeacherInfo = function () {
  return {
    id: this._id,
    department: this.department,
    designation: this.designation,
    subjectsCount: this.subjectsTaught.length,
  };
};

module.exports = mongoose.model("Teacher", teacherSchema);
