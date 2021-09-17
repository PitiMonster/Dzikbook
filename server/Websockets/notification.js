const runScoket = (io, socket) => {
  socket.on('connect notifications', (data) => {
    console.log('connecting notifications: ', data.userId);
    socket.join(data.userId);
  });

  socket.on('send notification', (data) => {
    const { receiver, message, chatId } = data;
    socket.to(receiver).emit('receive notification', {
      notificationType: 'new message',
      notification: { message, chatId },
    });
  });
};

module.exports = runScoket;
