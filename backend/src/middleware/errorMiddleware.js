export const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Not Found: Cannot ${req.method} ${req.originalUrl}`,
  });
};

export const errorHandler = (err, req, res, next) => {
  console.error(`[Error] ${req.method} ${req.originalUrl} - ${err.message}`);

  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || "Internal Server Error";

  // Mongoose CastError (bad ObjectId)
  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 400;
    message = `Invalid resource ID format: ${err.value}`;
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue || {})[0] || "field";
    message = `An account or record with that ${field} already exists.`;
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    statusCode = 422;
    const errors = Object.values(err.errors).map((e) => e.message);
    message = errors.join(". ");
  }

  // Multer file upload errors
  if (err.code === "LIMIT_FILE_SIZE") {
    statusCode = 400;
    message = "Uploaded file exceeds the 5MB size limit.";
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};