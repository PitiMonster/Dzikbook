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

export const getUsersByNameSurnameUsername =
  (text: string) => async (dispatch: AppDispatch) => {
    try {
      if (text) {
        const regexToSearch = text.split(' ').join('|');
        console.log();
        const response = await api.get(
          `/users?or=true&name[regex]=${regexToSearch}&surname[regex]=${regexToSearch}&username[regex]=${regexToSearch}`
        );
        console.log(response.data.data.data);
        dispatch(
          userActions.setSearchUserResults({ users: response.data.data.data })
        );
      } else {
        dispatch(userActions.setSearchUserResults({ users: [] }));
      }
    } catch (err) {
      console.error('GET USER BY NAME SURNAME USERNAME ERROR', err);
    }
  };
