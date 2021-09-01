const Chat = require('./model');
const crudHandlers = require('./../controllers/handlers');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.setAuthor = (req, res, next) => {
  req.body.author = req.user.id;
  next();
};

exports.createChat = crudHandlers.createOne(Chat);
exports.getChat = crudHandlers.getOne(Chat);

exports.sendMessage = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
  });
});
