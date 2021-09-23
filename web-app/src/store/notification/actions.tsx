import { AppDispatch } from '..';
import api from '../../api/api';
import { Socket } from 'socket.io-client';

import { chatActions } from '../chat/slice';
import { notificationActions } from './slice';
import { runEmitter } from '../../websockets';

export const sendAquaintanceRequest = async (
  friendId: string
): Promise<void> => {
  try {
    // await api.post('/requests', { receiver: friendId });
    runEmitter('send acquaintance request', {
      senderId: localStorage.getItem('userId'),
      receiverId: friendId,
    });
  } catch (err) {
    console.error('SEND AQUAINTANCE REQUEST ERROR: ', err);
  }
};

export const getReceivedRequests =
  () =>
  async (dispatch: AppDispatch): Promise<Request[]> => {
    try {
      const response = await api.get('/requests/acquaintance/received');
      console.log(response.data.data.data);
      dispatch(
        notificationActions.setReceivedRequests({
          requests: response.data.data.data,
        })
      );
    } catch (err) {
      console.error('GET RECEIVED REQUESTS ERROR: ', err);
    }
    return [];
  };

export const answerAquaintanceRequest = async (
  requestId: string,
  answer: string
): Promise<string | void> => {
  try {
    if (!['accept', 'reject'].includes(answer)) return;
    const response = await api.post(`/requests/${requestId}`, { answer });
    return response.data.data;
  } catch (err) {
    console.error('answer AQUAINTANCE REQUEST ERROR: ', err);
  }
  return;
};

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
        console.log('new message: ', message.author);
        message.author = { _id: message.author };
        dispatch(
          chatActions.addNewMessage({
            message,
            chatId,
          })
        );
        break;
      case 'acquaintance request':
        console.log('new request: ', notification);
        const { request } = notification;
        dispatch(notificationActions.addNewRequest({ request }));
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
