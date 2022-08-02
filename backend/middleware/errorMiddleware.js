//  middleware are function that execute during the req res cycle
const errorHandler = (err, req, res, next) => {
  //next to call any further middleware
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack, // we want  our stack only in developement mode
  });
};
module.exports = {
  errorHandler,
};
