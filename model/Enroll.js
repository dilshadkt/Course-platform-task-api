const mongoose = require("mongoose");

const EnrollSchem = new mongoose.Schema(
  {
    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    status: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const Enroll = mongoose.model("Enroll", EnrollSchem);

module.exports = { Enroll };
