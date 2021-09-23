import { configureStore } from '@reduxjs/toolkit';

import authSlice from './auth/slice';
import meSlice from './me/slice';
import postSlice from './post/slice';
import userSlice from './user/slice';
import chatSlice from './chat/slice';
import notificationSlice from './notification/slice';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    me: meSlice.reducer,
    post: postSlice.reducer,
    user: userSlice.reducer,
    chat: chatSlice.reducer,
    notification: notificationSlice.reducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
