import React from "react";
import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react"; // Lucide doesn't include half star, so we create our own
import { IMGURL } from "../utils/imgpath";

// Custom Half-Star SVG Icon
const HalfStarIcon = ({ className }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    stroke="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="half-grad">
        <stop offset="50%" stopColor="currentColor" />
        <stop offset="50%" stopColor="transparent" />
      </linearGradient>
    </defs>
    <path
      fill="url(#half-grad)"
      d="M12 2l2.4 6.9h7.2l-5.8 4.2 2.2 6.9L12 15.6 6 20l2.2-6.9L2.4 8.9h7.2z"
    />
  </svg>
);

const ListAgent = ({ agents, currentPage, totalPages, onPageChange, loading, searchLocation, totalAgents }) => {
  const navigate = useNavigate();

  const handleAgentClick = (agentId) => {
    navigate(`/agent/${agentId}`);
  };

  const renderStars = (rating) => {
    const ratingValue = parseFloat(rating || 4.9);
    const filledStars = Math.floor(ratingValue);
    const hasHalfStar = ratingValue - filledStars >= 0.25 && ratingValue - filledStars < 0.75;
    const totalStars = 5;
    const stars = [];

    for (let i = 0; i < totalStars; i++) {
      if (i < filledStars) {
        stars.push(<Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />);
      } else if (i === filledStars && hasHalfStar) {
        stars.push(<HalfStarIcon key={i} className="w-4 h-4 text-yellow-400" />);
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-gray-300 fill-current" />);
      }
    }

    return stars;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
        Agents in {searchLocation || "Selected Location"}
      </h2>

      {loading ? (
        <div className="space-y-6">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-gray-50 border rounded-xl p-4 sm:p-6 shadow-sm flex animate-pulse">
              <div className="w-16 h-16 bg-gray-200 rounded-full mr-4"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      ) : agents.length > 0 ? (
        <div className="space-y-6">
          {agents.map((agent, index) => (
            <div
              key={agent._id}
              onClick={() => handleAgentClick(agent._id)}
              className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-6 cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Agent Image */}
              <img
                src={agent.profile_img ? `${IMGURL}${agent.profile_img}` : "/default-agent-image.jpg"}
                alt={`${agent.firstName} ${agent.lastName}`}
                className="w-16 h-16 rounded-full object-cover"
              />

              {/* Agent Details */}
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                  {agent.firstName} {agent.lastName}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {agent.description || "Dedicated to helping clients achieve their property goals"}
                </p>
              </div>

              {/* Rating, Fee, and Contact */}
              <div className="text-left sm:text-left">
  <div className="flex items-center gap-x-1 mb-2">
    <span className="text-sm font-bold text-gray-800 leading-none">
      {agent.averageRating || "4.9"}
    </span>
    <div className="flex items-center space-x-[1px]">
      {renderStars(agent.averageRating)}
    </div>
  </div>

  <p className="text-sm text-gray-600">Buying Fee</p>
  <p className="text-2xl font-bold text-gray-800">${agent.fee || "9,500"}</p>
  <button className="mt-3 px-4 py-3 bg-purple-500 text-white rounded-md text-sm hover:bg-purple-700 transition font-semibold">
    Contact Agent
  </button>
</div>


            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center text-base sm:text-lg">No agents found. Try adjusting your filters.</p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-8">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1 || loading}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg shadow hover:bg-gray-200 disabled:opacity-50 transition"
          >
            Previous
          </button>
          <div className="flex space-x-1">
            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              return (
                <button
                  key={page}
                  onClick={() => onPageChange(page)}
                  disabled={loading}
                  className={`px-3 py-1 rounded-lg text-sm shadow transition ${
                    currentPage === page
                      ? "bg-purple-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </div>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages || loading}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg shadow hover:bg-gray-200 disabled:opacity-50 transition"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ListAgent;
