import { AppDispatch } from '..';
import api from '../../api/api';
import { Socket } from 'socket.io-client';

import { chatActions } from './slice';
import { runEmitter, runListener, offListener } from '../../websockets';
import { Message } from '../../types';

export const getChatById =
  (chatId: string) => async (dispatch: AppDispatch) => {
    try {
      const response = await api.get(`/chats/${chatId}`);
      dispatch(chatActions.openChat({ chat: response.data.data.data }));
      runEmitter('connect to chat', { chatId });
      runListener(runChatSocketListeners);
    } catch (err) {
      console.error('GET HAT BY ID ERROR:', err);
    }
  };

export const closeChatById =
  (chatId: string) =>
  async (dispatch: AppDispatch): Promise<void> => {
    try {
      runEmitter('disconnect from chat', { chatId });
      offListener(offChatSocketListeners);
      dispatch(chatActions.closeChat({ chatId }));
    } catch (err) {
      console.error('CLOSE CHAT BY ID ERROR: ', err);
    }
  };

export const sendMessage = async (
  chatId: string,
  message: string
): Promise<void> => {
  try {
    // const response = api.post(`chats/${chatId}`, { message });
    runEmitter('send message', {
      chatId,
      message,
      authorId: localStorage.getItem('userId'),
    });
  } catch (err) {
    console.error('SEND MESSAGE ERROR: ', err);
  }
};

export const runChatSocketListeners = (
  socket: Socket,
  dispatch: AppDispatch
) => {
  socket.on('new message', (data) => {
    const { message, chatId } = data;
    message.author = { _id: message.author };
    dispatch(chatActions.addNewMessage({ message, chatId }));
  });
};

export const offChatSocketListeners = (socket: Socket) => {
  socket.off('new message');
};
