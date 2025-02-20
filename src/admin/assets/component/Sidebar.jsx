import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectSidebarState, toggleSidebar } from '../../reduxStore/features/sidebarSlice';
import {
  FaTachometerAlt,
  FaUsers,
  FaBox,
  FaUserAlt,
  FaRegListAlt,
  FaRegHandshake,
  FaRegBuilding,
  FaVideo,
  FaRegCommentDots,
  FaLaptopCode,
  FaHome,
  FaShoppingCart,
  FaPhoneAlt,
  FaHandshake,
  FaProductHunt,
  FaChevronRight,
  FaChevronLeft
} from 'react-icons/fa';

const Sidebar = () => {
  const isSidebarOpen = useSelector(selectSidebarState); // Get the sidebar state from Redux
  const dispatch = useDispatch(); // Dispatch action to toggle sidebar
  const location = useLocation(); // Get the current route

  const [expandedMenu, setExpandedMenu] = useState(null); // To track which menu is expanded

  const menuItems = [
    { key: 'dashboard', label: 'Dashboard', path: '/admin/dashboard', icon: <FaTachometerAlt /> },
    {
      key: 'Master',
      label: 'Master',
      icon: <FaUsers />,
      submenu: [
        { key: 'add-describe', label: 'Add Describe', path: '/admin/add/describe', icon: <FaRegListAlt /> },
        { key: 'add-role', label: 'Add Role', path: '/admin/add/role', icon: <FaUserAlt /> },
        { key: 'add-agency-describe', label: 'Add Agency Describe', path: '/admin/add/agency_describe', icon: <FaRegHandshake /> },
        { key: 'add-service-provider', label: 'Add Service Provider', path: '/admin/add/service_provide', icon: <FaRegBuilding /> },
        { key: 'add-sale-methods', label: 'Add Sale Methods', path: '/admin/add/sale/method', icon: <FaShoppingCart /> },
        { key: 'add-buyer-agreement', label: 'Add Buyer Agency Agreement', path: '/admin/add/duration', icon: <FaHandshake /> },
        { key: 'add-specialization', label: 'Add Specialization', path: '/admin/add/specalize', icon: <FaLaptopCode /> },
        { key: 'add-typically-work', label: 'Add Typically Work', path: '/admin/add/typically', icon: <FaHome /> },
        { key: 'add-video-call-tech', label: 'Add Video Call Tech', path: '/admin/add/videoCalltech', icon: <FaVideo /> },
        { key: 'add-digital-tech', label: 'Add DigitalTech', path: '/admin/add/digitalTech', icon: <FaLaptopCode /> },
        { key: 'add-property', label: 'Add Property', path: '/admin/add/property', icon: <FaHome /> },
        { key: 'add-purpose-purchase', label: 'Add Purpose Purchase', path: '/admin/add/purchase', icon: <FaShoppingCart /> },
        { key: 'add-preferred-communicate', label: 'Add Preferred Communicate', path: '/admin/add/communicate', icon: <FaRegCommentDots /> },
      ],
    },
    {
      key: 'products',
      label: 'Reports',
      icon: <FaBox />,
      submenu: [
        { key: 'all-products', label: 'Agent List', path: '/admin/show/agents', icon: <FaBox /> },
        { key: 'add-product', label: 'Users List', path: '/admin/user/view', icon: <FaProductHunt /> },
      ],
    },
    { key: 'chat', label: 'Chat', path: '/admin/chat', icon: <FaTachometerAlt /> },
  ];

  return (
    <aside
      className={`bg-white h-screen shadow-lg  fixed top-0 ${isSidebarOpen ? 'w-64' : 'w-20'
        } transition-all duration-300 ease-in-out overflow-hidden z-40 border-r`}
    >
      {/* Sidebar Header */}
      <div className="p-4 flex items-center justify-center mx-4">
        <img
          src="https://agentmatchr.com/images/findmyagent.svg" // Replace with your logo path
          alt="Logo"
          className={`transition-all duration-300 ${isSidebarOpen ? 'w-28 ' : 'w-8 h-8'}`}
        />
      </div>

      {/* Sidebar Navigation */}
      <nav className="mt-4 overflow-y-auto h-[calc(100vh-100px)] ">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            const isExpanded = expandedMenu === item.key;

            return (
              <li key={item.key}>
                {/* Main Menu Item */}
                <div
                  className={`flex items-center px-4 py-2 rounded-lg cursor-pointer mx-4 font-bold ${isActive ? 'bg-blue-50 text-blue-400' : 'text-gray-600 hover:bg-gray-100'
                    } transition-colors duration-200`}
                  onClick={() =>
                    item.submenu ? setExpandedMenu(isExpanded ? null : item.key) : null // Don't allow click for non-submenu items
                  }
                >
                  <span className="text-lg mr-4">{item.icon}</span>

                  {item.path ? (
                    <Link to={item.path}><span className={`flex-1 ${isSidebarOpen ? 'block' : 'hidden'}`}>{item.label}</span></Link>

                  ) : (
                    <span className={`flex-1 ${isSidebarOpen ? 'block' : 'hidden'}`}>{item.label}</span>
                  )}

                  {item.submenu && isSidebarOpen && (
                    <FaChevronRight
                      className={`text-sm transform ${isExpanded ? 'rotate-90' : ''} transition-transform`}
                    />
                  )}
                </div>

                {/* Submenu Items */}
                {item.submenu && isExpanded && isSidebarOpen && (
                  <ul className="ml-8 mt-2 space-y-1">
                    {item.submenu.map((subItem) => {
                      const isSubActive = location.pathname === subItem.path;

                      return (
                        <li key={subItem.key}>
                          <Link
                            to={subItem.path}
                            className={`flex items-center px-4 py-2 rounded-lg ${isSubActive ? 'bg-blue-50 text-blue-500' : 'text-gray-600 hover:bg-gray-100'
                              } transition-colors duration-200`}
                          >
                            <span className="mr-4">{subItem.icon}</span>
                            {subItem.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Sidebar Toggle Button */}
      <button
        className="absolute bottom-4 left-4 bg-blue-500 text-white p-2 rounded-full focus:outline-none transition-transform transform hover:scale-110"
        onClick={() => dispatch(toggleSidebar())}
      >
        {isSidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
      </button>
    </aside>
  );
};

export default Sidebar;
