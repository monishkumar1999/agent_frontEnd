import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import { FaUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

const HeaderComponent = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [userData, setUserData] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);

    const token = Cookies.get('authToken');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log(decoded)
        setUserData({
          role: decoded.role,
          name: decoded.name || decoded.email || "User",
        });
      } catch (error) {
        console.error("Invalid token:", error);
        setUserData(null);
      }
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    Cookies.remove("authToken");
    setUserData(null);
    navigate("/"); // Redirect after logout
  };

  return (
    <header
      className={`sticky top-0 z-50 flex justify-between items-center py-3 px-4 sm:px-6 lg:px-8 bg-white transition-shadow duration-300 ${
        isScrolled ? "shadow-md" : ""
      }`}
    >
      {/* Logo */}
      <a href="/" aria-label="FindMyAgent Home">
        <img
          src="/images/logo.png"
          alt="FindMyAgent Logo"
          className="w-[100px] sm:w-[130px]"
        />
      </a>

      {/* Navigation / User Info */}
      <div className="ml-auto flex items-center space-x-4">
        {userData ? (
          <div className="relative">
            <button
              className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-pink-500 text-white font-medium hover:opacity-90 transition"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <FaUserCircle className="text-lg" />
              <span className="hidden sm:inline">Hello, {userData.name}</span>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden z-50">
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                >
                  <FiLogOut className="mr-2" /> Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <a
              href="/register"
              className="text-sm sm:text-base px-4 py-2 bg-gradient-to-r from-blue-500 to-pink-500 text-white font-medium rounded-full shadow hover:opacity-90 transition"
            >
              Become An Agent
            </a>
            <Link to="/user/login">
              <button className="text-sm sm:text-base px-4 py-2 bg-gradient-to-r from-blue-500 to-pink-500 text-white font-medium rounded-full shadow hover:opacity-90 transition">
                Buyer Login
              </button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default HeaderComponent;
