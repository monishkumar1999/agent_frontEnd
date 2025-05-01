import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

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
      className={`sticky top-0 z-50 flex items-center justify-between py-3 px-4 sm:px-6 lg:px-16 bg-white transition-shadow duration-300 ${
        isScrolled ? "shadow-md" : ""
      }`}
    >
      {/* Logo */}
      <div className="flex items-center">
        <a href="/" aria-label="FindMyAgent Home">
          <h1 className="font-bold text-purple-600 text-2xl font-noto">Buyers First</h1>
        </a>
      </div>

      {/* Navigation Buttons */}
      <div className="ml-auto flex items-center space-x-2 sm:space-x-4">
        {/* Become an Agent Button - Responsive */}
        <a
          href="/register"
          className="text-sm sm:text-base px-3 py-1.5 sm:px-5 sm:py-2 bg-gradient-to-r from-blue-500 to-pink-500 text-white font-medium rounded-lg sm:rounded-xl shadow hover:opacity-90 transition"
        >
          Become An Agent
        </a>

        {/* Login Button */}
        <Link to="/user/login">
          <button className="text-sm sm:text-base px-3 py-1.5 sm:px-5 sm:py-2 bg-gradient-to-r from-blue-500 to-pink-500 text-white font-medium rounded-lg sm:rounded-xl shadow hover:opacity-90 transition">
            User
          </button>
        </Link>
      </div>
    </header>
  );
};

export default HeaderComponent;
