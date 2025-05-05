import React, { useState } from "react";
import InputField from "../pages/InputField"; // Ensure this path is correct
import OTPForm from "../pages/OTPForm";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import axiosInstance from "../utils/axiosInstance";

function AgentForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [otp, setOtp] = useState(null);
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [emailForOtp, setEmailForOtp] = useState("");

  const handleOtpVerification = (inputOtp) => {
    if (inputOtp === otp) {
      console.log("OTP verified successfully!");
      setShowOtpForm(false);
      setOtp(null);
    } else {
      console.log("Invalid OTP. Please try again.");
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleLoginSuccess = (email) => {
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setOtp(generatedOtp);
    setEmailForOtp(email);
    console.log("Generated OTP:", generatedOtp);
    setShowOtpForm(true);
  };

  const handleSignupSuccess = (email) => {
    setEmailForOtp(email);
    setShowOtpForm(true);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      {/* Left Section - Branding and Agent-Focused Messaging */}
      <div className="hidden md:flex w-full md:w-1/2 flex-col justify-center items-center p-8 bg-white text-black transition-all duration-300">
        <div className="text-center font-poppins">
          <img
            src="images/logo.png"
            alt="AgentPro Logo"
            className="w-40 h-auto mx-auto mb-6"
          />
          <h2 className="text-3xl md:text-4xl font-bold mt-4">
            Earn More with <span className="text-2xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-2 py-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent animate-fade-in">Buyers First</span>
          </h2>
          <p className="text-xl mt-4 font-semibold text-gray-600">
            Join the leading platform for real estate agents. Connect with motivated buyers and boost your commissions.
          </p>
          <p className="text-base mt-2 opacity-80 italic">
            Maximize your earning potential with exclusive leads and advanced tools.
          </p>
        </div>
      </div>

      {/* Right Section - Form */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-4 md:p-8 bg-white">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl border">
          {/* Mobile Logo */}
          <div className="md:hidden text-center mb-6">
            <img
              src="images/logo.png"
              alt="AgentPro Logo"
              className="w-32 h-auto mx-auto"
            />
          </div>
          <div className="flex justify-between border-b border-gray-200 mb-6">
            <button
              className={`w-1/2 py-3 text-lg font-medium transition-all duration-200 ${
                isLogin ? "border-b-4 border-blue-600 text-blue-600" : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setIsLogin(true)}
            >
              Sign In
            </button>
            <button
              className={`w-1/2 py-3 text-lg font-medium transition-all duration-200 ${
                !isLogin ? "border-b-4 border-blue-600 text-blue-600" : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>

          <div className="overflow-y-auto max-h-[500px] ">
            {showOtpForm ? (
              <OTPForm onVerify={handleOtpVerification} email={emailForOtp} />
            ) : (
              <div className="space-y-6">
                {isLogin ? (
                  <SignIn onLoginSuccess={handleLoginSuccess} />
                ) : (
                  <SignUp onSignupSuccess={handleSignupSuccess} />
                )}
              </div>
            )}
          </div>

          {isLogin && !showOtpForm && (
            <div className="mt-6 text-center">
              <p className="text-gray-500 italic text-sm">
                "Grow your real estate business with AgentPro's powerful platform!"
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AgentForm;