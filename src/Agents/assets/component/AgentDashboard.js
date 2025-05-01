import React from "react";

const AgentDashboard = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full text-center">
        
        <h2 className="text-3xl font-extrabold text-green-600">Welcome Back!</h2>
        
        <p className="text-gray-600 mt-4 text-lg">
          You have successfully logged in to your dashboard.
        </p>

        <div className="mt-8">
          <h1 className="text-2xl font-bold text-gray-900">Agent Dashboard</h1>
          <p className="mt-2 text-gray-500 text-sm">
            Manage your tasks, clients, and updates from here.
          </p>
        </div>

        <div className="mt-6">
          <button className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full text-sm font-semibold transition">
            View Tasks
          </button>
        </div>

      </div>
    </div>
  );
};

export default AgentDashboard;
