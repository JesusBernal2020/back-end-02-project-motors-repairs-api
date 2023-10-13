const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const helmet = require('helmet');
const hpp = require('hpp');
const sanitizater = require('perfect-express-sanitizer');
const rateLimit = require('express-rate-limit');

//routes
const userRouter = require('./routes/user.route');
const repairsRouter = require('./routes/repairs.route');

//controllers
const globalErrorHandler = require('./controllers/error.controller');

const app = express();
const limiter = rateLimit({
  max: 10000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in hour!',
});

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(hpp());
app.use(
  sanitizater.clean({
    xss: true,
    noSql: true,
    sql: false, //obligatiriamente en false
  })
);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1', limiter);
//routes create
app.use('/api/v1/users', userRouter);
app.use('/api/v1/repairs', repairsRouter);

app.all('*', (req, res, next) => {
  return next(
    new AppError(`cant find ${req.originalUrl} on this server!`, 404)
  );
});

app.use(globalErrorHandler);

module.exports = app;
