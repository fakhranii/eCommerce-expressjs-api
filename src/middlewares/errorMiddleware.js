import { ApiError } from "../utils/classes/apiError.js";

const sendErrorToDev = (err, res) =>
  res.status(err.statusCode).json({
    error: err,
    message: err.message,
    stack: err.stack, // (err.stack) tells me about the line of code where error happened
  });

const sendErrorToProd = (err, res) =>
  res.status(err.statusCode).json({
    message: err.message,
    status: err.status,
  });

const handleJwtInvalidSignature = () =>
  new ApiError("Invalid token, please login again..", 401);

const handleJwtExpired = () =>
  new ApiError("Expired token, please login again..", 401);

export const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV == "development") {
    sendErrorToDev(err, res);
  } else {
    if (err.name === "JsonWebTokenError") err = handleJwtInvalidSignature();
    if (err.name === "TokenExpiredError") err = handleJwtExpired();

    sendErrorToProd(err, res);
  }
};
