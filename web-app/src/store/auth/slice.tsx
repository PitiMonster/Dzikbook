import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  isUserLoggedIn: boolean;
  isSingupSuccess: boolean;
}

const initialState: AuthState = {
  token: null,
  isUserLoggedIn: false,
  isSingupSuccess: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(
      state,
      action: PayloadAction<{
        token: string;
        isUserLoggedIn: boolean;
      }>
    ) {
      const { token, isUserLoggedIn } = action.payload;
      state.token = token;
      state.isUserLoggedIn = isUserLoggedIn;
    },
    signup(
      state,
      action: PayloadAction<{
        isSingupSuccess: boolean;
      }>
    ) {
      const { isSingupSuccess } = action.payload;
      state.isSingupSuccess = isSingupSuccess;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
