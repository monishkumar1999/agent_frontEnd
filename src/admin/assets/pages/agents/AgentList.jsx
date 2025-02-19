import React from "react";
import { Link } from "react-router-dom";
import { IMGURL, NOPROFILE } from "../../../../utils/imgpath"; // Assuming you have a default image path

const AgentList = ({ data, handleApproval }) => {


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.length > 0 ? (
        data.map((agent, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg border hover:shadow-xl transition-shadow">
            {/* Agent Image */}
            <div className="flex justify-center mb-4">
            <img
                  src={agent.profile_img ? IMGURL + agent.profile_img : NOPROFILE}
                  alt="Agent Avatar"
                  className="w-24 h-24 object-cover rounded-full border-4 border-teal-500 transform hover:scale-110 transition-all"
                />
            </div>

            {/* Agent Info */}
            <h3 className="text-xl font-semibold mb-2 text-gray-800">{agent.firstName || "N/A"} {agent.lastName || ""}</h3>
            <p className="text-gray-600 mb-1">
              <strong>Email:</strong> {agent.email || "N/A"}
            </p>
            <p className="text-gray-600 mb-1">
              <strong>Phone:</strong> {agent.phone || "N/A"}
            </p>
            <p className="text-gray-600 mb-1">
              <strong>Approval:</strong> {agent.is_approval === "1" ? "Approved" : "Pending"}
            </p>
            <p className="text-gray-600 mb-3">
              <strong>Subscription:</strong> {agent.isSubscription === "1" ? "Subscribed" : "Not Subscribed"}
            </p>

            {/* Action Buttons */}
            <div className="flex justify-between mt-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                onClick={() => handleApproval(agent._id, "1")}
              >
                Approve
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                onClick={() => handleApproval(agent._id, "0")}
              >
                Decline
              </button>
            </div>

            {/* View Details Link */}
            <div className="mt-4">
              <Link
                to={`/admin/agent-details/${agent._id}`}
                className="bg-teal-500 text-white px-4 py-2 rounded-lg block text-center hover:bg-teal-600 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Details
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 col-span-full">No agents found</p>
      )}
    </div>
  );
};

export default AgentList;
