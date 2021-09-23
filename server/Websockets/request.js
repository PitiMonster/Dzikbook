const Request = require('../Request/model');
const User = require('../User/model');

const runSockets = (io, socket) => {
  socket.on('send acquaintance request', async (data) => {
    console.log('sending acquaintance request', data);
    const { senderId, receiverId } = data;

    const sender = User.findById(senderId);
    if (!sender) {
      return next(new AppError('No user exists with provided senderId', 404));
    }

    const receiver = User.findById(receiverId);
    if (!receiver) {
      return new AppError('No receiver exists with provided receiverId', 404);
    }

    let newRequest = await Request.create({
      sender: senderId,
      receiver: receiverId,
    });

    newRequest = await newRequest
      .populate({
        path: 'sender',
        select: 'name surname',
      })
      .execPopulate();

    socket.to(receiverId.toString()).emit('new notification', {
      type: 'acquaintance request',
      notification: {
        request: newRequest,
      },
    });
  });
};

module.exports = runSockets;
