module.exports = function (err, req, res, next) {
  if (err.name === "MongoServerError" && err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return res.status(400).json({
      error: `This email is already exist`,
    });
  } else {
    res.status(500).send("server err occurred");
  }
  next();
};
