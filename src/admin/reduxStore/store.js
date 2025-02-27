// src/reduxStore/store.js
import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./features/sidebarSlice";
import authReducer from "./auth/authSlice";
import detailsReducer from "./user/detailsSlice.js";
const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    auth: authReducer,
    details: detailsReducer,
  },
});

export default store; // Ensure you export the store as default
