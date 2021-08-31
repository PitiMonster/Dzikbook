const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');

const userRouter = require('./User/routes');
const requestRouter = require('./Request/routes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

// 1) GLOBAL MIDDLEWARES

// Set security HTTP headers
app.use(helmet());

// requests logging in development stage
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// limit requests from the same IP address
const limiter = rateLimit({
  max: 100,
  windowsMs: 60 * 60 * 1000, // 1 hour
  message:
    'Too many requests from this IP address, please try again for an hour',
});
app.use('/api', limiter);

// parse body to  req.body in JSON format
app.use(express.json());

// data sanitization against NoSQL query injection
app.use(mongoSanitize());

// 2) ROUTES
app.use('/api/v1/users', userRouter);
app.use('/api/v1/requests', requestRouter);

app.use('*', (req, res, next) =>
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))
);

app.use(globalErrorHandler);

module.exports = app;
