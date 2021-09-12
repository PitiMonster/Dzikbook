import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: { openedChats: string[] } = {
  openedChats: [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    openChat(state, action: PayloadAction<{ chat: string }>) {
      const { chat } = action.payload;
      console.log(chat);
      if (state.openedChats.includes(chat)) {
        return;
      }
      state.openedChats = [chat, ...state.openedChats].slice(0, 3);
    },
  },
});

export const chatActions = chatSlice.actions;

export default chatSlice;
