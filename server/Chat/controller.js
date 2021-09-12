const Chat = require('./model');
const crudHandlers = require('../controllers/handlers');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Message = require('./../Message/model');

exports.setAuthor = (req, res, next) => {
  req.body.author = req.user.id;
  next();
};

exports.createChat = crudHandlers.createOne(Chat);
exports.getChat = crudHandlers.getOne(
  Chat,
  {
    path: 'members',
    select: 'name surname profilePhotos',
  },
  {
    path: 'messages',
    populate: {
      path: 'author',
      select: 'profilePhotos',
    },
  }
);

exports.sendMessage = catchAsync(async (req, res, next) => {
  const chat = await Chat.findById(req.params.id);

  if (!chat) {
    return next(new AppError('No chat exists with that ID', 404));
  }

  if (!req.body.message) {
    return next(new AppError('No message to send provied', 404));
  }

  const newMessage = await Message.create({
    author: req.user.id,
    text: req.body.message,
  });

  chat.messages.push(newMessage);
  chat.save();
  res.status(200).json({
    status: 'success',
  });
});

exports.getAllUsersChats = catchAsync(async (req, res, next) => {
  const chats = await Chat.find({ members: req.user.id }).select(
    '-__v -messages'
  );

  res.status(200).json({ status: 'success', data: { data: chats } });
});
