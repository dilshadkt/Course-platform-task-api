const { isValidObjectId } = require("mongoose");
const { Enroll } = require("../model/Enroll");

const CreateEnrollment = async (req, res) => {
  const courseId = req.params.courseId;
  const userId = req.user;
  if (!isValidObjectId(courseId)) {
    return res.status(400).json({ success: false, error: "Invalid course ID" });
  }
  const enroll = new Enroll({
    student_id: userId,
    course_id: courseId,
    status: "enrolled",
  });
  await enroll.save();
  res.status(201).send(enroll);
};
const GetEnrollments = async (req, res) => {
  const enrolledCourse = await Enroll.find({
    student_id: req.user._id,
  })
    .populate("course_id")
    .select("course_id");
  res.status(200).json({ success: true, enrolled_course: enrolledCourse });
};

const DeleteEnrollment = async (req, res) => {
  const courseId = req.params.courseId;
  if (!isValidObjectId(courseId)) {
    return res.status(400).json({ success: false, error: "Invalid course ID" });
  }

  const enrollment = await Enroll.findOneAndDelete({
    student_id: req.user._id,
    _id: courseId,
  });

  if (!enrollment) {
    return res.status(404).send("There is no enrollment with this ID");
  }
  const enrolledCourse = await Enroll.find();
  res.status(200).json({ success: true, enroll: enrolledCourse });
};

module.exports = { CreateEnrollment, GetEnrollments, DeleteEnrollment };
