import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell, Mail, User, MessageSquare, MessageCircle } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const [panelOpen, setPanelOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const panelRef = useRef(null);
  const notifRef = useRef(null);

  const avatarUrl =
    "https://api.dicebear.com/7.x/adventurer/svg?seed=Businessman";

  const user = {
    name: "John Doe",
    username: "johndoe",
    email: "johndoe@example.com",
    profilePic: avatarUrl,
  };

  const notifications = [
    {
      id: 1,
      avatar: avatarUrl,
      title: "Roman Joined the Team!",
      message: "Congratulate him",
    },
    {
      id: 2,
      avatar: avatarUrl,
      title: "New message received",
      message: "Salma sent you a new message",
    },
    {
      id: 3,
      avatar: avatarUrl,
      title: "New Payment received",
      message: "Check your earnings",
    },
    {
      id: 4,
      avatar: avatarUrl,
      title: "Jolly completed tasks",
      message: "Assign her new tasks",
    },
    {
      id: 5,
      avatar: avatarUrl,
      title: "System Update",
      message: "New features added",
    },
  ];

  const handleLogout = () => {
    navigate("/login");
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target) &&
        !event.target.closest("#profile-btn")
      ) {
        setPanelOpen(false);
      }
      if (
        notifRef.current &&
        !notifRef.current.contains(event.target) &&
        !event.target.closest("#notif-btn")
      ) {
        setNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white text-gray-900 px-8 py-4 fixed top-0 left-0 w-full h-16 flex items-center justify-between z-20 shadow-md border-b border-gray-300">
      <h1 className="text-2xl font-bold text-violet-700">FindMy Agent</h1>

      <div className="flex items-center space-x-6 relative">
        {/* Notification Bell Icon */}
        <div className="relative">
          <Bell
            id="notif-btn"
            className="w-6 h-6 text-gray-700 cursor-pointer hover:text-violet-700 transition"
            onClick={() => {
              setNotifOpen(!notifOpen);
              setPanelOpen(false);
            }}
          />
          {notifOpen && (
            <div
              ref={notifRef}
              className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-30"
            >
              <div className="flex justify-between items-center border-b pb-2 mb-2">
                <p className="text-lg font-semibold text-gray-800">
                  Notifications
                </p>
                <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
                  5 new
                </span>
              </div>
              <div className="max-h-60 overflow-y-auto">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className="flex items-center space-x-3 py-2 hover:bg-gray-100 transition rounded-lg p-2 cursor-pointer"
                  >
                    <img
                      src={notif.avatar}
                      alt="User"
                      className="w-10 h-10 rounded-full border border-gray-300"
                    />
                    <div>
                      <p className="text-sm font-bold text-gray-800 hover:text-violet-700 transition">
                        {notif.title}
                      </p>
                      <p className="text-xs text-gray-600">{notif.message}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-3 text-blue-600 hover:underline text-sm font-medium">
                See all Notifications
              </button>
            </div>
          )}
        </div>

        {/* Profile Avatar */}
        <div className="relative">
          <div
            id="profile-btn"
            className="cursor-pointer"
            onClick={() => {
              setPanelOpen(!panelOpen);
              setNotifOpen(false);
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

              {/* My Profile Link */}
              <a
                href=""
                className="flex items-center space-x-3 py-2 p-2 rounded-lg cursor-pointer hover:bg-violet-200 transition"
              >
                <User className="w-6 h-6 text-gray-700" />
                <div>
                  <Link to="/user/userlay">
                    <p className="text-sm font-bold text-gray-800 hover:text-violet-700 transition">
                      My Profile
                    </p>
                  </Link>

                  <p className="text-xs text-gray-600">Account Settings</p>
                </div>
              </a>

              <div className="flex items-center space-x-3 py-2 p-2 rounded-lg cursor-pointer hover:bg-violet-200 transition">
                <MessageSquare className="w-6 h-6 text-gray-700" />
                <div>
                  <p className="text-sm font-bold text-gray-800 hover:text-violet-700 transition">
                    My Inbox
                  </p>
                  <p className="text-xs text-gray-600">Messages and Mails</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 py-2 p-2 rounded-lg cursor-pointer hover:bg-violet-200 transition">
                <MessageCircle className="w-6 h-6 text-gray-700" />
                <div>
                  <Link to="/user/chats">
                    <p className="text-sm font-bold text-gray-800 hover:text-violet-700 transition">
                      Admin chat
                    </p>
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
    </header>
  );
};

export default Header;
