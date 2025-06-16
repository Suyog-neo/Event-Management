import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  role: null, // 'user' or 'admin'
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      const { role, user } = action.payload;
      state.isAuthenticated = true;
      state.role = role;
      state.user = user;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.role = null;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
