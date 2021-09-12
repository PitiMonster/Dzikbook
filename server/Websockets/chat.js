const runSockets = (socket) => {
  socket.on('connect to chat', (data) => {
    console.log('connecting to chat ', data);
    socket.join(data.chatId);
  });

  socket.on('disconnect from chat', (data) => {
    console.log('disconnecting to chat ', data);
    socket.leave(data.chatId);
  });

  socket.on('send message', (data) => {
    console.log('sending msg to chat ', data);
    socket.to(data.chatId).emit('new message', data.message);
  });
};

module.exports = runSockets;
