import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Request } from '../../types';

const initialState: {
  receivedRequests: Request[];
} = {
  receivedRequests: [],
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setReceivedRequests(state, action: PayloadAction<{ requests: Request[] }>) {
      const { requests } = action.payload;
      state.receivedRequests = requests;
    },
    addNewRequest(state, action: PayloadAction<{ request: Request }>) {
      const { request } = action.payload;
      state.receivedRequests = [request, ...state.receivedRequests];
    },
  },
});

export const notificationActions = notificationSlice.actions;
export default notificationSlice;
