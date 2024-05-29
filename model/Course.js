const mongoose = require("mongoose");
const Joi = require("joi");

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    instructor: { type: String, required: true },
    // capacity: { type: Number, required: true },
  })
);

////////  for validating the input data /////////
const courseSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  description: Joi.string().required(),
  duration: Joi.number().required(),
  start_date: Joi.date().required(),
  end_date: Joi.date().required(),
  instructor: Joi.string().required(),
  // capacity: Joi.number().required(),
});

module.exports = { courseSchema, Course };
