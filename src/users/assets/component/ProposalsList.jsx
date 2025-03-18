import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaBed,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
} from "react-icons/fa";

const ProposalsList = () => {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const response = await axiosInstance.post("/user/get-proposals");

        if (response.status !== 200) {
          throw new Error("Failed to fetch proposals");
        }

        setProposals(response.data.data);
      } catch (err) {
        console.error("Error fetching proposals:", err);
        setError("Failed to load proposals. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProposals();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Your Proposals
      </h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading proposals...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : proposals.length === 0 ? (
        <p className="text-center text-gray-500">
          You have not submitted any proposals.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {proposals.map((proposal) => (
            <div
              key={proposal._id}
              className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-2xl transition-transform transform hover:-translate-y-1 duration-300"
            >
              <div className="mb-4 flex items-center gap-2">
                <FaMapMarkerAlt className="text-violet-600" />
                <p className="text-lg font-medium text-gray-800">
                  {proposal.location || "N/A"}
                </p>
              </div>

              <div className="mb-4">
                <p className="text-gray-500 text-sm">Price Range</p>
                <p className="text-lg font-semibold text-violet-600">
                  ${proposal.price_range?.min} - ${proposal.price_range?.max}
                </p>
              </div>

              <div className="mb-4">
                <p className="text-gray-500 text-sm">Pincode</p>
                <p className="text-lg font-medium text-gray-800">
                  {proposal.pincode.join(", ") || "N/A"}
                </p>
              </div>

              <div className="mb-4 flex items-center gap-2">
                <FaBed className="text-violet-600" />
                <p className="text-lg font-medium text-gray-800">
                  {proposal.noOfBedRooms} Bed(s)
                </p>
              </div>

              <div className="mb-4 flex items-center gap-2">
                <FaCalendarAlt className="text-violet-600" />
                <p className="text-lg font-medium text-gray-800">
                  {new Date(proposal.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="mb-4">
                <p className="text-gray-500 text-sm">Status</p>
                <p
                  className={`text-lg font-semibold flex items-center gap-2 ${
                    proposal.action === "1"
                      ? "text-green-600"
                      : proposal.action === "2"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {proposal.action === "1" ? (
                    <>
                      <FaCheckCircle /> Accepted
                    </>
                  ) : proposal.action === "2" ? (
                    <>
                      <FaTimesCircle /> Rejected
                    </>
                  ) : (
                    <>
                      <FaHourglassHalf /> Pending
                    </>
                  )}
                </p>
              </div>

              <button
                onClick={() => navigate(`/user/proposal/${proposal._id}`)}
                className="w-full mt-4 px-4 py-2 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 transition-all duration-300"
              >
                View Proposal
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProposalsList;
