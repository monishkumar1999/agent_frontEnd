import React from "react";

const ClientProfile = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
        <img
          src="https://randomuser.me/api/portraits/women/44.jpg"
          alt="Client Profile"
          className="w-28 h-28 rounded-full mx-auto mb-4 object-cover shadow-md"
        />
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Jane Smith</h1>
        <p className="text-gray-500 mb-6">Valued Client</p>

        <div className="text-left space-y-4">
          <div>
            <p className="text-gray-600 text-sm">Email</p>
            <p className="text-gray-800 font-medium">jane.smith@example.com</p>
          </div>

          <div>
            <p className="text-gray-600 text-sm">Phone</p>
            <p className="text-gray-800 font-medium">+123 456 7890</p>
          </div>

          <div>
            <p className="text-gray-600 text-sm">Address</p>
            <p className="text-gray-800 font-medium">123 Main St, California, USA</p>
          </div>
        </div>

        <button className="mt-8 px-6 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition duration-300">
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default ClientProfile;
