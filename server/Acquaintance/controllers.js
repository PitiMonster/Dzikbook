const Acquaintance = require('./model');
const crudHandlers = require('./../controllers/handlers');
const catchAsync = require('./../utils/catchAsync');

exports.getAllFriends = catchAsync(async (req, res, next) => {
  let filter = {};
  // create filter object based on provided url params
  if (req.params.userId) {
    // filter['author'] = req.params.userId;
    filter['$or'] = [
      {
        'users.sender': req.params.userId,
      },
      { 'users.receiver': req.params.userId },
    ];
  }
  console.log(filter);
  const docs = await Acquaintance.find(filter).select('-__v').populate('users');

  const friends = [];
  for (const doc of docs) {
    if (doc.users.get('sender')._id.toString() === req.params.userId)
      friends.push(doc.users.get('receiver'));
    else friends.push(doc.users.get('sender'));
  }

  res.status(200).json({ status: 'success', data: { data: friends } });
});

exports.checkIfFriend = catchAsync(async (req, res, next) => {
  const { id } = req.user;
  const friendId = req.params.friendId;
  console.log(id, friendId);

  let filter = {};
  // create filter object based on provided url params
  if (req.params.userId) {
    // filter['author'] = req.params.userId;
    filter['$or'] = [
      {
        'users.sender': id,
        'users.receiver': friendId,
      },
      {
        'users.sender': friendId,
        'users.receiver': id,
      },
    ];
  }
  console.log(filter);
  const docs = await Acquaintance.find(filter).select('-__v').populate('users');

  res.status(200).json({
    status: 'success',
    data: {
      data: docs.length > 0 ? true : false,
    },
  });
});
