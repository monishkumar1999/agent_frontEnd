import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "../pages/landingPage";
import ExplaingPage from "../pages/ExplaingPage";
import AgentForm from "../pages/AgentForm";
import LogINForm from "../pages/logIn";
import VerificationForm from "../pages/verificationForm";
import OTPVerificationForm from "../pages/OtpVerification";
import PasswordForm from "../pages/passwordForm";
import SuccessPage from "../pages/SuccessPage";
import PricingModel from "../pages/PricingModel";
import MultiStepForm from "../pages/MultiStepForm";
import ProfileSuccessPage from "../pages/profileSuccess";
import ListOfBuyerAgents from "../pages/ListOfBuyerAgents";
import BuyerAgentDetailsPageInfo from "../pages/BuyerAgentDetailsPageInfo";
import BuyerAgentDetailsPageRevi from "../pages/BuyerAgentDetailsPageRevi";
import AppRoutes from "../admin/assets/routes/AppRoute";
// import UserAppRoutes from "../users/assets/routes/UserAppRoutes";
import Chat from "../components/Chat";
import LoginPage from "../pages/LoginPage";
import UserAppRoutes from "../users/assets/routes/UserAppRoute";
import AgentRoutes from "../Agents/assets/routes/AgentRoutes";

export default function Router() {

  return (
    // {d}
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LogINForm />} />
        <Route path="/verify" element={<VerificationForm />} />
        <Route path="/Otpverify" element={<OTPVerificationForm />} />
        <Route path="/ConfirmPassword" element={<PasswordForm />} />
        <Route path="/Success" element={<SuccessPage />} />
        <Route path="/ProfileSuccess" element={<ProfileSuccessPage />} />
        <Route path="/PricingModel" element={<PricingModel />} />
        <Route path="/MultiStepForm" element={<MultiStepForm />} />
        <Route path="/register" element={<AgentForm />} />
        <Route path="/HowItWorks" element={<ExplaingPage />} />
        <Route
          path="/BuyerAgentDetailsPageInfo"
          element={<BuyerAgentDetailsPageInfo />}
        />
        <Route
          path="/BuyerAgentDetailsPageRevi"
          element={<BuyerAgentDetailsPageRevi />}
        />
        <Route path="/ListOfBuyerAgents" element={<ListOfBuyerAgents />} />

        <Route path="/chat/:user" element={<Chat />} />

        <Route path="/user/login" element={<LoginPage />} />

        {/* Admin Routes */}
        <Route path="/admin/*" element={<AppRoutes />} />

        <Route path="/user/*" element={<UserAppRoutes />} />
        <Route path="/agents/*" element={<AgentRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}
