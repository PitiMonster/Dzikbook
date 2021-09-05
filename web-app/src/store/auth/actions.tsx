import api from '../../api/api';
import { AppDispatch } from '..';
import { authActions } from './slice';

export const signin = (email: string, password: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await api.post('/users/signin', { email, password });
      localStorage.setItem('token', response.data.token);
      dispatch(
        authActions.login({
          token: response.data.token,
          isUserLoggedIn: true,
        })
      );
    } catch (err) {
      console.error('SIGNIN ERROR: ', err);
    }
  };
};

export const signup = (
  name: string,
  surname: string,
  email: string,
  password: string,
  passwordConfirm: string,
  username: string
) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await api.post('/users/signup', {
        name,
        surname,
        email,
        password,
        passwordConfirm,
        username,
      });
      console.log(response.data);
      if (response.data.status === 'success')
        dispatch(
          authActions.signup({
            isSingupSuccess: true,
          })
        );
    } catch (err) {
      console.error('SIGNUP ERROR', err);
    }
  };
};
