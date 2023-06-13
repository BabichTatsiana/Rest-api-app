const ApiError = require("../exceptions/apiError")

async function errorHandler(err, req, res, next) {
  if (err instanceof ApiError) {
    res.status(err.status).json({
      error: {
        status: err.status,
        message: err.message,
        errors: err.errors,
      },
    });
  } else if (err instanceof Error) {
    console.error(err);
    res.status(500).json({
      error: {
        status: 500,
        message: "Internal Server Error",
      },
    });
  } else {
    next(err);
  }
}

module.exports = errorHandler;
