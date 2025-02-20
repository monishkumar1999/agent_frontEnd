import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import Layout from "../../../admin/assets/component/Layout";
import Shimmer from "../../../admin/assets/component/Shimmer";
import AgentChat from "../component/AgentChat";

// Lazy load agent-related components
const AgentHome = lazy(() => import("../component/AgentHome"));
const AboutUs = lazy(() => import("../component/AboutUs"));
const Contact = lazy(() => import("../component/Contact"));
const Services = lazy(() => import("../component/Services"));
const AgentDashboard = lazy(() => import("../component/AgentDashboard"));
const AgentProfile = lazy(() => import("../component/AgentProfile"));
const AgentSettings = lazy(() => import("../component/AgentSettings"));
const AgentListings = lazy(() => import("../component/AgentListings"));
const Login = lazy(() => import("../../../admin/assets/login/Login"));

const AgentRoutes = () => {
  const token = Cookies.get("auth_token");

  return (
    <Suspense fallback={<Shimmer />}>
      <Routes>
        <Route path="/" element={<AgentHome />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/profile" element={<AgentProfile />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/chat" element={<AgentChat />} />
        <Route path="/dashboard" element={<AgentDashboard />} />
        
      </Routes>
    </Suspense>
  );
};

export default AgentRoutes;
