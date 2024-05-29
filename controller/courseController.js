const { isValidObjectId } = require("mongoose");
const { Course } = require("../model/Course");
const _ = require("lodash");

///////////// CREATE A COURSE //////////
const CreateCourse = async (req, res) => {
  const newCourse = new Course(
    _.pick(req.body, [
      "name",
      "description",
      "duration",
      "start_date",
      "end_date",
      "instructor",
    ])
  );
  await newCourse.save();
  const courses = await Course.find();
  res.status(200).json({ success: true, courses });
};

//////// GET COURSES ////////////////
const GetCourse = async (req, res) => {
  const courses = await Course.find();
  res.status(200).json({ succss: true, courses });
};

////////// UPDATE COURSE ///////////////
const UpdateCourse = async (req, res) => {
  const courseId = req.params.courseId;
  if (!isValidObjectId(courseId)) {
    return res.status(400).json({ success: false, error: "Invalid course ID" });
  }
  const updatedCouse = await Course.findByIdAndUpdate(courseId, req.body, {
    new: true,
  });
  res.status(200).json({ success: true, course: updatedCouse });
};

//////////// DELETE COURESE /////////////
const DeleteCourse = async (req, res) => {
  const courseId = req.params.courseId;
  if (!isValidObjectId(courseId)) {
    return res.status(400).json({ success: false, error: "Invalid course ID" });
  }

  const course = await Course.findByIdAndDelete(courseId);
  if (!course) {
    return res.status(404).json({ success: false, error: "Course not found" });
  }
  res.status(200).json({ success: true, message: "successfully removed" });
};

module.exports = { CreateCourse, GetCourse, DeleteCourse, UpdateCourse };
