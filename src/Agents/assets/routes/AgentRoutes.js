import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import Shimmer from "../../../admin/assets/component/Shimmer";
import AgentRouteWrapper from "./AgentRouteWrapper";
import Alayout from "../layout/Alayout"
import MultiStepForm from "../component/Form/MultiStepForm";
import EditProfilePhoto from "../component/EditProfilePhoto";

const AgentHome = lazy(() => import("../component/AgentHome"));
const AboutUs = lazy(() => import("../component/AboutUs"));
const Contact = lazy(() => import("../component/Contact"));
const Services = lazy(() => import("../component/Services"));
const AgentDashboard = lazy(() => import("../component/AgentDashboard"));
const AgentProfile = lazy(() => import("../component/AgentProfile"));
const AgentChatPage = lazy(() => import("../component/chating/userchat/AgentChatPage"));
const AdminChatbox =lazy(()=> import("../component/chating/adminchat/AdminChatbox"))
const Userchat =lazy(()=> import("../component/chating/userchat/Userchat"))

const AgentRoutes = () => {
  return (
    <Suspense fallback={<Shimmer />}>
      <Routes>
        {/* Wrap all agent routes inside AgentRouteWrapper */}
        <Route element={<AgentRouteWrapper />}>
          <Route path="/" element={<Alayout><AgentDashboard /></Alayout>} />
          <Route path="/about" element={<Alayout><AboutUs /></Alayout>} />
          <Route path="/profile" element={<Alayout><AgentProfile /></Alayout>} />
          <Route path="/contact" element={<Alayout><Contact /></Alayout>} />
          <Route path="/services" element={<Alayout><Services /></Alayout>} />
          <Route path="/form" element={<MultiStepForm />} />
          <Route path="/chat" element={<Alayout><AgentChatPage /></Alayout>} />
          <Route path="/home" element={<Alayout><AgentHome /></Alayout>} />
          <Route path="/editprofile" element={<Alayout><EditProfilePhoto /></Alayout>} />
          <Route path="/adminchat" element={<Alayout><AdminChatbox /></Alayout>} />
          <Route path="/userchat/:targetId" element={<Alayout> <Userchat /></Alayout>}/>
          
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AgentRoutes;