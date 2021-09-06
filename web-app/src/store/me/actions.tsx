import api from '../../api/api';
import { AppDispatch } from '..';
import { meActions } from './slice';

export const getMe = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await api.get('/users/me');
      console.log(response.data.data.data);
      dispatch(meActions.setProfileData(response.data.data.data));
    } catch (err) {
      console.error('SIGNIN ERROR: ', err);
    }
  };
};
