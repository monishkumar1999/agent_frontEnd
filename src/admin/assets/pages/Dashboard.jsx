import React, { useState } from "react";
import {
  FaUsers,
  FaBell,
  FaPlus,
  FaEye,
  FaChartLine,
  FaSearch,
} from "react-icons/fa";

const Dashboard = () => {
  const [value, setValue] = useState("");

  // Placeholder data for cards
  const stats = [
    { title: "Total Users", value: "1,234", icon: <FaUsers />, color: "bg-purple-100 text-purple-600" },
    { title: "Active Agents", value: "56", icon: <FaChartLine />, color: "bg-blue-100 text-blue-600" },
    { title: "Pending Requests", value: "12", icon: <FaBell />, color: "bg-yellow-100 text-yellow-600" },
  ];

  const recentActivities = [
    { id: 1, description: "Agent John Doe submitted a proposal", time: "2 hours ago" },
    { id: 2, description: "User Jane Smith logged in", time: "4 hours ago" },
    { id: 3, description: "New user registered", time: "Yesterday" },
  ];

  const actions = [
    { label: "View All Agents", icon: <FaEye />, action: () => alert("View Agents clicked") },
    { label: "Add New User", icon: <FaPlus />, action: () => alert("Add User clicked") },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Dashboard</h1>
        <div className="relative w-full max-w-md">
          <input
            id="floating-label-input"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="peer w-full border-2 border-purple-300 rounded-lg p-3 text-black focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-transparent"
            placeholder="Search"
          />
          <label
            htmlFor="floating-label-input"
            className={`absolute left-3 top-3 text-gray-500 text-sm transition-all ${
              value
                ? "top-[-10px] text-black text-sm"
                : "peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base"
            } peer-focus:top-[-10px] peer-focus:text-black peer-focus:text-sm bg-white px-1 rounded-md`}
          >
            Search Agents or Users
          </label>
          <FaSearch className="absolute right-3 top-3 text-gray-400" />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center"
          >
            <div className={`p-3 rounded-full ${stat.color} mr-4`}>
              {stat.icon}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity and Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Activity Card */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
          <ul className="space-y-4">
            {recentActivities.map((activity) => (
              <li key={activity.id} className="flex justify-between items-center">
                <div>
                  <p className="text-gray-700">{activity.description}</p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
                <button className="text-purple-600 hover:text-purple-800 text-sm">
                  View
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Actions Card */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="space-y-4">
            {actions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className="w-full flex items-center p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
              >
                <div className="p-2 bg-purple-200 rounded-full mr-3 text-purple-600">
                  {action.icon}
                </div>
                <span className="text-gray-700 font-medium">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;