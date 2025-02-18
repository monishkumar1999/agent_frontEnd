import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Bell } from "lucide-react"; // Notification bell icon

const Header = () => {
  const navigate = useNavigate();
  const [panelOpen, setPanelOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  // Dummy user details
  const user = {
    name: "John Doe",
    username: "johndoe",
    profilePic: "https://i.pravatar.cc/100?img=7", // Cartoon profile image
  };

  // Sample notifications
  const notifications = [
    "New message from Alex",
    "Your profile was viewed 5 times today",
    "Reminder: Meeting at 3:00 PM",
    "New connection request",
    "Check out the latest blog post!",
  ];

  // Logout function
  const handleLogout = () => {
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  return (
    <header className="bg-white text-gray-900 px-8 py-4 fixed top-0 left-0 w-full h-16 flex items-center justify-between z-20 shadow-md border-b border-gray-300 font-sans">
      {/* Logo */}
      <h1 className="text-2xl font-bold tracking-wide text-violet-700">
        FindMy Agent
      </h1>

      {/* Navigation Links */}
      <nav className="flex space-x-6 text-lg font-medium text-gray-700">
        <Link to="/" className="hover:text-violet-700 transition">
          Home
        </Link>
        <Link to="/about" className="hover:text-violet-700 transition">
          About Us
        </Link>
        <Link to="/blogs" className="hover:text-violet-700 transition">
          Blogs
        </Link>
      </nav>

      {/* Right-side icons */}
      <div className="flex items-center space-x-6 relative">
        {/* Notification Bell Icon */}
        <div className="relative">
          <Bell
            className="w-6 h-6 text-gray-700 cursor-pointer hover:text-violet-700 transition"
            onClick={() => setNotifOpen(!notifOpen)}
          />
          {notifOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg p-4 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
              <p className="text-lg font-semibold border-b pb-2 mb-2 text-gray-800">
                Notifications
              </p>
              {notifications.map((notif, index) => (
                <p
                  key={index}
                  className="text-sm text-gray-600 hover:text-violet-600 cursor-pointer py-1"
                >
                  {notif}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Profile Section (Circle with Image) */}
        <div
          className="relative cursor-pointer"
          onClick={() => setPanelOpen(!panelOpen)}
        >
          <img
            src={user.profilePic}
            alt="Profile"
            className="w-10 h-10 rounded-full border border-gray-300"
          />
        </div>

        {/* Profile Panel */}
        {panelOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg p-4">
            {/* Profile Details */}
            <div className="flex items-center space-x-4">
              <img
                src={user.profilePic}
                alt="Profile"
                className="w-12 h-12 rounded-full border border-gray-300"
              />
              <div>
                <p className="text-lg font-semibold text-gray-800">
                  {user.name}
                </p>
                <p className="text-sm text-gray-500">@{user.username}</p>
              </div>
            </div>

            {/* Horizontal Line */}
            <hr className="my-3 border-gray-300" />

            {/* Profile Links */}
            <div className="flex flex-col space-y-2">
              <Link
                to="/profile"
                className="text-violet-600 hover:underline text-sm font-medium"
              >
                View Full Profile
              </Link>
              <Link
                to="/chats"
                className="text-violet-600 hover:underline text-sm font-medium"
              >
                Chats
              </Link>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full mt-3 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition text-sm font-medium"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Toast Notification */}
      <Toaster position="top-center" reverseOrder={false} />
    </header>
  );
};

export default Header;
