const AppError = require('../utils/appError');

const hanldeCasteError22001 = () =>
  new AppError('the number of characteres is greater than expected', 400);

const sendErrorDev = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    return res.status(500).json({
      status: 'fail',
      message: 'something went very wrong',
    });
  }
};

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'fail';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  }

  if (process.env.NODE_ENV === 'production') {
    let error = err;

    if (err.parent?.code === '22001') error = hanldeCasteError22001();

    sendErrorProd(error, res);
  }
};

module.exports = globalErrorHandler;
