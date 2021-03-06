import { AppDispatch } from '..';
import api from '../../api/api';

import { postActions } from './slice';

export const createPost =
  (text: string, userId: string | null) => async (dispatch: AppDispatch) => {
    try {
      const response = await api.post(`/users/${userId}/posts`, { text });
      const newPostData = response.data.data.data;
      const authorId = newPostData.author;
      if (typeof authorId === 'string') {
        const user = await api.get(`/users/${authorId}`);
        const author = user.data.data.data;
        newPostData.author = author;
      } else if (typeof authorId !== 'object') return;
      dispatch(postActions.addNewPost({ post: newPostData }));
    } catch (err) {
      console.error('CREATE POST ERROR: ', err);
    }
  };

export const getAllPosts =
  (userId: string) => async (dispatch: AppDispatch) => {
    try {
      const response = await api.get(`/users/${userId}/posts?limit=10`);
      dispatch(postActions.setPosts({ posts: response.data.data.data }));
    } catch (err) {
      console.error('GET USERS POSTS ERROR: ', err);
    }
  };

export const getNextTenPosts =
  (userId: string | null, currPostsAmount: number) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await api.get(
        `/users/${userId}/posts?limit=10&page=${currPostsAmount / 10 + 1}`
      );
      const posts = response.data.data.data;
      if (posts.length !== 0) {
        dispatch(postActions.appendPosts({ posts }));
      }
    } catch (err) {
      console.error('GET NEXT TEN POSTS ERROR', err);
    }
  };
