import api from '../../api/api';
import { AppDispatch } from '..';
import { meActions } from './slice';
import { getAllPosts } from '../post/actions';

export const getMe = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await api.get('/users/me');
      console.log();
      const userData = response.data.data.data;
      dispatch(meActions.setProfileData(userData));
      dispatch(getAllPosts(userData.id));
    } catch (err) {
      console.error('SIGNIN ERROR: ', err);
    }
  };
};
