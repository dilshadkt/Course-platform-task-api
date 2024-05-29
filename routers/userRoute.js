const router = require("express").Router();
const trycatch = require("../middleware/trycatch");
const {
  SignIn,
  LogIn,
  GetAllUsers,
  UpdateUser,
  DeleteUser,
} = require("../controller/userController");
const validate = require("../middleware/joivalidate");
const { userSchema } = require("../model/User");
const verifyAdmin = require("../middleware/verifyAdmin");
const verifyToken = require("../middleware/verifyToken");

router.post("/signin", validate(userSchema), trycatch(SignIn));
router.post("/login", trycatch(LogIn));
router.get("/", verifyToken, verifyAdmin, trycatch(GetAllUsers));
router.delete("/", verifyToken, verifyAdmin, trycatch(DeleteUser));
router.patch("/", verifyToken, verifyAdmin, trycatch(UpdateUser));

module.exports = router;
