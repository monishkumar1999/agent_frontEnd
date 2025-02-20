import React from "react";
import { Link } from "react-router-dom";
import { IMGURL, NOPROFILE } from "../../../../utils/imgpath"; // Default profile image

const UserList = ({ data }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.length > 0 ? (
        data.map((user, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg border hover:shadow-xl transition-shadow">
            {/* User Profile Image */}
            <div className="flex justify-center mb-4">
              <img
                src={user.profileImage ? IMGURL + user.profileImage : NOPROFILE}
                alt="User Avatar"
                className="w-24 h-24 object-cover rounded-full border-4 border-teal-500 transform hover:scale-110 transition-all"
              />
            </div>

            {/* User Info */}
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              {user.userName || "N/A"}
            </h3>
            <p className="text-gray-600 mb-1">
              <strong>Email:</strong> {user.email || "N/A"}
            </p>
            <p className="text-gray-600 mb-3">
              <strong>Phone:</strong> {user.mobile || "N/A"}
            </p>

            {/* Buttons */}
            <div className="mt-4 space-y-2">
              <Link
                to={`/admin/user-details/${user._id}`}
                className="bg-teal-500 text-white px-4 py-2 rounded-lg block text-center hover:bg-teal-600 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Details
              </Link>

              <Link
  to={`/admin/chat/${user._id}`} // Navigate to ChatPage with user ID
  className="bg-blue-500 text-white px-4 py-2 rounded-lg block text-center hover:bg-blue-600 transition-colors"
>
  Chat
</Link>

            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 col-span-full">No users found</p>
      )}
    </div>
  );
};

export default UserList;
