import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import { Typography, Button, Space } from "antd";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import loadingBtn from "./lottiefile/loadingBtn.json";
import Lottie from "lottie-react";

const { Text, Title } = Typography;

const OTPForm = ({ email, onVerify }) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Debugging: Log email when OTPForm is loaded
  useEffect(() => {}, [email]);

  const handleVerifyClick = async () => {
    if (!email || otp.length < 6) {
      toast.error("Email and OTP are required");
      return;
    }

    setLoading(true);

    // ✅ Debugging: Log request payload before sending request
    console.log("Verifying OTP with payload:", { email, otp });

    try {
      const response = await axiosInstance.post("/user/verify-otp", {
        email: email, // Ensure email is sent
        otp: otp,
      });

      console.log("OTP Verification Response:", response);
      toast.success(response.data.message);
      onVerify();
      navigate("/user/success");
    } catch (e) {
      console.error("OTP Verification Error:", e.response);
      toast.error(e.response?.data?.message || "OTP verification failed");
    }

    setLoading(false);
  };

  return (
    <Space
      direction="vertical"
      size="middle"
      style={{ display: "flex", alignItems: "center", textAlign: "center" }}
    >
      <Title level={3}>Verify Email Address</Title>
      <Text type="secondary">We have sent an OTP to your email:</Text>
      <Text strong>{email}</Text>

      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={6}
        renderSeparator={<span>-</span>}
        renderInput={(props, index) => (
          <input
            {...props}
            className={`w-10 h-10 text-white text-center text-lg border rounded-md transition-all duration-300 outline-none 
            ${
              otp[index]
                ? "bg-blue-500 border-blue-700"
                : "bg-gray-300 border-gray-500"
            }`}
            style={{ width: "2.5rem", height: "2.5rem" }}
            aria-label={`OTP Input ${index + 1}`}
          />
        )}
      />

      <Text type="secondary">
        Didn't receive OTP? <a href="#">Resend OTP</a>
      </Text>

      <Button
        type="primary"
        onClick={handleVerifyClick}
        disabled={!email || otp.length < 6 || loading}
      >
        {loading ? (
          <Lottie animationData={loadingBtn} className="w-10 h-10" />
        ) : (
          "Verify OTP"
        )}
      </Button>
    </Space>
  );
};

export default OTPForm;
