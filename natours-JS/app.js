const morgan = require("morgan");
const express = require("express");
const tourRouter = require("./routes/tourRouter");
const userRouter = require("./routes/userRouter");

const app = express();

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
