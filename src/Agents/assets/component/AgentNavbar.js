import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaMoon, FaBell, FaTh } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdLanguage } from "react-icons/md";
import { Bell, User, MessageSquare, MessageCircle } from "lucide-react";



const AgentNavbar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showNavbarItems, setShowNavbarItems] = useState(false);
  const menuRef = useRef(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const notifRef = useRef(null);

  const avatarUrl = "https://api.dicebear.com/7.x/adventurer/svg?seed=Businessman";

  const user = {
    name: "John Doe",
    username: "johndoe",
    email: "johndoe@example.com",
    profilePic: avatarUrl,
  };

  // Close the menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowNavbarItems(false);
        setDropdownOpen(false);
        setShowNotifications(false);
      }
      if (panelRef.current && !panelRef.current.contains(event.target) && !event.target.closest("#profile-btn")) {
        setPanelOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target) && !event.target.closest("#notif-btn")) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    navigate("/login");
  };
  

const handleProfileClick = () => {
  navigate('/agents/profile');
};

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const toggleNavbarItems = () => {
    setShowNavbarItems(!showNavbarItems);
  };

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-white shadow-md">
      {/* Left: Logo */}
      <div className="flex items-center gap-3">
        <img src="/images/findmyagent.svg" alt="Logo" className="w-13 h-15" />
      </div>

      {/* Center: Navigation Links */}
      <div className={`hidden md:flex items-center gap-6 text-gray-700`}>
        <Link to="/apps" className="flex items-center gap-1 hover:text-blue-500">
          Apps <IoMdArrowDropdown />
        </Link>
        <Link to="/agents/About" className="hover:text-blue-500">About Us</Link>
        <Link to="/agents/Contact" className="hover:text-blue-500">Contact</Link>
        <Link to="/agents/Services" className="hover:text-blue-500">Services</Link>
      </div>

      {/* Right: Icons */}
      <div className="flex items-center gap-4">
        <FaSearch className="text-gray-600 cursor-pointer hover:text-blue-500" />
        <MdLanguage className="text-gray-600 cursor-pointer hover:text-blue-500" />
        <FaShoppingCart className="text-gray-600 cursor-pointer hover:text-blue-500" />
        <FaMoon className="text-gray-600 cursor-pointer hover:text-blue-500" />

        {/* Notification Icon with Clickable Functionality */}
        <div className="relative">
          <FaBell
            id="notif-btn"
            className="text-gray-600 cursor-pointer hover:text-blue-500"
            onClick={toggleNotifications}
          />
          <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white px-1.5 rounded-full">1</span>

          {/* Notification Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-white shadow-lg rounded-lg p-4 z-10">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">Notifications</span>
                <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">5 new</span>
              </div>

              <div className="space-y-3">
                <div className="flex gap-3 items-center">
                  <img src="/images/prof.png" alt="User  " className="w-8 h-8 rounded-full" />
                  <div>
                    <p className="font-medium">Roman Joined the Team!</p>
                    <p className="text-sm text-gray-500">Congratulate him</p>
                  </div>
                </div>

                <div className="flex gap-3 items-center">
                  <img src="/images/prof.png" alt="User  " className="w-8 h-8 rounded-full" />
                  <div>
                    <p className="font-medium">New message received</p>
                    <p className="text-sm text-gray-500">Salma sent you a message</p>
                  </div>
                </div>

                <div className="flex gap-3 items-center">
                  <img src="/images/prof.png" alt="User  " className="w-8 h-8 rounded-full" />
                  <div>
                    <p className="font-medium">New Payment received</p>
                    <p className="text-sm text-gray-500">Check your earnings</p>
                  </div>
                </div>
              </div>

              <div className="mt-3 text-center">
                <Link to="/notifications" className="text-blue-500 border border-blue-500 px-4 py-1 rounded-lg">
                  See All Notifications
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <div
            id="profile-btn"
            className="cursor-pointer"
            onClick={() => {
              setPanelOpen(!panelOpen);
              setShowNotifications(false);
            }}
          >
            <img
              src={user.profilePic}
              alt="Profile Avatar"
              className="w-10 h-10 rounded-full border border-gray-300"
            />
          </div>

          {panelOpen && (
            <div
              ref={panelRef}
              className="absolute right-0 top-full mt-2 w-72 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-30"
            >
              <div className="p-3 rounded-lg hover:bg-violet-100 transition">
                <div className="flex items-center space-x-4">
                  <img
                    src={user.profilePic}
                    alt="Profile Avatar"
                    className="w-12 h-12 rounded-full border border-gray-300"
                  />
                  <div>
                    <p className="text-lg font-semibold text-gray-800 hover:text-violet-700 transition">
                      {user.name}
                    </p>
                    <p className="text-sm text-gray-500">@{user.username}</p>
                  </div>
                </div>
              </div>

              <hr className="my-3 border-gray-300" />

              <div className="flex items-center space-x-3 py-2 p-2 rounded-lg cursor-pointer hover:bg-violet-200 transition">
  <User  className="w-6 h-6 text-gray-700" />
  <div>
    <Link to="/agents/profile" className="text-sm font-bold text-gray-800 hover:text-violet-700 transition">
      My Profile
    </Link>
    <p className="text-xs text-gray-600">Account Settings</p>
  </div>
</div>

              <div className="flex items-center space-x-3 py-2 p-2 rounded-lg cursor-pointer hover:bg-violet-200 transition">
                <MessageSquare className="w-6 h-6 text-gray-700" />
                <div>
                  <p className="text-sm font-bold text-gray-800 hover:text-violet-700 transition">
                    <Link to="/agents/chatbox">
                    My Inbox
                    </Link>
                  </p>
                  <p className="text-xs text-gray-600">Messages and Mails</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 py-2 p-2 rounded-lg cursor-pointer hover:bg-violet-200 transition">
  <MessageCircle className="w-6 h-6 text-gray-700" />
  <div>
    <Link to="/agents/chat" className="text-sm font-bold text-gray-800 hover:text-violet-700 transition">
      My Chats
    </Link>
    <p className="text-xs text-gray-600">Recent Chats</p>
  </div>
</div>

              <button
                onClick={handleLogout}
                className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition text-sm font-medium"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Grid Icon to Toggle Navbar Items (Visible on Small Screens) */}
      <div className="md:hidden relative" ref={menuRef}>
        <FaTh
          className="text-gray-600 text-xl cursor-pointer hover:text-blue-500"
          onClick={toggleNavbarItems}
        />

        {/* Expandable Menu for Small Screens */}
        {showNavbarItems && (
          <div className="absolute right-0 mt-3 w-40 bg-white shadow-lg rounded-lg p-4 z-10">
            <Link to="/apps" className="block px-2 py-1 hover:bg-gray-100">Apps</Link>
            <Link to="/agents/About" className="block px-2 py-1 hover:bg-gray-100">About Us</Link>
            <Link to="/agents/Contact" className="block px-2 py-1 hover:bg-gray-100">Contact</Link>
            <Link to="/agents/Services" className="block px-2 py-1 hover:bg-gray-100">Services</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default AgentNavbar;