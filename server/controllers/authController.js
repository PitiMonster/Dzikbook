const SHA256 = require('crypto-js/sha256');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../User/model');
const AppError = require('./../utils/appError');

exports.protect = catchAsync((req, res, next) => {
  // 1) Check if token provided in headers
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }

  // 2) Verificate token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3 Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does not longer exists',
        401
      )
    );
  }

  // 4) Check if usser changed password afte the token was issued
  if (currentUser.passwordChangedAfter(decoded.iat)) {
    return next(
      new AppError(
        'User has changed the password recenly! Plase log in again',
        401
      )
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
});

exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to this action.', 403)
      );
    }
    next();
  };
