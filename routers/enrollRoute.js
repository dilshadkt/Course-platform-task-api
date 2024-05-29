const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const {
  CreateEnrollment,
  GetEnrollments,
  DeleteEnrollment,
} = require("../controller/enrollControll");

router.post("/:courseId", verifyToken, CreateEnrollment);
router.get("/enrolled", verifyToken, GetEnrollments);
router.delete("/:courseId", verifyToken, DeleteEnrollment);

module.exports = router;
