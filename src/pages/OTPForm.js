import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";

const OTPForm = ({ onVerify, email }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setOtpError("");

    const otpValue = otp.join("");
    if (otpValue.length < 6) {
      setOtpError("Please enter the complete OTP.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.post(`/agent/verify-otp`, { email, otp: otpValue });
      toast.success(response.data.message);
      setTimeout(() => navigate("/agents"), 2000);
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Invalid OTP. Please try again.";
      setOtpError(errorMsg);
      toast.error(errorMsg);
    }
    setIsLoading(false);
  };

  const maskedEmail = email.replace(/(.{2})(.*)(@.*)/, "$1****$3");

  return (
    <div className="max-w-sm mx-auto p-6 bg-gray-100 shadow-lg rounded-xl">
      <h3 className="text-2xl font-semibold text-center">OTP Verification</h3>
      <p className="text-center text-gray-600">An OTP has been sent to <strong>{maskedEmail}</strong>. Please enter it below.</p>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div className="flex justify-center gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              className="w-12 h-12 text-xl text-center border rounded-lg focus:ring focus:ring-blue-300"
            />
          ))}
        </div>
        {otpError && <p className="text-red-500 text-center">{otpError}</p>}
        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
          disabled={isLoading}
        >
          {isLoading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
    </div>
  );
};

export default OTPForm;
