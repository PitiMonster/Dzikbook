const crudHandlers = require('../controllers/handlers');
const AppError = require('../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const Request = require('./model');
const Acquaintance = require('./../Acquaintance/model');
const Chat = require('./../Chat/model');
const User = require('./../User/model');

exports.setSender = (req, res, next) => {
  if (!req.body.sender) req.body.sender = req.user.id;
  next();
};

exports.canSendRequest = catchAsync(async (req, res, next) => {
  if (req.user.id === req.body.receiver) {
    return next(new AppError('You can not send request to yourself!', 400));
  }

  const checkRequest = await Request.findOne({
    $or: [
      { sender: req.user.id, receiver: req.body.receiver },
      {
        receiver: req.user.id,
        sender: req.body.receiver,
      },
    ],
  });

  if (checkRequest) {
    return next(
      new AppError('Your request to/from receiver already exists!', 400)
    );
  }

  const checkAcqua = await Acquaintance.findOne({
    user: req.user.id,
    friend: req.body.receiver,
  });

  if (checkAcqua) {
    return next(new AppError('You are already friends!', 400));
  }

  next();
});

exports.getRequests = crudHandlers.getAll(
  Request,
  {
    path: 'sender',
    select: 'name surname username profilePhotos',
  },
  {
    path: 'receiver',
    select: 'name surname username profilePhotos',
  }
);
exports.createRequest = crudHandlers.createOne(Request);
exports.answerTheRequest = catchAsync(async (req, res, next) => {
  if (!req.body.answer) {
    return next(new AppError('Request answer was not provided!', 400));
  }

  const request = await Request.findById(req.params.id);

  if (!request) {
    return next(new AppError('Request with that ID does not exist!', 404));
  }

  // check if right user answer the request
  if (request.receiver.toString() !== req.user.id.toString()) {
    return next(
      new AppError('You are not permitted to answer this request', 401)
    );
  }

  console.log(request.receiver);
  const receiver = await User.findById(request.receiver);
  const sender = await User.findById(request.sender);

  switch (req.body.answer) {
    case 'accept':
      // create acquaintance, chat for these users and delete request
      const senderAcquaintance = await Acquaintance.create({
        friend: request.receiver,
      });
      senderAcquaintance.save();
      const receiverAcquaintance = await Acquaintance.create({
        friend: request.sender,
      });
      senderAcquaintance.save();
      receiverAcquaintance.save();

      receiver.friends.push(receiverAcquaintance);
      sender.friends.push(senderAcquaintance);

      receiver.save({ validateBeforeSave: false });
      sender.save({ validateBeforeSave: false });

      const chat = await Chat.create({
        members: [request.sender, request.receiver],
      });
      chat.save();
      await Request.findByIdAndDelete(request._id);
      break;
    case 'reject':
      // delete request
      await Request.findByIdAndDelete(request._id);

    default:
      break;
  }

  res.status(200).json({
    status: 'success',
  });
});
