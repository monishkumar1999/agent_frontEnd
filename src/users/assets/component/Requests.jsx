import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaBuilding,
  FaStar,
  FaClock,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import { IMGURL, NOPROFILE } from "../../../utils/imgpath";

const ProposalRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axiosInstance.post("/user/get-requests");
        setRequests(response.data.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching proposal requests:", err);
        setError("Failed to load proposal requests.");
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  if (loading)
    return <p className="text-center text-gray-600">Loading requests...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="bg-gray-50 min-h-screen p-6 flex justify-center">
      <div className="max-w-5xl w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Your Proposal Requests
        </h2>
        {requests.length === 0 ? (
          <p className="text-center text-gray-500">No requests found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {requests.map((request) => (
              <div
                key={request._id}
                className="bg-white shadow-lg rounded-xl p-6 flex flex-col gap-3 border hover:shadow-xl transition"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={
                      request.agent.profile_img
                        ? IMGURL + request.agent.profile_img
                        : NOPROFILE
                    }
                    alt={request.agent.firstName}
                    className="w-16 h-16 rounded-full object-cover border"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {request.agent.firstName} {request.agent.lastName}
                    </h3>
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <FaBuilding className="text-blue-500" />{" "}
                      {request.agent.agentDetails?.agency_name || "N/A"}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <FaStar className="text-yellow-500" />{" "}
                      {request.agent.averageRating || "No Rating"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-3">
                  <span className="text-gray-600">Status:</span>
                  {request.status === "Pending" && (
                    <span className="text-yellow-600 flex items-center gap-1">
                      <FaClock /> Pending
                    </span>
                  )}
                  {request.status === "Accepted" && (
                    <span className="text-green-600 flex items-center gap-1">
                      <FaCheck /> Accepted
                    </span>
                  )}
                  {request.status === "Rejected" && (
                    <span className="text-red-600 flex items-center gap-1">
                      <FaTimes /> Rejected
                    </span>
                  )}
                </div>

                <button
                  onClick={() =>
                    navigate(`/agent-profile/${request.agent._id}`)
                  }
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-md mt-4 font-medium w-full"
                >
                  View Profile
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProposalRequests;
