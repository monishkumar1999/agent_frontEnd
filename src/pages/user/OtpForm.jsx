import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Assuming you're using react-router for navigation

const OTPForm = ({ email, onVerify }) => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleOTPChange = (e) => {
    setOtp(e.target.value);
  };

  const handleVerifyClick = () => {
    onVerify(); // Perform the verification
    navigate("/another-page"); // Redirect to another page after verification
  };

  return (
    <div className="flex flex-col items-center">
      <p className="text-gray-700 mb-4">
        An OTP is sent to: <span className="font-bold">{email}</span>
      </p>
      <label className="text-gray-600 font-bold text-left mb-2">OTP</label>
      <input
        type="text"
        value={otp}
        onChange={handleOTPChange}
        className="border p-2 rounded w-full mb-4"
        placeholder="Enter OTP"
      />

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleVerifyClick}
        disabled={!otp} // Disable button if OTP is not entered
      >
        Verify OTP
      </button>
    </div>
  );
};

export default OTPForm;
