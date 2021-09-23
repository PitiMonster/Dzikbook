import { AppDispatch } from '..';
import api from '../../api/api';

import { getAllPosts } from '../post/actions';
import { userActions } from './slice';

import { Request, Aquaintance } from '../../types';
import { runEmitter } from '../../websockets';

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
        const response = await api.get(
          `/users?or=true&name[regex]=${regexToSearch}&surname[regex]=${regexToSearch}&username[regex]=${regexToSearch}`
        );
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

export const checkIfFriend = async (friendId: string): Promise<Boolean> => {
  try {
    const response = await api.get(`/acquaintance/${friendId}`);
    return response.data.data;
  } catch (err) {
    console.error('CHECK IF FRIEND ERROR: ', err);
  }
  return false;
};

export const sendAquaintanceRequest = async (
  friendId: string
): Promise<void> => {
  try {
    // await api.post('/requests', { receiver: friendId });
    runEmitter('send acquaintance request', {
      senderId: localStorage.getItem('userId'),
      receiverId: friendId,
    });
  } catch (err) {
    console.error('SEND AQUAINTANCE REQUEST ERROR: ', err);
  }
};

export const getReceivedRequests = async (): Promise<Request[]> => {
  try {
    const response = await api.get('/requests/acquaintance/received');
    return response.data.data.data;
  } catch (err) {
    console.error('GET RECEIVED REQUESTS ERROR: ', err);
  }
  return [];
};

export const answerAquaintanceRequest = async (
  requestId: string,
  answer: string
): Promise<string | void> => {
  try {
    if (!['accept', 'reject'].includes(answer)) return;
    const response = await api.post(`/requests/${requestId}`, { answer });
    return response.data.data;
  } catch (err) {
    console.error('answer AQUAINTANCE REQUEST ERROR: ', err);
  }
  return;
};

export const getAllUsersFriends = async (
  userId: string
): Promise<Aquaintance[]> => {
  try {
    const response = await api.get(`/users/${userId}/friends`);
    return response.data.data.data;
  } catch (err) {
    console.error('GET ALL USERS FRIENDS ERROR: ', err);
  }
  return [];
};
