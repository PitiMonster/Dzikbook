import { AppDispatch } from '..';
import api from '../../api/api';

import { getAllPosts } from '../post/actions';
import { userActions } from './slice';

export const getUserById =
  (userId: string) => async (dispatch: AppDispatch) => {
    try {
      const response = await api.get(`/users/${userId}`);
      const userData = response.data.data.data;
      dispatch(userActions.setProfileData({ ...userData }));
      dispatch(getAllPosts(userId));
    } catch (err) {
      console.error('GET USER BY ID ERROR: ', err);
    }
  };
