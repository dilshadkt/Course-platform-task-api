const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const errorHandler = require("./middleware/ErrorHandler");
dotenv.config();
const userRoute = require("./routers/userRoute");
const courseRoute = require("./routers/courseRoute");
const enrollRoute = require("./routers/enrollRoute");
mongoose
  .connect(process.env.MONG_URL)
  .then(() => console.log("connection is good"))
  .catch((err) => console.log(err));
app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoute);
app.use("/api/course", courseRoute);
app.use("/api/enroll/", enrollRoute);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
