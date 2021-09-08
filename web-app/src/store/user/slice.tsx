import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post, User } from '../../types';

const initialState: User & { searchedUsers: User[] } = {
  id: null,
  email: null,
  name: null,
  surname: null,
  username: null,
  photos: null,
  profilePhotos: null,
  role: null,
  searchedUsers: [],
};

const userSlice = createSlice({
  name: 'me',
  initialState,
  reducers: {
    setProfileData(
      state,
      action: PayloadAction<{
        id: string;
        email: string;
        name: string;
        surname: string;
        username: string;
        photos: string[] | null;
        profilePhotos: string[] | null;
        role: string;
      }>
    ) {
      console.log('siema funkcja');
      console.log(action.payload);
      const {
        id,
        email,
        name,
        surname,
        username,
        photos,
        profilePhotos,
        role,
      } = action.payload;
      state.id = id;
      state.email = email;
      state.name = name;
      state.surname = surname;
      state.username = username;
      state.photos = photos;
      state.profilePhotos = profilePhotos;
      state.role = role;
    },
    setSearchUserResults(state, action: PayloadAction<{ users: User[] }>) {
      console.log(action.payload.users);
      state.searchedUsers = action.payload.users;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
