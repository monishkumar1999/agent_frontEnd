import React, { useEffect, useState } from "react";
import {
  FaBuilding,
  FaBriefcase,
  FaUsers,
  FaCogs,
  FaHandshake,
  FaVideo,
  FaMoneyBillWave,
  FaMapMarkerAlt,
  FaStar,
  FaInfoCircle,
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeaderComponent from "./Header";
import Footer from "./Footer";
import { IMGURL, NOPROFILE } from "../utils/imgpath";
import axiosInstance from "../utils/axiosInstance";
import { Navigate, useNavigate } from "react-router-dom";

const IconBox = ({ icon, bgColor }) => (
  <div
    className={`w-10 h-10 flex items-center justify-center rounded-xl ${bgColor}`}
  >
    {icon}
  </div>
);

const ShowAgent = () => {
  const [agents, setAgents] = useState([]);
  const [isAgentsLoading, setIsAgentsLoading] = useState(true);
  const [agentsError, setAgentsError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchAgentInfo = async () => {
      try {
        const response = await axiosInstance.post("/user/get-all-agents");
        console.log(response);
        if (!response.data.success) {
          throw new Error(response.data.message || "Failed to fetch agents");
        }

        setAgents(response.data.agents || []);
        setAgentsError(null);
      } catch (err) {
        console.error("Error fetching agents:", err);
        setAgentsError("Failed to load agents.");
      } finally {
        setIsAgentsLoading(false);
      }
    };

    fetchAgentInfo();
  }, []);

  const handleRequestClick = () => {
    navigate(`/user/login`);
  };

  return (
    <>
      <HeaderComponent />
      <div className="bg-gray-50 min-h-screen p-6 flex justify-center">
        <ToastContainer />
        {isAgentsLoading ? (
          <div className="flex items-center justify-center min-h-screen text-gray-600 font-semibold text-lg">
            <p>Loading agents...</p>
          </div>
        ) : agentsError ? (
          <div className="flex items-center justify-center min-h-screen text-red-500 font-semibold text-lg">
            <p>{agentsError}</p>
          </div>
        ) : agents.length === 0 ? (
          <div className="flex items-center justify-center min-h-screen text-gray-600 font-semibold text-lg">
            <p>No agents found.</p>
          </div>
        ) : (
          <div className="max-w-6xl w-full flex flex-col gap-12">
            {agents.map((agent) => (
              <div
                key={agent._id}
                className="flex flex-col md:flex-row gap-6 bg-white shadow-lg hover:shadow-2xl rounded-xl p-6"
              >
                <div className="flex flex-col items-center w-full md:w-1/3 font-sans">
                  <img
                    src={agent.profile_img ? IMGURL + agent.profile_img : NOPROFILE}
                    alt={`${agent.firstName} ${agent.lastName}`}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div className="flex items-center gap-2 mt-4">
                    <FaStar className="text-yellow-500 text-lg" />
                    <p className="text-gray-700 font-semibold">
                      {agent.averageRating || "No Rating"}
                    </p>
                  </div>
                  <button
                    onClick={handleRequestClick}
                    className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md mt-4 font-medium "
                   
                  >
                    Request
                  </button>
                </div>
                <div className="w-full md:w-2/3 flex flex-col gap-6 font-sans">
                  <div className="mb-4">
                    <h2 className="text-3xl font-extrabold text-gray-900 font-serif">
                      {agent.firstName} {agent.lastName}
                    </h2>
                    <p className="text-base text-gray-700 mt-2">
                      {agent.agentDetails?.aboutAgent || "No details available"}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">
                      Agency Information
                    </h3>
                    <p className="text-gray-700 text-sm mb-4">
                      {agent.agentDetails?.aboutAgency ||
                        "No details available about the agency"}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <IconBox
                        icon={<FaBuilding className="text-indigo-500" />}
                        bgColor="bg-indigo-100"
                      />
                      <p>
                        <strong>Agency Name:</strong>{" "}
                        {agent.agentDetails?.agency_name || "N/A"}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <IconBox
                        icon={<FaMapMarkerAlt className="text-red-500" />}
                        bgColor="bg-red-100"
                      />
                      <p>
                        <strong>Branch:</strong> {agent.agentDetails?.Branch || "N/A"}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                      <IconBox
                        icon={<FaUsers className="text-purple-500" />}
                        bgColor="bg-purple-100"
                      />
                      <p>
                        <strong>Sales Team Count:</strong>{" "}
                        {agent.agentDetails?.sales_team_count || "N/A"}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                      <IconBox
                        icon={<FaHandshake className="text-orange-500" />}
                        bgColor="bg-orange-100"
                      />
                      <p>
                        <strong>Negotiation Style:</strong>{" "}
                        {agent.agentDetails?.NegotiationStyle || "Not specified"}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">
                      Additional Details
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      <IconBox
                        icon={<FaInfoCircle className="text-gray-500" />}
                        bgColor="bg-gray-100"
                      />
                      <p>
                        <strong>Digital Solutions Used:</strong>{" "}
                        {agent.agentDetails?.digital_solution || "None"}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                      <IconBox
                        icon={<FaVideo className="text-indigo-500" />}
                        bgColor="bg-indigo-100"
                      />
                      <p>
                        <strong>Video Call Technology:</strong>{" "}
                        {agent.agentDetails?.videoCallTech || "Not available"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/3 bg-white shadow-lg hover:shadow-2xl rounded-xl p-6 font-sans self-center">
                  <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">
                    Services & Experience
                  </h3>
                  <div className="flex flex-col gap-3">
                    <IconBox
                      icon={<FaBriefcase className="text-blue-500" />}
                      bgColor="bg-blue-100"
                    />
                    <p>
                      <strong>Experience:</strong>{" "}
                      {agent.agentDetails?.specialization || "Not specified"}
                    </p>
                    <IconBox
                      icon={<FaCogs className="text-green-500" />}
                      bgColor="bg-green-100"
                    />
                    <p>
                      <strong>Services Provided:</strong>{" "}
                      {agent.agentDetails?.services_provided || "N/A"}
                    </p>
                    <IconBox
                      icon={<FaVideo className="text-teal-500" />}
                      bgColor="bg-teal-100"
                    />
                    <p>
                      <strong>Video Call Available:</strong>{" "}
                      {agent.agentDetails?.videoCall_offer === "Yes" ? "Yes" : "No"}
                    </p>
                    <IconBox
                      icon={<FaMoneyBillWave className="text-yellow-500" />}
                      bgColor="bg-yellow-100"
                    />
                    <p>
                      <strong>Fee Structure:</strong> Min:{" "}
                      {agent.agentDetails?.fees_structure?.min || "N/A"}, Max:{" "}
                      {agent.agentDetails?.fees_structure?.max || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer
        fIndMyAgent="/images/findmyagent.svg"
        copyrightIcon="/vector-4.svg"
      />
    </>
  );
};

export default ShowAgent;