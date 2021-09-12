import api from '../../api/api';

import { Chat } from '../../types';

export const getChatById = async (chatId: string): Promise<Chat | null> => {
  try {
    const response = await api.get(`/chats/${chatId}`);
    console.log(response.data.data.data);
    return response.data.data.data;
  } catch (err) {
    console.error('GET HAT BY ID ERROR:', err);
  }
  return null;
};

export const sendMessage = async (
  chatId: string,
  message: string
): Promise<void> => {
  try {
    const response = api.post(`chats/${chatId}`, { message });
    console.log(response);
  } catch (err) {
    console.error('SEND MESSAGE ERROR: ', err);
  }
};
