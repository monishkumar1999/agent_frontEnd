import React from "react";
import { FaBuilding, FaComments, FaShieldAlt, FaChartLine } from "react-icons/fa";

const Services = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-2xl w-full">
        <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-8">Our Services</h1>
        
        <ul className="space-y-6">
          <li className="flex items-center space-x-4">
            <FaBuilding className="text-indigo-600 text-2xl" />
            <span className="text-gray-700 text-lg">Property Listing</span>
          </li>
          <li className="flex items-center space-x-4">
            <FaComments className="text-indigo-600 text-2xl" />
            <span className="text-gray-700 text-lg">Buyer-Agent Communication</span>
          </li>
          <li className="flex items-center space-x-4">
            <FaShieldAlt className="text-indigo-600 text-2xl" />
            <span className="text-gray-700 text-lg">Secure Transactions</span>
          </li>
          <li className="flex items-center space-x-4">
            <FaChartLine className="text-indigo-600 text-2xl" />
            <span className="text-gray-700 text-lg">Market Insights & Analytics</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Services;
