import React, { useEffect, useState, useCallback, memo } from "react";
import { useParams } from "react-router-dom";
import { Star, Building2, Share2, Heart } from "lucide-react";


import toast, { Toaster } from "react-hot-toast";
import axiosInstance from "../../../../utils/axiosInstance";
import { IMGURL } from "../../../../utils/imgpath";

const AgentProfile = () => {
  const { agentId } = useParams();
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const fetchAgentDetails = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/users/get-agent-details/${agentId}`);
        const data = response.data.data;
        setAgent(data);
      } catch (err) {
        console.error("Error fetching agent details:", err);
        toast.error("Failed to load agent details.");
      } finally {
        setLoading(false);
      }
    };

    fetchAgentDetails();
  }, [agentId]);

  const handleContactAgent = useCallback(() => {
    // toast.success("Contact functionality coming soon!");
  }, []);

  const handleVideoError = useCallback(() => {
    console.error("Video playback error: Failed to load the video.");
    setVideoError(true);
    toast.error("Failed to load the video. Please check the video URL or format.");
  }, []);

  const handleImageError = useCallback((e) => {
    console.error("Image failed to load:", e.target.src);
    e.target.src = "/default-agent-image.jpg";
  }, []);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-lg animate-pulse">
          <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between items-start gap-4 mb-6">
              <div className="w-full">
                <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
              </div>
              <div className="flex space-x-3">
                <div className="h-5 w-5 bg-gray-200 rounded"></div>
                <div className="h-5 w-5 bg-gray-200 rounded"></div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-1">
                <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="relative w-full max-w-md bg-gray-200 rounded-xl shadow-lg aspect-[16/9]"></div>
              </div>
              <div className="flex-1">
                <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="space-y-4">
                  <div className="w-full h-48 bg-gray-200 rounded-xl shadow-lg"></div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="w-full h-24 bg-gray-200 rounded-xl"></div>
                    <div className="w-full h-24 bg-gray-200 rounded-xl"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-full mb-2"></div>
              </div>
              <div className="w-full sm:w-72">
                <div className="h-6 bg-gray-200 rounded w-full mb-4"></div>
                <div className="h-10 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-6 text-center">
        <p className="text-gray-600 text-base sm:text-lg">Agent not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 bg-white rounded-lg shadow-lg">
      <Toaster position="top-right" reverseOrder={false} />

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between items-start gap-4 mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {agent.firstName} {agent.lastName || ""}
          </h2>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1">
            <span className="text-gray-600 capitalize text-sm sm:text-base">
              {agent.agentDetails?.role || "Buyer Agent"}
            </span>
            <span className="text-gray-500 hidden sm:inline">•</span>
            <span className="text-gray-600 text-sm sm:text-base">
              {agent.agentDetails?.yearsOfExperience || "5"} years experience
            </span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            {[...Array(Math.floor(agent.averageRating || 5))].map((_, i) => (
              <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
            ))}
            <span className="text-gray-600 text-sm sm:text-base">
              ({agent.reviewCount || "10"} reviews)
            </span>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="text-gray-500 hover:text-blue-600 transition">
            <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button className="text-gray-500 hover:text-red-500 transition">
            <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* Video and Gallery Section */}
      {(agent.introVideo || agent.profile_img || agent.additionalImages?.length > 0) && (
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row gap-6">
            {/* Video Section */}
            {agent.introVideo && (
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-4">Introduction Video</h3>
                <div className="relative w-full">
                  {videoError ? (
                    <div className="w-full aspect-[16/9] flex items-center justify-center bg-gray-200 rounded-xl shadow-lg">
                      <p className="text-gray-600 text-sm sm:text-lg">Video failed to load.</p>
                    </div>
                  ) : (
                    <video
                      src={`${IMGURL}${agent.introVideo}`}
                      controls
                      preload="metadata"
                      className="w-full rounded-xl shadow-lg transition-transform transform hover:scale-[1.02]"
                      style={{ aspectRatio: "16/9" }}
                      onError={handleVideoError}
                      title="Introduction video"
                    />
                  )}
                </div>
              </div>
            )}

            {/* Gallery Section */}
            {(agent.profile_img || agent.additionalImages?.length > 0) && (
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-4">Gallery</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 h-64 sm:h-80">
                  <div className="sm:col-span-2">
                    <img
                      src={`${IMGURL}${agent.profile_img}`}
                      alt={`${agent.firstName} Profile`}
                      className="w-full h-48 sm:h-full object-cover rounded-xl shadow-lg"
                      onError={handleImageError}
                    />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-1 gap-2 sm:gap-0 sm:flex sm:flex-col">
                    {agent.additionalImages?.[0] && (
                      <img
                        src={`${IMGURL}${agent.additionalImages[0]}`}
                        alt="Gallery Image 1"
                        className="w-full h-24 sm:h-1/2 sm:mb-2 object-cover rounded-xl shadow-lg"
                        onError={handleImageError}
                      />
                    )}
                    {agent.additionalImages?.[1] && (
                      <img
                        src={`${IMGURL}${agent.additionalImages[1]}`}
                        alt="Gallery Image 2"
                        className="w-full h-24 sm:h-1/2 object-cover rounded-xl shadow-lg"
                        onError={handleImageError}
                      />
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Description and Pricing Section */}
      <div className="flex flex-col sm:flex-row gap-6 mb-6">
        <div className="flex-1">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">Experienced Agent for Your Needs</h3>
          <p className="text-gray-600 text-sm sm:text-base">
            {agent.agentDetails?.aboutAgent ||
              "Atlas Property Partners; specializes in representing property buyers in Melbourne. As Affilax's expertise in mannus chinnic, market knowledge, and negotiation skills. Het ass expertise in main suburbs, off-market properties, and investor needs, and committed to matching clients with properties that suit their budget."}
          </p>
        </div>
        <div className="w-full sm:w-72 min-h-[220px] bg-blue-50 p-4 sm:p-6 rounded-xl shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            <h4 className="text-base sm:text-lg font-semibold text-gray-900">Property Sourcing Fee</h4>
          </div>
          <p className="text-gray-600 text-lg sm:text-xl font-bold mb-4">
            ${agent.agentDetails?.fees_structure?.min || "23"}K - ${agent.agentDetails?.fees_structure?.max || "102"}K
          </p>
          <button
            onClick={handleContactAgent}
            className="w-full bg-blue-600 text-white py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition text-sm sm:text-base"
          >
            Contact Agent
          </button>
        </div>
      </div>

      {/* Additional Details Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mb-6">
        <div>
          <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Area Covered</h4>
          <p className="text-gray-600 text-sm sm:text-base">
            {agent.agentDetails?.postCode_cover?.join(", ") || "Greater Melbourne"}
          </p>
        </div>
        <div>
          <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Licensed Buyer's Agent</h4>
          <p className="text-gray-600 text-sm sm:text-base">{agent.agentDetails?.isLicensed ? "Yes" : "No"}</p>
        </div>
        <div>
          <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Services Offered</h4>
          <ul className="list-disc list-inside text-gray-600 text-sm sm:text-base">
            {(agent.agentDetails?.services_provided?.split(", ") || [
              "Owner-occupier purchases",
              "First-home buyers",
              "Investors",
              "Market advisory",
            ]).map((service, index) => (
              <li key={index}>{service}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Property Offered</h4>
          <ul className="list-disc list-inside text-gray-600 text-sm sm:text-base">
            {["Houses", "Townhouses", "Apartments"].map((property, index) => (
              <li key={index}>{property}</li>
            ))}
            <li>Niches</li>
          </ul>
        </div>
        <div>
          <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Property Types Worked With</h4>
          <ul className="list-disc list-inside text-gray-600 text-sm sm:text-base">
            {["Houses", "Townhouses", "Apartments"].map((type, index) => (
              <li key={index}>{type}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Method</h4>
          <p className="text-gray-600 text-sm sm:text-base">{agent.agentDetails?.method_of_sale || "Auction"}</p>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Clients Served</h4>
        <p className="text-gray-600 text-sm sm:text-base">
          {agent.agentDetails?.clientsServed || "2"} Clients Last 12 Months
        </p>
      </div>

      {/* Contact Agent Button */}
      <div className="mt-6">
        <button
          onClick={handleContactAgent}
          className="w-full sm:w-auto bg-pink-500 text-white py-2 px-6 rounded-lg hover:bg-pink-600 transition text-sm sm:text-base"
        >
          Contact Agent
        </button>
      </div>
    </div>
  );
};

export default memo(AgentProfile);