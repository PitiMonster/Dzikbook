const User = require('./model');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const crudHandlers = require('./../controllers/handlers');

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.getUser = crudHandlers.getOne(User, {
  path: 'relations',
  select: 'name surname username profilePhotos',
});
exports.getAllUsers = crudHandlers.getAll(User);
