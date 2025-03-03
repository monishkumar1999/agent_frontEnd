import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import { FaPhone, FaEnvelope, FaUser , FaStar, FaMapMarkerAlt, FaBuilding, FaRegHandshake, FaEdit } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
const NOPROFILE_BASE = "http://localhost:8000";

const AgentProfile = () => {
    const [agent, setAgent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAgent = async () => {
            try {
                const response = await axiosInstance.get('/agent/get-agent-details');
                setAgent(response.data.data);
            } catch (err) {
                console.error(err);
                setError("Failed to load agent details. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchAgent();
    }, []);

    const handleEditProfile = () => {
        alert("Edit Profile Clicked! Implement the edit functionality here.");
    };

    if (loading) return <p className="text-center text-gray-400 text-lg animate-pulse">Loading agent details...</p>;
    if (error) return <p className="text-center text-red-500 text-lg">{error}</p>;
    if (!agent) return <p className="text-center text-gray-400 text-lg">No agent details found.</p>;

    const rating = agent.averageRating || 0;
    const agentDetails = agent.agentDetails || {};

    const postCodes = agentDetails.postCode_cover || [];
    // Concatenate Base URL with Profile Image Path
    const profileImage = agent.profile_img 
        ? `${NOPROFILE_BASE}${agent.profile_img}`
        : `${NOPROFILE_BASE}/images/profile/profile.jpg`;


    return (
        <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row max-w-6xl mx-auto p-8 bg-gradient-to-r from-indigo-900 via-purple-800 to-gray-900 shadow-xl rounded-lg border border-yellow-500"
        >
            {/* Main Profile Section */}
            <div className="flex-1 p-6">
                <h2 className="text-3xl font-bold mb-4 text-yellow-400">Agent Profile</h2>
                <div className="relative flex items-center mb-6">
                    {/* Profile Image Container */}
                    <div className="relative w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden border-4 border-yellow-500 shadow-lg">
                        {agent.profile_img ? (
                            <img 
                            src={profileImage} 
                            alt="Profile" 
                            className="w-full h-full object-cover"
                            onError={(e) => e.target.src = `${NOPROFILE_BASE}/images/profile/profile.jpg`}
                        />
                        ) : (
                            <FaUser  className="text-gray-300 text-6xl" />
                        )}
                        {/* Edit Button Positioned at Bottom-Right Corner */}
                        <Link 
                            to="/agents/editprofile"
                            className="absolute bottom-1 right-1 w-8 h-8 flex items-center justify-center bg-yellow-500 text-gray-900 rounded-full shadow-md hover:bg-yellow-400 transition duration-300 border-2 border-white"
                        >
                            <FaEdit className="text-lg" />
                        </Link>
                        
                    </div>

                    <div className="ml-4">
                        <h3 className="text-2xl font-semibold text-yellow-400">{agent.firstName} {agent.lastName}</h3>
                        <p className="text-gray-300 italic">{agentDetails.role}</p>
                        <div className="flex mt-2">
                            {[...Array(5)].map((_, index) => (
                                <FaStar key={index} className={index < rating ? "text-yellow-400" : "text-gray-500"} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* About Agent */}
                <p className="text-gray-300">{agentDetails.aboutAgent}</p>

                {/* Subscription & Approval Status */}
                <div className="flex items-center space-x-4 mt-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${agent.isSubscription === "1" ? "bg-green-600 text-white" : "bg-red-600 text-white"}`}>
                        {agent.isSubscription === "1" ? "Subscribed" : "Not Subscribed"}
                    </span>

                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${agent.is_approval === "1" ? "bg-blue-600 text-white" : "bg-yellow-500 text -gray-900"}`}>
                        {agent.is_approval === "1" ? "Approved" : "Pending Approval"}
                    </span>
                </div>

                {/* Date of Joining */}
                <p className="text-gray-300 text-sm mt-2">
                    Joined on: {new Date(agent.createdAt).toLocaleDateString()}
                </p>

                {/* New Agent Details Section in a Box */}
                <div className="mt-6 p-4 bg-gray-800 rounded-lg shadow-md border border-yellow-500">
                    <h3 className="text-xl font-bold text-yellow-400">Agent Details</h3>
                    <p className="text-gray-300">Agency Name: {`${agentDetails.agency_name} (${agentDetails.agencyType})` || "N/A"}</p>
                    <p className="text-gray-300">Branch: {agentDetails.Branch || "N/A"}</p>
                    <p className="text-gray-300">Services Provided: {agentDetails.services_provided || "N/A"}</p>
                    <p className="text-gray-300">Specialization: {agentDetails.specialization || "N/A"}</p>
                    
                    <p className="text-gray-300">Method of Sale: {agentDetails.method_of_sale || "N/A"}</p>
                    <p className="text-gray-300">PostCode Cover: {postCodes.join(', ')}</p>
                </div>
            </div>

            {/* Sidebar Section */}
            <div className="md:w-1/3 p-6 bg-gray-800 rounded-lg shadow-md border-l-4 border-yellow-400">
                <h3 className="text-xl font-bold mb-4 text-yellow-300">Contact Information</h3>
                <div className="space-y-4">
                    {[
                        { icon: <FaEnvelope className="text-yellow-400 text-xl" />, text: agent.email },
                        { icon: <FaPhone className="text-yellow-400 text-xl" />, text: agent.phone },
                        { icon: <FaMapMarkerAlt className="text-yellow-400 text-xl" />, text: agentDetails.location_Address },
                        { icon: <FaBuilding className="text-yellow-400 text-xl" />, text: `${agentDetails.agency_name} (${agentDetails.agencyType})` },
                        { icon: <FaRegHandshake className="text-yellow-400 text-xl" />, text: agentDetails.buyer_agency_agreement }
                    ].map((item, index) => (
                        <div key={index} className="flex items-center space-x-3 bg-gray-900 p-3 rounded-lg shadow-md border-l-4 border-yellow-500 hover:border-yellow-300 hover:bg-gray-700 transition duration-300">
                            {item.icon}
                            <span className="text-yellow-300 font-medium">{item.text}</span>
                        </div>
                    ))}
                </div>

                {/* Deals Section */}
                {agent.deals.length > 0 ? (
                    <div className="mt-6">
                        <h3 className="text-lg font-bold text-yellow-300">Recent Deals</h3>
                        <ul className="text-gray-300 mt-2 space-y-2">
                            {agent.deals.map((deal, index) => (
                                <li key={index} className="border-b border-gray-600 py-2">{deal.name || "Unnamed Deal"}</li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p className="text-gray-400 mt-4">No recent deals.</p>
                )}
            </div>
        </motion.div>
    );
};

export default AgentProfile;