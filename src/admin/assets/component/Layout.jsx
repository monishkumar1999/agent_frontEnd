// src/components/Layout.js
import React from 'react';
import Header from './Header';  // Correct path to Header
import Sidebar from './Sidebar';  // Correct path to Sidebar
import { useSelector } from 'react-redux';
import { selectSidebarState } from '../../reduxStore/features/sidebarSlice';

const Layout = ({ children }) => {
  const isSidebarOpen = useSelector(selectSidebarState);  // Get sidebar state from Redux

  return (
    <div className="flex flex-col h-screen w-screen">
      {/* Header */}
      <Header />

      <div className="flex flex-1 pt-24">  {/* Added padding to avoid overlap with fixed header */}
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <main
          className={`flex-1 p-6 bg-gray-50 transition-all duration-300 ease-in-out ${
            isSidebarOpen ? 'ml-64' : 'ml-20'
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
