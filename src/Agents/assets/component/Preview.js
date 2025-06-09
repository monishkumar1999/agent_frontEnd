import React, { useEffect, useState, useCallback, memo } from "react";
import { useParams } from "react-router-dom";
import { Star, Building2, Share2, Heart } from "lucide-react";
// import axiosInstance from "../utils/axiosInstance";
// import { IMGURL } from "../utils/imgpath";
import toast, { Toaster } from "react-hot-toast";
import axiosInstance from "../../../utils/axiosInstance";
import { IMGURL } from "../../../utils/imgpath";


const Preview = () => {
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
        // Placeholder for contact functionality
    }, []);

    const handleVideoError = useCallback(() => {
        console.error("Video playback error: Failed to load the video.");
        setVideoError(true);
        toast.error("Failed to load the video. Please check the video URL or format.");
    }, []);

    const handleImageError = useCallback((e) => {
        console.error("Image failed to load:", e.target.src);
        e.target.src = "/default-agent-image.jpg"; // Fallback to default image
    }, []);

    if (loading) {
        return (
            <>          
                <div className="max-w-7xl mx-auto p-4 sm:p-6">
                    <div className="bg-white rounded-lg shadow-lg animate-pulse">
                        <div className="p-4 sm:p-6">
                            <div className="flex flex-col sm:flex-row justify-between items-start mb-6">
                                <div>
                                    <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
                                    <div className="h-6 bg-gray-200 rounded w-1/4 mb-2"></div>
                                    <div className="h-6 bg-gray-200 rounded w-1/5"></div>
                                </div>
                                <div className="flex space-x-3 mt-4 sm:mt-0">
                                    <div className="h-5 w-5 bg-gray-200 rounded"></div>
                                    <div className="h-5 w-5 bg-gray-200 rounded"></div>
                                </div>
                            </div>
                            <div className="flex flex-col lg:flex-row gap-6">
                                <div className="flex-1">
                                    <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
                                    <div className="relative w-full aspect-video bg-gray-200 rounded-xl shadow-lg"></div>
                                </div>
                                <div className="flex-1">
                                    <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
                                    <div className="space-y-4">
                                        <div className="w-full h-48 bg-gray-200 rounded-xl shadow-lg"></div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="w-full h-24 bg-gray-200 rounded-xl"></div>
                                            <div className="w-full h-24 bg-gray-200 rounded-xl"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              
            </>
        );
    }

    if (!agent) {
        return (
            <div className="max-w-7xl mx-auto p-4 sm:p-6 text-center">
                <p className="text-gray-600 text-lg">Agent not found.</p>
            </div>
        );
    }

    return (
        <>
          
            <div className="max-w-7xl mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-lg">
                <Toaster position="top-right" reverseOrder={false} />

                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start mb-6 gap-4">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                            {agent.firstName} {agent.lastName || ""}
                        </h2>
                        <div className="flex flex-wrap items-center space-x-2 mt-1">
                            <span className="text-gray-600 capitalize">{agent.agentDetails?.role || "Buyer Agent"}</span>
                            <span className="text-gray-500 hidden sm:inline">•</span>
                            <span className="text-gray-600">{agent.agentDetails?.yearsOfExperience || "5"} years experience</span>
                        </div>
                        <div className="flex items-center space-x-2 mt-2">
                            {[...Array(Math.floor(agent.averageRating || 5))].map((_, i) => (
                                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                            ))}
                            <span className="text-gray-600">({agent.reviewCount || "10"} reviews)</span>
                        </div>
                    </div>
                    <div className="flex space-x-3">
                        <button className="text-gray-500 hover:text-blue-600 transition">
                            <Share2 className="w-5 h-5" />
                        </button>
                        <button className="text-gray-500 hover:text-red-500 transition">
                            <Heart className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Video and Gallery Section */}
                {(agent.introVideo || agent.profile_img || agent.additionalImages?.length > 0) && (
                    <div className="mb-6">
                        {agent.introVideo ? (
                            // Layout with both Video and Gallery
                            <div className="flex flex-col lg:flex-row gap-6">
                                {/* Video Section */}
                                <div className="flex-1">
                                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Introduction Video</h3>
                                    <div className="relative w-full aspect-video">
                                        {videoError ? (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-xl shadow-lg">
                                                <p className="text-gray-600 text-lg">Video failed to load.</p>
                                            </div>
                                        ) : (
                                            <video
                                                src={`${IMGURL}${agent.introVideo}`}
                                                controls
                                                preload="metadata"
                                                className="w-full h-full object-cover rounded-xl shadow-lg transition-transform transform hover:scale-[1.02]"
                                                onError={handleVideoError}
                                                title="Introduction video"
                                            />
                                        )}
                                    </div>
                                </div>

                                {/* Gallery Section */}
                                <div className="flex-1">
                                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Gallery</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                        {/* Profile Image */}
                                        {agent.profile_img ? (
                                            <div className="sm:col-span-2 aspect-square">
                                                <img
                                                    src={`${IMGURL}${agent.profile_img}`}
                                                    alt={`${agent.firstName} Profile`}
                                                    className="w-full h-full object-cover rounded-xl shadow-lg"
                                                    onError={handleImageError}
                                                />
                                            </div>
                                        ) : (
                                            <div className="sm:col-span-2 aspect-square bg-gray-200 rounded-xl shadow-lg flex items-center justify-center">
                                                <p className="text-gray-600">No profile image</p>
                                            </div>
                                        )}

                                        {/* Additional Images */}
                                        {agent.additionalImages?.length > 0 && (
                                            <div className="flex flex-col gap-2">
                                                {agent.additionalImages.map((image, index) => (
                                                    <div key={index} className="aspect-square">
                                                        <img
                                                            src={`${IMGURL}${image}`}
                                                            alt={`Gallery Image ${index + 1}`}
                                                            className="w-full h-full object-cover rounded-xl shadow-lg"
                                                            onError={handleImageError}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            // Layout when there is no video, only Gallery
                            <div className="flex flex-col items-center">
                                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Gallery</h3>
                                <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {/* Profile Image */}
                                    {agent.profile_img && (
                                        <div className="aspect-square">
                                            <img
                                                src={`${IMGURL}${agent.profile_img}`}
                                                alt={`${agent.firstName} Profile`}
                                                className="w-full h-full object-cover rounded-xl shadow-lg"
                                                onError={handleImageError}
                                            />
                                        </div>
                                    )}

                                    {/* Additional Images */}
                                    {agent.additionalImages?.length > 0 &&
                                        agent.additionalImages.map((image, index) => (
                                            <div key={index} className="aspect-square">
                                                <img
                                                    src={`${IMGURL}${image}`}
                                                    alt={`Gallery Image ${index + 1}`}
                                                    className="w-full h-full object-cover rounded-xl shadow-lg"
                                                    onError={handleImageError}
                                                />
                                            </div>
                                        ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Description and Pricing Section */}
                <div className="flex flex-col lg:flex-row justify-between items-start mb-6 gap-6">
                    <div className="flex-1">
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">Experienced Agent for Your Needs</h3>
                        <p className="text-gray-600">
                            {agent.agentDetails?.aboutAgent ||
                                "Atlas Property Partners; specializes in representing property buyers in Melbourne. As Affilax's expertise in mannus chinnic, market knowledge, and negotiation skills. Het ass expertise in main suburbs, off-market properties, and investor needs, and committed to matching clients with properties that suit their budget."}
                        </p>
                    </div>
                    <div className="w-full lg:w-72 bg-blue-50 p-6 rounded-xl shadow-lg">
                        <div className="flex items-center space-x-2 mb-3">
                            <Building2 className="w-6 h-6 text-blue-600" />
                            <h4 className="text-lg font-semibold text-gray-900">Property Sourcing Fee</h4>
                        </div>
                        <p className="text-gray-600 text-xl font-bold mb-4">
                            ${agent.agentDetails?.fees_structure?.min || "23"}K - ${agent.agentDetails?.fees_structure?.max || "102"}K
                        </p>
                        <button
                            onClick={handleContactAgent}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                        >
                            Contact Agent
                        </button>
                    </div>
                </div>

                {/* Additional Details Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mb-6">
                    <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">Area Covered</h4>
                        <p className="text-gray-600">{agent.agentDetails?.postCode_cover?.join(", ") || "Greater Melbourne"}</p>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">Licensed Buyer's Agent</h4>
                        <p className="text-gray-600">{agent.agentDetails?.isLicensed ? "Yes" : "No"}</p>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">Services Offered</h4>
                        <ul className="list-disc list-inside text-gray-600">
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
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">Property Offered</h4>
                        <ul className="list-disc list-inside text-gray-600">
                            {["Houses", "Townhouses", "Apartments"].map((property, index) => (
                                <li key={index}>{property}</li>
                            ))}
                            <li>iches</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">Property Types Worked With</h4>
                        <ul className="list-disc list-inside text-gray-600">
                            {["Houses", "Townhouses", "Apartments"].map((type, index) => (
                                <li key={index}>{type}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">Method</h4>
                        <p className="text-gray-600">{agent.agentDetails?.method_of_sale || "Auction"}</p>
                    </div>
                </div>

                <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Clients Served</h4>
                    <p className="text-gray-600">{agent.agentDetails?.clientsServed || "2"} Clients Last 12 Months</p>
                </div>

               
            </div>
         
        </>
    );
};

export default memo(Preview);