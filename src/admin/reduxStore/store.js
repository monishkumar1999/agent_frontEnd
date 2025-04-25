// src/reduxStore/store.js
import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './features/sidebarSlice';
import formReducer from "./formSlice";
import authReducer from './auth/authSlice';
import detailsReducer from './user/detailsSlice';
const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    auth: authReducer,
    form: formReducer,
    details: detailsReducer,
  },
});

export default store; // Ensure you export the store as default
