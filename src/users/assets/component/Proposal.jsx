import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { useParams, useNavigate } from "react-router-dom";
import { IMGURL, NOPROFILE } from "../../../utils/imgpath";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Proposal = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingRequest, setLoadingRequest] = useState(null);
  const [confirmRequest, setConfirmRequest] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAgents = async () => {
      if (!id) return;
      setLoading(true);

      try {
        const response = await axiosInstance.post("/user/find-agent", {
          proposalId: id,
        });

        if (response.status !== 200) {
          throw new Error(response.data?.message || "Failed to fetch agents");
        }

        setAgents(response.data?.agents || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching agents:", err);
        setError(err.message || "Failed to load agents. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, [id]);

  const handleRequest = async (agentId) => {
    setLoadingRequest(agentId);
    setConfirmRequest(null);

    setTimeout(async () => {
      try {
        const response = await axiosInstance.post("/user/proposal-requests", {
          agentId,
          proposalId: id,
        });

        setLoadingRequest(null); // Stop loading after request

        if (response.data?.success) {
          toast.success("Request sent successfully!", {
            position: "top-center",
          });
        } else {
          toast.error(response.data?.message || "Failed to send request.");
        }
      } catch (err) {
        console.error("Error sending request:", err);
        toast.error("Something went wrong. Try again.");
      }
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Available Agents</h2>

      {/* Toast Container - Ensures toasts appear on this page */}
      <ToastContainer />

      {loading ? (
        <p className="text-center text-gray-600">Loading agents...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : agents.length === 0 ? (
        <p className="text-center text-gray-500">No agents found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <div
              key={agent._id}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center text-center"
            >
              <img
                src={agent.profile_img ? IMGURL + agent.profile_img : NOPROFILE}
                alt={`${agent.firstName || "Agent"} ${agent.lastName || ""}`}
                className="w-24 h-24 rounded-full object-cover mb-3"
              />
              <h3 className="text-xl font-semibold">
                {agent.firstName || "Unknown"} {agent.lastName || ""}
              </h3>
              <p className="text-gray-600">
                {agent.agentDetails?.agency_name || "Independent Agent"}
              </p>
              <p className="text-gray-500">
                {agent.agentDetails?.aboutAgency ||
                  "No agency details available"}
              </p>
              <p className="text-yellow-500 font-semibold">
                ⭐ {agent.averageRating || "No Rating"}
              </p>
              <div className="flex gap-3 mt-3">
                <button
                  onClick={() => navigate(`/user/agent/${agent._id}/${id}`)}
                  className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700"
                >
                  View Profile
                </button>
                <button
                  onClick={() => setConfirmRequest(agent._id)}
                  className={`px-4 py-2 text-white rounded-lg ${
                    loadingRequest === agent._id
                      ? "bg-gray-400"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                  disabled={loadingRequest === agent._id}
                >
                  {loadingRequest === agent._id
                    ? "⏳ Requesting..."
                    : "Request"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {confirmRequest && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="mb-4">
              Are you sure you want to send a request to this agent?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => handleRequest(confirmRequest)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Yes
              </button>
              <button
                onClick={() => setConfirmRequest(null)}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Proposal;
