import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // ✅ Correct import
import axiosInstance from "../utils/axiosInstance";

const HeaderComponent = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 flex flex-wrap items-center justify-between py-4 px-4 sm:px-8 md:px-16 bg-white transition-shadow duration-300 ${
        isScrolled ? "shadow-md" : ""
      }`}
    >
      <div className="flex items-center mb-4 sm:mb-0">
        <a href="/">
          <img
            src="/images/findmyagent.svg"
            alt="FindMyAgent Logo"
            className="w-[120px] sm:w-[150px] h-[30px] sm:h-[40px]"
          />
        </a>
      </div>

      <a
        href="/HowItWorks"
        className="bg-[#8046F1] text-white hover:bg-purple-700 rounded-full px-4 py-2 font-instrument-sans transition-colors duration-200"
      >
        Become An Agent
      </a>

      <GoogleLogin
        onSuccess={ async  (credentialResponse) => {
          const decoded = jwtDecode(credentialResponse.credential); // ✅ Use named import
          const email = decoded.email;
          console.log("📧 User Email:", email);

         await axiosInstance.post('agent/google-login',{email})
         
        }}
        onError={() => {
          console.log("❌ Login Failed");
        }}
        useOneTap
        ux_mode="popup"
      />
    </header>
  );
};

export default HeaderComponent;
