const User = require('./../User/model');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllFriends = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.userId).populate({
    path: 'friends',
    select: 'friend createdAt chat',
    populate: {
      path: 'friend',
      select: 'name surname username profilePhotos',
    },
  });

  if (!user) {
    return next(new AppError('User with provided ID does not exist', 404));
  }

  res.status(200).json({ status: 'success', data: { data: user.friends } });
});

exports.checkIfFriend = catchAsync(async (req, res, next) => {
  const { id } = req.user;
  const user = await User.findById(id).populate({
    path: 'friends',
    select: 'friend',
  });

  res.status(200).json({
    status: 'success',
    data: user.isFriend(req.params.friendId),
  });
});
