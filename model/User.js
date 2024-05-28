const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const UserSchem = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    userType: {
      type: String,
      enum: ["admin", "student"],
      default: "student",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

UserSchem.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, userType: this.userType },
    process.env.JWT_KEY
  );
  return token;
};
const User = mongoose.model("User", UserSchem);

////////  for validating the input data /////////
const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(16).required(),
  phone: Joi.string().optional(),
});
module.exports = { User, userSchema };
