import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Success from "../component/Success";
import Layout from "../component/layouts/Layout";
import Chatting from "../component/Chatting";
import ChatPage from "../chating/ChatPage";

const UserAppRoutes = () => {
  return (
    <Routes>
      <Route path="home" element={<Layout children={<Success />}></Layout>} />

      <Route
        path="chat/:targetId"
        element={<Layout children={<ChatPage />}></Layout>}
      />
    </Routes>
  );
};

export default UserAppRoutes;
