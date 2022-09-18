const CustomError = require("../errors/CustomError");

function customErrorHandler(err, req, res, next) {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      error: err.message,
    })
  }

  res.status(500).json({
    error: err.message,
  })
}

module.exports = customErrorHandler;