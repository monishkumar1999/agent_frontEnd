// src/reduxStore/store.js
import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './features/sidebarSlice';
import authReducer from './auth/authSlice';
const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    auth: authReducer,
  },
});

export default store;  // Ensure you export the store as default
