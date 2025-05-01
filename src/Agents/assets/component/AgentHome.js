import React from "react";
import { FaHome } from "react-icons/fa";

const AgentHome = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-indigo-500 p-4 rounded-full">
            <FaHome className="text-white text-3xl" />
          </div>
        </div>
        <h1 className="text-3xl font-extrabold text-gray-800 mb-4">Welcome to Your Agent Dashboard</h1>
        <p className="text-gray-600 mb-8">
          Find the best properties, connect with buyers, and close deals effortlessly.
        </p>
        <button className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 transition duration-300">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default AgentHome;
