import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import Shimmer from "../../../admin/assets/component/Shimmer";
import AgentRouteWrapper from "./AgentRouteWrapper";

const AgentHome = lazy(() => import("../component/AgentHome"));
const AboutUs = lazy(() => import("../component/AboutUs"));
const Contact = lazy(() => import("../component/Contact"));
const Services = lazy(() => import("../component/Services"));
const AgentDashboard = lazy(() => import("../component/AgentDashboard"));
const AgentProfile = lazy(() => import("../component/AgentProfile"));
const AgentChatPage = lazy(() => import("../component/chating/userchat/AgentChatPage"));
const AgentChatbox =lazy(()=> import("../component/chating/adminchat/AdminChatbox"))
const Userchat =lazy(()=> import("../component/chating/userchat/Userchat"))

const AgentRoutes = () => {
  return (
    <Suspense fallback={<Shimmer />}>
      <Routes>
        {/* Wrap all agent routes inside AgentRouteWrapper */}
        <Route element={<AgentRouteWrapper />}>
          <Route path="/" element={<AgentHome />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/profile" element={<AgentProfile />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/chat" element={<AgentChatbox />} />
          <Route path="/dashboard" element={<AgentDashboard />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AgentRoutes;