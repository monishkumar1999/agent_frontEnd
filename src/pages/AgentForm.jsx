import React, { useState } from "react";
import InputField from "../pages/InputField"; // Ensure this path is correct
import OTPForm from "../pages/OTPForm";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import axiosInstance from "../utils/axiosInstance";

function AgentForm() {
  const userData = {
    email: "dani@gmail.com",
    password: "12312345", // Password should be a string
  };

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
    <div className="flex flex-col md:flex-row min-h-screen items-center bg-cover bg-center p-4 md:p-0 bg-gray-100 md:bg-[url('https://www.pixelstalk.net/wp-content/uploads/2016/05/1920x1200-Wallpapers-High-Quality-Desktop.jpg')]">
      <div className="hidden md:flex w-full md:w-1/2 flex-col justify-center p-4 md:p-8 text-white text-center md:text-left relative">
        <div className="absolute top-5 left-5">
          <img src="/images/findmyagent.svg" alt="FindMyAgent Logo" className="w-24 md:w-32" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold">Join <span className="text-green-400">FindMyAgent</span> Connecting You to Your Dream Home with Trusted Agents</h1>
        <p className="text-base md:text-lg mt-4">Find. Connect. Buy. Your Perfect Agent Awaits.</p>
      </div>
      <div className="w-full md:w-1/2 flex flex-col items-center p-4 md:p-8">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg h-[600px] flex flex-col justify-between">
          <div className="overflow-y-auto h-full">
            {showOtpForm ? (
              <OTPForm onVerify={handleOtpVerification} email={emailForOtp} />
            ) : (
              <>
                <div className="flex border-b mb-4">
                  <button className={`w-1/2 py-2 text-lg font-semibold ${isLogin ? 'border-b-4 border-blue-500 text-blue-500' : 'text-gray-500'}`} onClick={toggleForm}>Sign In</button>
                  <button className={`w-1/2 py-2 text-lg font-semibold ${!isLogin ? 'border-b-4 border-blue-500 text-blue-500' : 'text-gray-500'}`} onClick={toggleForm}>Sign Up</button>
                </div>
                {isLogin ? (
                  <SignIn onLoginSuccess={handleLoginSuccess} />
                ) : (
                  <SignUp onSignupSuccess={handleSignupSuccess} />
                )}
              </>
            )}
          </div>
          {isLogin && !showOtpForm && (
            <div className="mt-4 text-center">
              <p className="text-gray-600">“Your dream home is just a click away!”</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AgentForm;