import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Success from "../component/Success";
import Layout from "../component/layouts/Layout";

import ChatPage from "../chating/ChatPage";
import Profile from "../component/Profile";
import AdminChat from "../component/chating/AdminChat";
import DetailsForm from "../component/DetailsForm";

const UserAppRoutes = () => {
  return (
    <Routes>
      <Route
        path="success"
        element={<Layout children={<Success />}></Layout>}
      />

      <Route
        path="chat/:targetId"
        element={<Layout children={<ChatPage />}></Layout>}
      />

      <Route
        path="profile"
        element={<Layout children={<Profile />}></Layout>}
      />
      <Route
        path="chats"
        element={<Layout children={<AdminChat />}></Layout>}
      />
      <Route
        path="details"
        element={<Layout children={<DetailsForm />}></Layout>}
      />
    </Routes>
  );
};

export default UserAppRoutes;
