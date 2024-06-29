export const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV == "development") {
    sendErrorToDev(err, res);
  } else {
    sendErrorToProd(err, res);
  }
};

const sendErrorToDev = (err, res) => {
  res.status(err.statusCode).json({
    error: err,
    message: err.message,
    stack: err.stack, // (err.stack) tells me about the line of code where error happened
  });
};

const sendErrorToProd = (err, res) => {
  res.status(err.statusCode).json({
    message: err.message,
    status: err.status,
  });
};
