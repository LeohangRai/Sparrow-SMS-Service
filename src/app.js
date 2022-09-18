require('module-alias/register');
const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const bodyParser = require("body-parser");
const customErrorHandler = require("@middlewares/errorHandler");
const CustomError = require("./errors/CustomError");
const app = express();
const {smsRoutes} = require('@routes');

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.json({
    code: 200,
    msg: "Welcome to Sparrow sms service demo!",
    error: false,
  })
})

// List Of All Routes
app.use("/sms", smsRoutes);

// for undefined routes
app.use((req, res, next) => {
  next(CustomError.notFound("Not found"));
})

// error handler middleware
app.use(customErrorHandler)

module.exports = app;