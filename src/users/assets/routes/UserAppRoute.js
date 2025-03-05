// src/routes/UserAppRoutes.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../component/layouts/Layout";
import Success from "../component/Success";
import ChatPage from "../chating/ChatPage";
import Profile from "../component/Profile";
import AdminChat from "../component/chating/AdminChat";
import DetailsForm from "../component/DetailsForm";
import LoginPage from "../../../pages/LoginPage"; // ✅ Use LoginPage instead of UserLogin
import UserAppRouteWrapper from "./UserAppRouteWrapper"; // ✅ Protects user routes
import Proposal from "../component/Proposal";
import AgentProfile from "../component/AgentProfile";

const UserAppRoutes = () => {
  return (
    <Routes>
      {/* ✅ Prevent logged-in users from accessing /user/login (Checks Cookies) */}
      <Route
        path="login"
        element={
          <Layout>
            <LoginPage />
          </Layout>
        }
      />

      {/* ✅ User routes wrapped in UserAppRouteWrapper */}
      <Route element={<UserAppRouteWrapper />}>
        <Route
          path="success"
          element={
            <Layout>
              <Success />
            </Layout>
          }
        />
        <Route
          path="chat/:targetId"
          element={
            <Layout>
              <ChatPage />
            </Layout>
          }
        />
        <Route
          path="profile"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />
        <Route
          path="chats"
          element={
            <Layout>
              <AdminChat />
            </Layout>
          }
        />
        <Route
          path="details"
          element={
            <Layout>
              <DetailsForm />
            </Layout>
          }
        />
        <Route
          path="proposal/:id"
          element={
            <Layout>
              <Proposal />
            </Layout>
          }
        />

        <Route
          path="/agent/:agentId"
          element={
            <Layout>
              <AgentProfile />
            </Layout>
          }
        />
      </Route>

      {/* ✅ Redirect unknown user routes to profile */}
      <Route path="*" element={<Navigate to="/user/profile" />} />
    </Routes>
  );
};

export default UserAppRoutes;
