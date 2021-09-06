import { AppDispatch } from '..';
import api from '../../api/api';

import { postActions } from './slice';

export const createPost =
  (text: string, userId: string | null) => async (dispatch: AppDispatch) => {
    try {
      const response = await api.post(`/users/${userId}/posts`, { text });
      console.log(response);
      const authorId = response.data?.data?.data?.author;
      console.log(authorId);
      if (typeof authorId === 'string') {
        const user = await api.get(`/users/${authorId}`);
        const author = user.data.data.data;
        console.log(user);
        console.log(author);
        response.data.data.data.author = author;
      } else if (typeof authorId !== 'object') return;
      dispatch(postActions.addNewPost({ post: response.data.data.data }));
    } catch (err) {
      console.error('CREATE POST ERROR: ', err);
    }
  };
