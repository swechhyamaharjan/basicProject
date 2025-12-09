const errorHandler = (error, req, res, next) => {
  let statusCode = error.status || 500;
  let errorMessage = error.message || "Internal Server Error!!"
  res.status(statusCode).send(errorMessage);
}

export default errorHandler;