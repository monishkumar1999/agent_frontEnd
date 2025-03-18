import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon, BellIcon } from "@heroicons/react/24/outline";
import { NavLink, useNavigate } from "react-router-dom";
import { User, MessageCircle, LogOut } from "lucide-react";
import { useState } from "react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Find Agent", href: "/user/details" },
  { name: "Your Proposal", href: "/user/proposalslist" },
  { name: "Your Requests", href: "/user/requests" },
];

export default function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const avatarUrl =
    "https://api.dicebear.com/7.x/adventurer/svg?seed=Businessman";
  const user = { name: "John Doe", username: "johndoe", profilePic: avatarUrl };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <Disclosure
      as="nav"
      className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-500 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Mobile Menu Button */}
          <div className="flex items-center space-x-3">
            <DisclosureButton
              className="sm:hidden p-2 text-white hover:bg-white/20 rounded-md transition-all"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation menu"
            >
              {menuOpen ? (
                <XMarkIcon className="size-6" />
              ) : (
                <Bars3Icon className="size-6" />
              )}
            </DisclosureButton>
            <h1 className="text-2xl font-bold text-white drop-shadow-lg tracking-wide">
              FindMy Agent
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex space-x-8">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `text-lg px-4 py-1 rounded-lg transition-all duration-300 ${
                    isActive
                      ? "text-white font-semibold bg-white/20 shadow-md"
                      : "text-gray-200 hover:text-white hover:bg-white/20"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Right Section: Notifications & Profile */}
          <div className="flex items-center space-x-4">
            {/* Notifications Button */}
            <button
              aria-label="Notifications"
              className="relative p-2 text-white hover:bg-white/20 rounded-md transition-all"
            >
              <BellIcon className="size-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full shadow-md">
                3
              </span>
            </button>

            {/* Profile Dropdown with Glassmorphism */}
            <Menu as="div" className="relative">
              <MenuButton className="flex items-center focus:outline-none">
                <img
                  src={user.profilePic}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border border-white shadow-md hover:scale-105 transition-all duration-300"
                />
              </MenuButton>
              <MenuItems className="absolute right-0 mt-2 w-52 bg-white/10 backdrop-blur-lg border border-white/30 shadow-xl rounded-lg py-1 focus:outline-none">
                <MenuItem>
                  {({ active }) => (
                    <NavLink
                      to="/user/profile"
                      className={`flex items-center space-x-3 px-4 py-2 text-black ${
                        active ? "bg-white/20" : ""
                      }`}
                    >
                      <User className="size-5" /> <span>My Profile</span>
                    </NavLink>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ active }) => (
                    <NavLink
                      to="/user/chats"
                      className={`flex items-center space-x-3 px-4 py-2 text-black ${
                        active ? "bg-white/20" : ""
                      }`}
                    >
                      <MessageCircle className="size-5" />{" "}
                      <span>Admin Chat</span>
                    </NavLink>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ active }) => (
                    <button
                      onClick={handleLogout}
                      className={`flex items-center space-x-3 w-full text-left px-4 py-2 text-black ${
                        active ? "bg-white/20" : ""
                      }`}
                    >
                      <LogOut className="size-5" /> <span>Logout</span>
                    </button>
                  )}
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      <DisclosurePanel className="sm:hidden">
        <div className="bg-gradient-to-b from-blue-600 via-purple-600 to-indigo-500 px-6 py-4 space-y-2 rounded-b-lg">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as={NavLink}
              to={item.href}
              className={({ isActive }) =>
                `block text-lg px-4 py-2 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "text-white font-semibold bg-white/20 shadow-md"
                    : "text-gray-200 hover:text-white hover:bg-white/20"
                }`
              }
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
