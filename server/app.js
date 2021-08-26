const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');

const userRouter = require('./User/routes');

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

module.exports = app;
