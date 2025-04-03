import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaMoon, FaBell } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdLanguage } from "react-icons/md";
import { Bell, User, MessageSquare, MessageCircle } from "lucide-react";
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import axiosInstance from "../../../utils/axiosInstance"; // Import your axios instance
import EditProfilePhoto from "../component/EditProfilePhoto";

const NOPROFILE_BASE = "http://localhost:8000"; // Base URL for profile images

const Aheader = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showNavbarItems, setShowNavbarItems] = useState(false);
  const menuRef = useRef(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const notifRef = useRef(null);
  // Inside Aheader component
const [user, setUser ] = useState({}); // State for user details

// Fetch agent details
useEffect(() => {
    const fetchAgentDetails = async () => {
        try {
            const response = await axiosInstance.get("/agent/get-agent-details");
            if (response.data.data) {
                const { firstName, lastName, username, email, profile_img } = response.data.data;
                const avatarUrl = profile_img ? `${NOPROFILE_BASE}${profile_img}` : "https://api.dicebear.com/7.x/adventurer/svg?seed=Businessman";
                setUser ({
                    name: `${firstName} ${lastName}`,
                    username: email,
                    profilePic: avatarUrl,
                });
            }
        } catch (error) {
            console.error("Error fetching agent details:", error);
        }
    };

    fetchAgentDetails();
}, []);

// Function to handle image change
const handleImageChange = (newImage) => {
    setUser ((prevUser ) => ({
        ...prevUser ,
        profilePic: newImage, // Update the profile picture immediately
    }));
};

// Pass handleImageChange to EditProfilePhoto
<EditProfilePhoto onImageChange={handleImageChange} />

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
    navigate("/register");
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
    <Disclosure as="nav" className="bg-white shadow-md">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img
                alt="Your Company"
                src="/images/findmyagent.svg"
                className="h-8 w-auto"
              />
            </div>
            <div className="hidden sm:flex justify-center w-full">
              <div className="flex space-x-16"> {/* Adjust space-x as needed */}
                <Link to="/agents/Home" className="hover:text-blue-500">Home</Link>
                <Link to="/agents/About" className="hover:text-blue-500">About Us</Link>
                <Link to="/agents/Contact" className="hover:text-blue-500">Contact</Link>
                <Link to="/agents/Services" className="hover:text-blue-500">Services</Link>
                <Link to="/agents/form" className="hover:text-blue-500">Form</Link>
              </div>
            </div>
          </div>

          {/* Right: Icons */}
          <div className="flex items-center gap-4">
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
                      <img src="/images/prof.png" alt="User " className="w-8 h-8 rounded-full" />
                      <div>
                        <p className="font-medium">Roman Joined the Team!</p>
                        <p className="text-sm text-gray-500">Congratulate him</p>
                      </div>
                    </div>

                    <div className="flex gap-3 items-center">
                      <img src="/images/prof.png" alt="User " className="w-8 h-8 rounded-full" />
                      <div>
                        <p className="font-medium">New message received</p>
                        <p className="text-sm text-gray-500">Salma sent you a message</p>
                      </div>
                    </div>

                    <div className="flex gap-3 items-center">
                      <img src="/images/prof.png" alt="User " className="w-8 h-8 rounded-full" />
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
                  src={user.profilePic || "https://api.dicebear.com/7.x/adventurer/svg?seed=Businessman"} // Fallback to default avatar
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
                    <div className=" flex items-center space-x-4">
                      <img
                        src={user.profilePic || "https://api.dicebear.com/7.x/adventurer/svg?seed=Businessman"} // Fallback to default avatar
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
                        <Link to="/agents/chat">Chat with Users</Link>
                      </p>
                      <p className="text-xs text-gray-600">Messages and Mails</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 py-2 p-2 rounded-lg cursor-pointer hover:bg-violet-200 transition">
                    <MessageCircle className="w-6 h-6 text-gray-700" />
                    <div>
                      <Link to="/agents/adminchat" className="text-sm font-bold text-gray-800 hover:text-violet-700 transition">
                        Admin Chat
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
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          <Link to="/agents/Home" className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100">Home</Link>
          <Link to="/agents/About" className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100">About Us</Link>
          <Link to="/agents/Contact" className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100">Contact</Link>
          <Link to="/agents/Services" className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100">Services</Link>
          <Link to="/agents/form" className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100">Form</Link>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};

export default Aheader;