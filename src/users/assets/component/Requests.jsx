import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import {
  User,
  Building,
  MapPin,
  Calendar,
  CheckCircle,
  XCircle,
  Hourglass,
} from "lucide-react";

const UserRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axiosInstance.post("/user/get-requests");

        if (response.status !== 200) {
          throw new Error("Failed to fetch requests");
        }

        setRequests(response.data.data);
      } catch (err) {
        console.error("Error fetching requests:", err);
        setError("Failed to load requests. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-4xl font-extrabold mb-6 text-center text-gray-800">
        Your Sent Requests
      </h2>

      {loading ? (
        <p className="text-center text-gray-600 text-lg animate-pulse">
          Loading requests...
        </p>
      ) : error ? (
        <p className="text-center text-red-500 text-lg">{error}</p>
      ) : requests.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          You have not sent any requests.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((request) => (
            <div
              key={request._id}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-2xl transition duration-300 transform hover:-translate-y-1"
            >
              {/* Agent Name */}
              <div className="mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-violet-600" />
                <p className="text-gray-500 text-sm">Agent Name</p>
              </div>
              <p className="text-lg font-semibold text-gray-800">
                {request.agentId
                  ? `${request.agentId.firstName} ${request.agentId.lastName}`
                  : "Unknown"}
              </p>

              {/* Agency Name */}
              <div className="mt-4 mb-4 flex items-center gap-2">
                <Building className="w-5 h-5 text-blue-600" />
                <p className="text-gray-500 text-sm">Agency Name</p>
              </div>
              <p className="text-lg font-semibold text-blue-700">
                {request.agentId?.agentDetails?.agency_name || "N/A"}
              </p>

              {/* Branch */}
              <div className="mt-4 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-green-600" />
                <p className="text-gray-500 text-sm">Branch</p>
              </div>
              <p className="text-lg font-medium text-gray-800">
                {request.agentId?.agentDetails?.Branch || "N/A"}
              </p>

              {/* Agency Type */}
              <div className="mt-4 mb-4 flex items-center gap-2">
                <Building className="w-5 h-5 text-orange-600" />
                <p className="text-gray-500 text-sm">Agency Type</p>
              </div>
              <p className="text-lg font-medium text-gray-800">
                {request.agentId?.agentDetails?.agencyType || "N/A"}
              </p>

              {/* Location Address */}
              <div className="mt-4 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-red-600" />
                <p className="text-gray-500 text-sm">Location Address</p>
              </div>
              <p className="text-lg font-medium text-gray-800">
                {request.agentId?.agentDetails?.location_Address || "N/A"}
              </p>

              {/* Date of Request */}
              <div className="mt-4 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gray-600" />
                <p className="text-gray-500 text-sm">Date of Request</p>
              </div>
              <p className="text-lg font-medium text-gray-800">
                {new Date(request.createdAt).toLocaleDateString()}
              </p>

              {/* Accepted Status */}
              <div className="mt-4 flex items-center gap-2">
                {request.accept_status === "accepted" ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : request.accept_status === "rejected" ? (
                  <XCircle className="w-5 h-5 text-red-600" />
                ) : (
                  <Hourglass className="w-5 h-5 text-yellow-600" />
                )}
                <p className="text-gray-500 text-sm">Status</p>
              </div>
              <p
                className={`text-lg font-semibold ${
                  request.accept_status === "accepted"
                    ? "text-green-600"
                    : request.accept_status === "rejected"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}
              >
                {request.accept_status.charAt(0).toUpperCase() +
                  request.accept_status.slice(1)}
              </p>

              {/* View Agent Profile Button */}
              <button
                onClick={() => navigate(`/user/agent/${request.agentId?._id}`)}
                className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-violet-600 to-purple-700 text-white rounded-xl font-medium hover:from-violet-700 hover:to-purple-800 transition transform hover:scale-105 shadow-md"
              >
                View Agent Profile
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserRequests;
