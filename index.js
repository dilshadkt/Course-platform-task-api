const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();
dotenv.config();
const userRoute = require("./routers/userRoute");

mongoose
  .connect(process.env.MONG_URL)
  .then(() => console.log("connection is good"))
  .catch((err) => console.log(err));

app.use(express.json());

app.use("/api/auth", userRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
