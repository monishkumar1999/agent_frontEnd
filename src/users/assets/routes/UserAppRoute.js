import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Success from "../component/Success";
import Layout from "../component/layouts/Layout";
import Chatting from "../component/Chatting";
import UserLay from "../component/UserLay";
import AdminChat from "../component/AdminChat";

const UserAppRoutes = () => {
  return (
    <Routes>
      <Route path="home" element={<Layout children={<Success />}></Layout>} />

      <Route
        path="chatting"
        element={<Layout children={<Chatting />}></Layout>}
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
