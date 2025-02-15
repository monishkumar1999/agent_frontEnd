import { useState } from "react";
import LoginForm from "../pages/user/LoginForm";
import SignInForm from "../pages/user/SigninForm";
import OTPForm from "../pages/user/OtpForm";

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState("signup");
  const [showOTP, setShowOTP] = useState(false);

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
              onClick={() => setActiveTab("signup")}
            >
              Sign Up
            </button>
            <button
              className={`w-1/2 text-center py-3 font-semibold transition ${
                activeTab === "signin"
                  ? "border-b-4 border-blue-500 text-blue-500"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("signin")}
            >
              Sign In
            </button>
          </div>
        )}

        {/* Forms */}
        <div className="w-full mt-4 flex flex-col justify-between">
          {showOTP ? (
            <OTPForm onVerify={() => console.log("Redirect to another page")} />
          ) : activeTab === "signup" ? (
            <LoginForm onSubmit={() => setShowOTP(true)} />
          ) : (
            <SignInForm onSubmit={() => setShowOTP(true)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
