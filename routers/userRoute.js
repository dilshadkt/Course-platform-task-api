const router = require("express").Router();
const trycatch = require("../middleware/trycatch");
const { SignIn } = require("../controller/userController");
const validate = require("../middleware/joivalidate");
const { userSchema } = require("../model/User");

router.post("/signin", validate(userSchema), trycatch(SignIn));

module.exports = router;
