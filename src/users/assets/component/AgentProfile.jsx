import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { useParams } from "react-router-dom";
import { IMGURL, NOPROFILE } from "../../../utils/imgpath";

const AgentProfile = () => {
  const { agentId } = useParams();
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAgentDetails = async () => {
      try {
        const response = await axiosInstance.get(`/user/view-agent/${agentId}`);
        setAgent(response.data.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching agent details:", err);
        setError("Failed to load agent details.");
      } finally {
        setLoading(false);
      }
    };

    if (agentId) {
      fetchAgentDetails();
    }
  }, [agentId]);

  if (loading)
    return (
      <p className="text-center text-gray-600">Loading agent details...</p>
    );
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="flex flex-col items-center">
        <img
          src={agent.profile_img ? IMGURL + agent.profile_img : NOPROFILE}
          alt={`${agent.firstName} ${agent.lastName}`}
          className="w-32 h-32 rounded-full object-cover mb-4"
        />
        <h2 className="text-2xl font-semibold">
          {agent.firstName} {agent.lastName}
        </h2>
        <p className="text-gray-600">
          {agent.agentDetails?.agency_name || "Independent Agent"}
        </p>
        <p className="text-gray-500">
          {agent.agentDetails?.aboutAgent || "No details available"}
        </p>
        <p className="text-yellow-500 font-semibold">
          ⭐ {agent.averageRating || "No Rating"}
        </p>
        <p className="mt-2 text-gray-700">
          {agent.agentDetails?.aboutAgency ||
            "No agency description available."}
        </p>
      </div>

      {/* Additional Agent Details */}
      <div className="mt-6 border-t pt-4">
        <h3 className="text-xl font-semibold mb-3">Agent Details</h3>
        <p>
          <strong>Experience:</strong> {agent.agentDetails?.Branch || "N/A"}
        </p>
        <p>
          <strong>Specialization:</strong>{" "}
          {agent.agentDetails?.specialization || "Not specified"}
        </p>
        <p>
          <strong>Services Provided:</strong>{" "}
          {agent.agentDetails?.services_provided || "N/A"}
        </p>
        <p>
          <strong>Negotiation Style:</strong>{" "}
          {agent.agentDetails?.NegotiationStyle || "Not specified"}
        </p>
        <p>
          <strong>Sales Team Count:</strong>{" "}
          {agent.agentDetails?.sales_team_count || "N/A"}
        </p>
        <p>
          <strong>Digital Solutions Used:</strong>{" "}
          {agent.agentDetails?.digital_solution || "None"}
        </p>
        <p>
          <strong>Video Call Technology:</strong>{" "}
          {agent.agentDetails?.videoCallTech || "Not available"}
        </p>
        <p>
          <strong>Video Call Available:</strong>{" "}
          {agent.agentDetails?.videoCall_offer === "Yes" ? "Yes" : "No"}
        </p>
      </div>

      {/* Contact Section */}
      <div className="mt-6 border-t pt-4">
        <h3 className="text-xl font-semibold mb-3">Contact Information</h3>
        <p>
          <strong>Email:</strong> {agent.email}
        </p>
        <p>
          <strong>Phone:</strong> {agent.phone}
        </p>
        <p>
          <strong>Location:</strong>{" "}
          {agent.agentDetails?.location_Address || "N/A"}
        </p>
      </div>
    </div>
  );
};

export default AgentProfile;
