import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SignUpForm from "./user/SignUpForm";
import SignInForm from "../pages/user/SigninForm";
import OTPForm from "../pages/user/OtpForm";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode"; // ✅ Import jwtDecode

const LoginPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("signup");
  const [showOTP, setShowOTP] = useState(false);
  const [userEmail, setUserEmail] = useState(""); // Store email

  const token = Cookies.get("authToken"); // ✅ Get token from cookies

   
  // ✅ Redirect only if token exists AND user has role "user"
  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token); // ✅ Decode JWT token
        console.log("Decoded Token:", decodedToken); // Debugging log

        if (decodedToken.role === "user") {
          navigate("/user/profile", { replace: true }); // ✅ Redirect user to profile
        }
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, [token, navigate]);

  // Function to reset state when switching tabs
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setShowOTP(false);
    setUserEmail(""); // Reset email when switching tabs
  };

  return (
    <div className="relative min-h-screen flex items-center">
      {/* Background Image (Hidden on Mobile) */}
      <div
        className="absolute inset-0 bg-cover bg-center md:block hidden"
        style={{ backgroundImage: "url('/images/background/Houseimage.jpg')" }}
      ></div>

      {/* Overlay for better visibility */}
      <div className="absolute inset-0 md:block hidden"></div>

      {/* Form Container */}
      <div className="relative z-10 w-full max-w-lg bg-white shadow-lg rounded-lg p-6 flex flex-col ml-auto mr-8 md:mr-16 lg:mr-24 min-h-[400px]">
        {/* Tabs */}
        {!showOTP && (
          <div className="flex w-full">
            <button
              className={`w-1/2 text-center py-3 font-semibold transition ${
                activeTab === "signup"
                  ? "border-b-4 border-blue-500 text-blue-500"
                  : "text-gray-500"
              }`}
              onClick={() => handleTabChange("signup")}
            >
              Sign Up
            </button>
            <button
              className={`w-1/2 text-center py-3 font-semibold transition ${
                activeTab === "signin"
                  ? "border-b-4 border-blue-500 text-blue-500"
                  : "text-gray-500"
              }`}
              onClick={() => handleTabChange("signin")}
            >
              Sign In
            </button>
          </div>
        )}

        {/* Forms */}
        <div className="w-full mt-4 flex flex-col justify-between">
          {showOTP ? (
            <OTPForm
              email={userEmail}
              onVerify={() => {
                navigate("/user/profile"); // ✅ Redirect to user profile after OTP verification
              }}
            />
          ) : activeTab === "signup" ? (
            <SignUpForm
              onSubmit={(email) => {
                setUserEmail(email); // Store email
                setShowOTP(true);
              }}
            />
          ) : (
            <SignInForm
              onSubmit={(email) => {
                setUserEmail(email); // Store email
                setShowOTP(true);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
