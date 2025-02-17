import React, { useState, useEffect } from "react";
import InputField from "../pages/InputField"; // Adjust the import path as necessary

function OTPForm({ onVerify, email }) {
  const [otpInput, setOtpInput] = useState("");
  const [otpError, setOtpError] = useState("");
  const [otpSuccess, setOtpSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [timer, setTimer] = useState(30); // Timer for resend OTP

  useEffect(() => {
    if (!canResend) {
      const countdown = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(countdown);
            setCanResend(true);
            return 30; // Reset timer
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [canResend]);

  const handleOtpChange = (e) => {
    setOtpInput(e.target.value);
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setOtpError("");
    setOtpSuccess("");

    if (otpInput) {
      const isVerified = await onVerify(otpInput); // Assume onVerify returns a promise
      if (isVerified) {
        setOtpSuccess("OTP verified successfully!");
      } else {
        setOtpError("Invalid OTP. Please try again.");
      }
    } else {
      setOtpError("Please enter the OTP.");
    }
    setIsLoading(false);
  };

  const resendOtp = () => {
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("New OTP generated:", generatedOtp);
    // Here you would typically send the new OTP to the user's email
    alert(`A new OTP has been sent to ${email}.`);
    setCanResend(false); // Disable resend button
    setTimer(30); // Reset timer
  };

  const maskedEmail = email.replace(/(.{2})(.*)(@.*)/, "$1****$3");

  return (
    <form onSubmit={handleOtpSubmit} className="space-y-4">
      <h3 className="text-xl md:text-2xl font-semibold text-center">OTP Verification</h3>
      <p className="text-center">An OTP has been sent to {maskedEmail}. It is valid for 5 minutes.</p>
      <InputField label="OTP" type="text" name="otp" value={otpInput} onChange={handleOtpChange} error={otpError} />
      {isLoading ? (
        <p className="text-center">Verifying...</p>
      ) : (
        <>
          <button type="submit" className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg">Verify OTP</button>
          <button 
            type="button" 
            onClick={resendOtp} 
            className={`w-full py-3 border rounded-lg mt-2 ${canResend ? 'text-blue-500' : 'text-gray-400 cursor-not-allowed'}`} 
            disabled={!canResend}
          >
            {canResend ? "Resend OTP" : `Resend OTP in ${timer}s`}
          </button>
        </>
      )}
      {otpSuccess && <p className="text-green-500 text-sm text-center">{otpSuccess}</p>}
    </form>
  );
}

export default OTPForm;