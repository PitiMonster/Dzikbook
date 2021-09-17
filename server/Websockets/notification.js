const runScoket = (io, socket) => {
  socket.on('connect notifications', (data) => {
    socket.join(params.userId);
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
