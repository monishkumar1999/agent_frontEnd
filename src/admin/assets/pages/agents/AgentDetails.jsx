import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../../../../utils/axiosInstance";
import { IMGURL } from "../../../../utils/imgpath";
import { FaPhoneAlt, FaEnvelope, FaRegBuilding, FaUserTie } from "react-icons/fa";

const AgentDetails = () => {
  const { id } = useParams(); // Get agent ID from URL
  const [agent, setAgent] = useState(null);

  useEffect(() => {
    const fetchAgentDetails = async () => {
      try {
        const response = await axiosInstance.post(`/admin/get-agent-details`, { id });
        setAgent(response.data.data);
      } catch (error) {
        console.error("Error fetching agent details:", error);
      }
    };

    fetchAgentDetails();
  }, [id]);

  if (!agent) return (
    <div className="min-h-screen flex justify-center items-center py-8 px-4 sm:px-6 md:px-8">
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-lg p-8">
        <div className="flex w-52 flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
            <div className="flex flex-col gap-4">
              <div className="skeleton h-4 w-20"></div>
              <div className="skeleton h-4 w-28"></div>
            </div>
          </div>
          <div className="skeleton h-32 w-full"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-blue-100 flex justify-center items-center py-8 px-4 sm:px-6 md:px-8">
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-xl overflow-hidden">
        {/* Profile Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-8 bg-gradient-to-r from-indigo-400 to-blue-500 text-white rounded-t-xl">
          <div className="flex items-center space-x-6">
            <img
              src={agent.profile_img ? IMGURL + agent.profile_img : "/default-avatar.png"}
              alt="Agent Avatar"
              className="w-24 h-24 object-cover rounded-full border-4 border-white"
            />
            <div>
              <h2 className="text-3xl font-semibold">{agent.firstName} {agent.lastName}</h2>
              <p className="text-xl font-light">{agent.agentDetails?.services_provided || "Real Estate Specialist"}</p>
            </div>
          </div>
          <div className="text-center mt-4 sm:mt-0">
            <p className="text-2xl">{agent.isSubscription === "1" ? "Active Subscription" : "Inactive Subscription"}</p>
          </div>
        </div>

        {/* Personal Details */}
        <div className="p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Personal Information</h3>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 text-gray-700">
            <div className="bg-indigo-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
              <p className="flex items-center space-x-2">
                <FaEnvelope className="text-indigo-500" />
                <span><strong>Email:</strong> {agent.email || "N/A"}</span>
              </p>
              <p className="flex items-center space-x-2 mt-4">
                <FaPhoneAlt className="text-indigo-500" />
                <span><strong>Phone:</strong> {agent.phone || "N/A"}</span>
              </p>
            </div>
            <div className="bg-indigo-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
              <p><strong>Created At:</strong> {new Date(agent.createdAt).toLocaleString()}</p>
              <p><strong>Last Updated:</strong> {new Date(agent.updatedAt).toLocaleString()}</p>
              <p><strong>OTP Code:</strong> {agent.otpCode || "N/A"}</p>
              <p><strong>OTP Expires At:</strong> {new Date(agent.otpExpires).toLocaleString() || "N/A"}</p>
            </div>
          </div>
        </div>

        {/* Agent Details */}
        {agent.agentDetails && (
          <div className="p-8 bg-indigo-50 rounded-b-lg">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Agent Information</h3>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 text-gray-700">
              <div className="bg-indigo-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
                <p className="flex items-center space-x-2">
                  <FaRegBuilding className="text-indigo-500" />
                  <span><strong>Agency Name:</strong> {agent.agentDetails.agency_name || "N/A"}</span>
                </p>
                <p><strong>Agency Type:</strong> {agent.agentDetails.agencyType || "N/A"}</p>
                <p><strong>Agent Work Type:</strong> {agent.agentDetails.agent_work_type || "N/A"}</p>
                <p><strong>Specialization:</strong> {agent.agentDetails.specialization || "N/A"}</p>
              </div>
              <div className="bg-indigo-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
                <p><strong>Location Address:</strong> {agent.agentDetails.location_Address || "N/A"}</p>
                <p><strong>Negotiation Style:</strong> {agent.agentDetails.NegotiationStyle || "N/A"}</p>
                <p><strong>Services Provided:</strong> {agent.agentDetails.services_provided || "N/A"}</p>
                <p><strong>Sales Method:</strong> {agent.agentDetails.method_of_sale || "N/A"}</p>
              </div>
            </div>
          </div>
        )}

        {/* Statistics Section */}
        <div className="p-8 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 bg-gradient-to-r from-indigo-100 to-blue-100">
          {[{ value: "500", label: "Happy Clients", icon: "thumb_up" },
            { value: "150", label: "Projects Completed", icon: "check_circle" },
            { value: "850", label: "Photo Captures", icon: "camera_alt" },
            { value: "190", label: "Telephonic Talks", icon: "phone" }].map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
                <div className="flex justify-center items-center mb-4 text-indigo-600 text-3xl">
                  <span className="material-icons">{stat.icon}</span>
                </div>
                <p className="text-center text-2xl font-bold text-gray-800">{stat.value}</p>
                <p className="text-center text-sm text-gray-500">{stat.label}</p>
              </div>
            ))}
        </div>

        {/* Back Button */}
        <div className="p-8 text-center">
          <Link
            to="/agent-list"
            className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:from-indigo-700 hover:to-blue-700 transition-all"
          >
            Back to List
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AgentDetails;
