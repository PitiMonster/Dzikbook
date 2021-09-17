import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types';

const initialState: { cachedPosts: Post[] } = {
  cachedPosts: [],
};

const postsSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPosts(state, action: PayloadAction<{ posts: Post[] }>) {
      state.cachedPosts = action.payload.posts;
    },
    appendPosts(state, action: PayloadAction<{ posts: Post[] }>) {
      state.cachedPosts = [...state.cachedPosts, ...action.payload.posts];
    },
    addNewPost(state, action: PayloadAction<{ post: Post }>) {
      state.cachedPosts = [action.payload.post, ...state.cachedPosts];
    },
  },
});

export const postActions = postsSlice.actions;

export default postsSlice;
