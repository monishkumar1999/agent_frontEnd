import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import Shimmer from "../../../admin/assets/component/Shimmer";
import AgentRouteWrapper from "./AgentRouteWrapper";
<<<<<<< HEAD
import Alayout from "../layout/Alayout"
import MultiStepForm from "../component/Form/MultiStepForm";
import EditProfilePhoto from "../component/EditProfilePhoto";
=======
>>>>>>> 3c1ac80b35c8c3670e0e3727fef94f4ad94aa32a

const AgentHome = lazy(() => import("../component/AgentHome"));
const AboutUs = lazy(() => import("../component/AboutUs"));
const Contact = lazy(() => import("../component/Contact"));
const Services = lazy(() => import("../component/Services"));
const AgentDashboard = lazy(() => import("../component/AgentDashboard"));
const AgentProfile = lazy(() => import("../component/AgentProfile"));
<<<<<<< HEAD
const AgentChatPage = lazy(() => import("../component/chating/userchat/AgentChatPage"));
const AdminChatbox =lazy(()=> import("../component/chating/adminchat/AdminChatbox"))
const Userchat =lazy(()=> import("../component/chating/userchat/Userchat"))
=======
const AgentChatbox = lazy(() => import("../component/chating/AgentChatbox"));
>>>>>>> 3c1ac80b35c8c3670e0e3727fef94f4ad94aa32a

const AgentRoutes = () => {
  return (
    <Suspense fallback={<Shimmer />}>
      <Routes>
        {/* Wrap all agent routes inside AgentRouteWrapper */}
        <Route element={<AgentRouteWrapper />}>
<<<<<<< HEAD
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
          
=======
          <Route path="/" element={<AgentHome />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/profile" element={<AgentProfile />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/chat" element={<AgentChatbox />} />
          <Route path="/dashboard" element={<AgentDashboard />} />
>>>>>>> 3c1ac80b35c8c3670e0e3727fef94f4ad94aa32a
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AgentRoutes;