import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

// Define initial state
const initialState = {
  token: Cookies.get('auth_token') || null, // Get token from cookies initially
  isAuthenticated: !!Cookies.get('auth_token'), // Determine if authenticated based on token
};

// Create a slice of the state
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthToken: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    clearAuthToken: (state) => {
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

// Export actions and reducer
export const { setAuthToken, clearAuthToken } = authSlice.actions;
export default authSlice.reducer;
