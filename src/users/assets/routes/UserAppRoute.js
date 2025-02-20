import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Success from "../component/Success";
import Layout from "../component/layouts/Layout";

import ChatPage from "../chating/ChatPage";
import UserLay from "../component/UserLay";
import AdminChat from "../component/AdminChat";

const UserAppRoutes = () => {
  return (
    <Routes>
      <Route path="home" element={<Layout children={<Success />}></Layout>} />

      <Route
        path="chat/:targetId"
        element={<Layout children={<ChatPage />}></Layout>}
      />

      <Route
        path="userlay"
        element={<Layout children={<UserLay />}></Layout>}
      />
      <Route
        path="chats"
        element={<Layout children={<AdminChat />}></Layout>}
      />
    </Routes>
  );
};

export default UserAppRoutes;
