const bcrypt = require("bcrypt");
const { User } = require("../model/User");
const _ = require("lodash");

const SignIn = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const newUser = new User(_.pick(req.body, ["email", "name", "password"]));
  newUser.password = await bcrypt.hash(newUser.password, salt);
  await newUser.save();
  const token = newUser.generateAuthToken();
  const user = _.omit(newUser.toObject(), ["password"]);
  res.status(200).json({
    token,
    success: true,
    message: "Sgin-in successfully",
    user,
  });
};

const LogIn = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "email and password is required" });
  }
  const user = await User.findOne({ email });
  if (!user)
    return res.status(400).json({ error: "This user is not registered" });
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).send("Invalid email or password.");
  }
  const token = user.generateAuthToken();
  res.send({ token });
};
const GetAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  if (!users) {
    return res.status(404).json({
      success: false,
      message: "No users found",
    });
  }

  res.status(200).json({ success: true, users });
};
module.exports = { SignIn, LogIn, GetAllUsers };
