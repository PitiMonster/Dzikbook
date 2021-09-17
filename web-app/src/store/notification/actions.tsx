import { AppDispatch } from '..';
import api from '../../api/api';
import { Socket } from 'socket.io-client';

import { chatActions } from '../chat/slice';
import { Message } from '../../types';

export const runNotificationSocketListeners = (
  socket: Socket,
  dispatch: AppDispatch
) => {
  console.log('włączam notify listenra');
  socket.on('new notification', (data) => {
    console.log(data);
    const { type, notification } = data;
    switch (type) {
      case 'message':
        const { chatId, message } = notification;
        console.log('new message: ', notification);
        message.author = { _id: message.author };
        dispatch(
          chatActions.addNewMessage({
            message,
            chatId,
          })
        );
        break;
      case 'request':
        console.log('new request: ', notification);
        break;
      default:
        break;
    }
  });
};

export const offNotificationSocketListeners = (socket: Socket) => {
  console.log('wyłączam listener notyfikacje');
  socket.off('new notification');
};
