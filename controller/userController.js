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

module.exports = { SignIn };
