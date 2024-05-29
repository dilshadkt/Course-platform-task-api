const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const verifyAdmin = require("../middleware/verifyAdmin");
const {
  CreateCourse,
  GetCourse,
  DeleteCourse,
  UpdateCourse,
} = require("../controller/courseController");
const { courseSchema } = require("../model/Course");
const validate = require("../middleware/joivalidate");

router.get("/", verifyToken, GetCourse);
router.post(
  "/",
  validate(courseSchema),
  verifyToken,
  verifyAdmin,
  CreateCourse
);
router.patch(
  "/:courseId",
  validate(courseSchema),
  verifyToken,
  verifyAdmin,
  UpdateCourse
);
router.delete("/:courseId", verifyToken, verifyAdmin, DeleteCourse);

module.exports = router;
