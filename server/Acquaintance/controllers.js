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
  // TODO protect sending request to a friend or to already requested user
  console.log(filter);
  const docs = await Acquaintance.find(filter).select('-__v').populate('users');

  const friends = [];
  for (doc of docs) {
    console.log(doc.users);
    if (doc.users.get('sender')._id === req.params.userId)
      friends.push(doc.push.users.get('sender'));
    else friends.push(doc.users.get('receiver'));
  }

  res.status(200).json({ status: 'success', data: { data: friends } });
});
