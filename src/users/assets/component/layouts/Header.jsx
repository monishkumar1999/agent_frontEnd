import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { User, MessageCircle } from "lucide-react";

const navigation = [
  { name: "Home", href: "/", current: false },
  { name: "Find Agent", href: "/user/details", current: false },
  { name: "Your Proposal", href: "/user/proposal", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const navigate = useNavigate();
  const avatarUrl =
    "https://api.dicebear.com/7.x/adventurer/svg?seed=Businessman";
  const user = { name: "John Doe", username: "johndoe", profilePic: avatarUrl };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <Disclosure
      as="nav"
      className="bg-white text-gray-900 border-b border-gray-300 shadow-md fixed top-0 left-0 w-full z-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <DisclosureButton className="sm:hidden p-2 text-gray-700 hover:text-violet-700">
              <Bars3Icon className="size-6" />
            </DisclosureButton>
            <h1 className="text-2xl font-bold text-violet-700 ml-2">
              FindMy Agent
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-700 hover:text-violet-700 text-lg"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {/* Notifications Button */}
            <button className="relative p-2 text-gray-700 hover:text-violet-700">
              <BellIcon className="size-6" />
            </button>

            {/* Profile Dropdown */}
            <Menu as="div" className="relative">
              <MenuButton className="flex items-center focus:outline-none">
                <img
                  src={user.profilePic}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border border-gray-300"
                />
              </MenuButton>
              <MenuItems className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 shadow-lg rounded-md py-1 ring-1 ring-black/5 focus:outline-none">
                <MenuItem>
                  {({ active }) => (
                    <NavLink
                      to="/user/profile"
                      className={classNames(
                        active ? "bg-violet-100" : "",
                        "flex items-center space-x-3 px-4 py-2 text-gray-700"
                      )}
                    >
                      <User className="size-5" /> <span>My Profile</span>
                    </NavLink>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ active }) => (
                    <NavLink
                      to="/user/chats"
                      className={classNames(
                        active ? "bg-violet-100" : "",
                        "flex items-center space-x-3 px-4 py-2 text-gray-700"
                      )}
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
                      className={classNames(
                        active ? "bg-violet-100" : "",
                        "block w-full text-left px-4 py-2 text-gray-700"
                      )}
                    >
                      Logout
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
        <div className="space-y-1 px-2 pb-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as={NavLink}
              to={item.href}
              className="block text-gray-700 hover:bg-violet-100 px-3 py-2 rounded-md"
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
