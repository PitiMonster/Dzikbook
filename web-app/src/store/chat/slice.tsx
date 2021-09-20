import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '..';

import { Chat, Message } from '../../types';

const initialState: {
  openedChats: { [key: string]: Chat };
  openedChatsId: string[];
  unreadMessages: { [key: string]: number };
} = {
  openedChats: {},
  openedChatsId: [],
  unreadMessages: {},
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    openChat(state, action: PayloadAction<{ chat: Chat }>) {
      const { chat } = action.payload;
      if (state.openedChatsId.includes(chat._id)) {
        state.openedChats[chat._id] = chat;
        return;
      }
      const newOpenedChats = { ...state.openedChats };
      newOpenedChats[chat._id] = chat;
      state.openedChats = newOpenedChats;
      state.openedChatsId = [chat._id, ...state.openedChatsId];
    },
    closeChat(state, action: PayloadAction<{ chatId: string }>) {
      const { chatId } = action.payload;
      if (!state.openedChatsId.includes(chatId)) {
        return;
      }
      delete state.openedChats[chatId];
      state.openedChatsId = state.openedChatsId.filter((id) => id !== chatId);
    },
    addNewMessage(
      state,
      action: PayloadAction<{ message: Message; chatId: string }>
    ) {
      const { chatId, message } = action.payload;
      if (state.openedChatsId.includes(chatId))
        state.openedChats[chatId].messages.push(message);
      else {
        const currUnreadNum = state.unreadMessages[chatId] ?? 0;
        state.unreadMessages[chatId] = currUnreadNum + 1;
      }
    },
  },
});

export const chatActions = chatSlice.actions;

export default chatSlice;
