const Acquaintance = require('./model');
const User = require('./../User/model');
const crudHandlers = require('./../controllers/handlers');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllFriends = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.userId).populate({
    path: 'friends',
    select: 'friend createdAt',
  });
  // const docs = await user.find().select('-__v').populate('users');

  if (!user) {
    return next(new AppError('User with provided ID does not exist', 404));
  }

  // const friends = [];
  // for (const doc of docs) {
  //   if (doc.users.get('sender')._id.toString() === req.params.userId)
  //     friends.push(doc.users.get('receiver'));
  //   else friends.push(doc.users.get('sender'));
  // }
  console.log(user.friends);
  res.status(200).json({ status: 'success', data: { data: user.friends } });
});

exports.checkIfFriend = catchAsync(async (req, res, next) => {
  const { id } = req.user;
  const user = await User.findById(id).populate({
    path: 'friends',
    select: 'friend',
  });
  console.log(user.isFriend(req.params.friendId));

  res.status(200).json({
    status: 'success',
    data: {
      data: user,
    },
  });
});
