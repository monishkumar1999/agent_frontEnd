import React, { useState } from "react";
import axios from "axios";
import InputField from "../pages/InputField"; // Adjust the path if necessary
import toast from "react-hot-toast"
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";



function OTPForm({ onVerify, email }) {
  const [otpInput, setOtpInput] = useState("");
  const [otpError, setOtpError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();



  const handleOtpChange = (e) => {
    setOtpInput(e.target.value);
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setOtpError("");

    if (!otpInput) {
      setOtpError("Please enter the OTP.");
      setIsLoading(false);
      return;
    }

    try {
      const otpData = { email, otp: otpInput };
      
      // Ensure correct API URL (double-check if `/api/agent/verify-otp` is the correct path)
      const response = await axiosInstance.post(`/agent/verify-otp`, otpData);

      console.log("OTP Verification Response:", response.data);
      toast.success(response.data.message);
      
      navigate("/agents"); // Redirect to Agent Home Page
      setTimeout(() => {
        navigate("/agents");
      }, 2000);


       
    } catch (error) {
  
      if (error.response) {
      
        setOtpError(error.response.data.message || "Invalid OTP. Please try again.");
        toast.error(error.response.data.message || "Invalid OTP.");
      } else {
        setOtpError("Something went wrong. Please try again later.");
        toast.error("Server Error.");
      }
    }

    setIsLoading(false);
  };

  const maskedEmail = email.replace(/(.{2})(.*)(@.*)/, "$1****$3");

  return (
    <form onSubmit={handleOtpSubmit} className="space-y-4">
      <h3 className="text-xl md:text-2xl font-semibold text-center">OTP Verification</h3>
      <p className="text-center">An OTP has been sent to {maskedEmail}. Please enter it below.</p>
      
      <InputField
        label="OTP"
        type="text"
        name="otp"
        value={otpInput}
        onChange={handleOtpChange}
        error={otpError}
      />

      <button
        type="submit"
        className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg"
        disabled={isLoading}
      >
        {isLoading ? "Verifying..." : "Verify OTP"}
      </button>
    </form>
  );
}

export default OTPForm;
