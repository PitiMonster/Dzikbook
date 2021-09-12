import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Chat, Message } from '../../types';

const initialState: {
  openedChats: { [key: string]: Chat };
  openedChatsId: string[];
} = {
  openedChats: {},
  openedChatsId: [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    openChat(state, action: PayloadAction<{ chat: Chat }>) {
      const { chat } = action.payload;
      console.log(chat);
      if (Object.keys(state.openedChats).includes(chat._id)) {
        return;
      }
      let newOpenedChatsId = [chat._id, ...state.openedChatsId];
      const newOpenedChats = { ...state.openedChats };
      newOpenedChats[chat._id] = chat;
      if (newOpenedChatsId.length === 4) {
        delete newOpenedChats[newOpenedChatsId[4]];
        newOpenedChatsId = newOpenedChatsId.slice(0, 3);
      }
      state.openedChats = newOpenedChats;
      state.openedChatsId = newOpenedChatsId;
    },
    addNewMessage(
      state,
      action: PayloadAction<{ message: Message; chatId: string }>
    ) {
      const { chatId, message } = action.payload;
      state.openedChats[chatId].messages.push(message);
    },
  },
});

export const chatActions = chatSlice.actions;

export default chatSlice;
