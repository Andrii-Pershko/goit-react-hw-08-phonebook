import { createSlice } from '@reduxjs/toolkit';
import { register, logIn, logOut, refreshUser } from './operations';

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [register.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.isRefreshing = true;
    },
    [logIn.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    [logOut.pending](state) {
      state.isLoggedIn = false;
      state.isRefreshing = false;
    },
    [logOut.fulfilled](state) {
      state.isLoggedIn = false;
      state.isRefreshing = true;
    },

    [logIn.pending](state) {
      state.isRefreshing = true;
    },
    [refreshUser.pending](state) {},
    [refreshUser.fulfilled](state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isRefreshing = true;
    },
    [refreshUser.rejected](state) {
      state.isRefreshing = true;
    },
  },
});

export const authReducer = authSlice.reducer;
