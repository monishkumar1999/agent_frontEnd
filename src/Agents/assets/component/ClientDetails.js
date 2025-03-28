import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import { 
  User, Mail, Phone, Home, DollarSign, Bed, Check, X, 
  Calendar, ArrowLeft, RefreshCw, AlertTriangle, ClipboardList
} from "lucide-react";

const NOPROFILE_BASE = "http://localhost:8000";

const ClientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [remark, setRemark] = useState("");
  const [showRemarkInput, setShowRemarkInput] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchClientDetails();
  }, [id]);

  const fetchClientDetails = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axiosInstance.get(`/agent/view/request`);
      const clientData = response.data.data.find((req) => req.userId._id === id);
      if (clientData) {
        setClient(clientData);
      } else {
        setError("Client not found");
      }
    } catch (err) {
      console.error("Error fetching client details:", err);
      setError("Error fetching client details");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (requestId, status) => {
    if (status === "rejected" && !remark.trim()) {
      setNotification({
        type: "error",
        message: "Please enter a remark before rejecting the request."
      });
      return;
    }

    try {
      await axiosInstance.post("/agent/update/request", {
        requestId,
        accept_status: status,
        remark: status === "rejected" ? remark : "",
      });

      setNotification({
        type: "success",
        message: `Client has been ${status === "accepted" ? "accepted" : "rejected"} successfully!`
      });
      
      // Clear after showing notification for a moment
      setTimeout(() => {
        navigate("/agents/request");
      }, 1500);
      
      setShowRemarkInput(false);
      setRemark("");
    } catch (error) {
      console.error(`Error updating request to ${status}:`, error);
      setNotification({
        type: "error",
        message: `Failed to ${status} client. Please try again.`
      });
    }
  };

  // Function to generate initials for avatar
  const getInitials = (name) => {
    if (!name) return "U";
    const nameParts = name.split(" ");
    if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();
    return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
  };

  // Function to generate a consistent color based on name
  const getAvatarColor = (name) => {
    const colors = [
      "bg-blue-600", "bg-purple-600", "bg-green-600", "bg-yellow-600", 
      "bg-red-600", "bg-pink-600", "bg-indigo-600", "bg-teal-600"
    ];
    
    if (!name) return colors[0];
    
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto">
      {/* Notification */}
      {notification && (
        <div 
          className={`fixed top-6 right-6 z-50 p-4 rounded-lg shadow-lg flex items-center gap-3 transition-all duration-300 transform ${
            notification.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          {notification.type === "success" ? <Check size={20} /> : <AlertTriangle size={20} />}
          <p>{notification.message}</p>
        </div>
      )}
      
      {/* Back Button */}
      <button 
        onClick={() => navigate("/agents/request")}
        className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors duration-300"
      >
        <ArrowLeft size={16} /> Back to Client Requests
      </button>
      
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl shadow-xl">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="mt-6 text-gray-600 text-lg">Loading client details...</p>
        </div>
      ) : error ? (
        <div className="text-center py-20 bg-red-50 rounded-3xl shadow-xl border border-red-100">
          <AlertTriangle size={64} className="mx-auto text-red-500 mb-4" />
          <p className="text-red-800 text-xl font-medium">{error}</p>
          <button 
            onClick={fetchClientDetails}
            className="mt-6 px-6 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors duration-300 inline-flex items-center gap-2"
          >
            <RefreshCw size={16} /> Try Again
          </button>
        </div>
      ) : !client ? (
        <div className="text-center py-20 bg-gray-50 rounded-3xl shadow-xl">
          <User size={64} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-700 text-xl">No client details found.</p>
          <button 
            onClick={() => navigate("/agents/request")}
            className="mt-6 px-6 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors duration-300"
          >
            Return to Client Requests
          </button>
        </div>
      ) : (
        <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-700 to-blue-700 p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full opacity-10">
              <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-yellow-300"></div>
              <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-blue-400"></div>
            </div>
            <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Profile Avatar */}
              {client.userId.profile_img ? (
                <img 
                  src={`${NOPROFILE_BASE}${client.userId.profile_img}`}
                  alt="Profile" 
                  className="w-24 h-24 rounded-full border-4 border-white shadow-xl object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                    const parentDiv = e.target.parentNode;
                    const avatarDiv = document.createElement('div');
                    avatarDiv.className = `w-24 h-24 rounded-full flex items-center justify-center text-white text-2xl font-bold ${getAvatarColor(client.userId.userName)}`;
                    avatarDiv.textContent = getInitials(client.userId.userName);
                    parentDiv.appendChild(avatarDiv);
                  }}
                />
              ) : (
                <div className={`w-24 h-24 rounded-full flex items-center justify-center text-white text-2xl font-bold ${getAvatarColor(client.userId.userName)}`}>
                  {getInitials(client.userId.userName)}
                </div>
              )}
              
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-extrabold text-white">{client.userId.userName}</h2>
                <p className="text-blue-100 opacity-90 flex items-center gap-2 justify-center md:justify-start">
                  <Mail size={16} className="opacity-75" /> {client.userId.email}
                </p>
                {client.userId.mobile && (
                  <p className="text-blue-100 opacity-90 flex items-center gap-2 justify-center md:justify-start mt-1">
                    <Phone size={16} className="opacity-75" /> {client.userId.mobile}
                  </p>
                )}
              </div>
            </div>
          </div>
          
          <div className="p-6 md:p-8">
            {/* Action Buttons */}
            <div className="mb-8 flex flex-wrap gap-4 justify-center md:justify-start">
              <button 
                onClick={() => handleAction(client._id, "accepted")} 
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <Check size={20} /> Accept Client
              </button>
              <button 
                onClick={() => setShowRemarkInput(!showRemarkInput)} 
                className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <X size={20} /> {showRemarkInput ? "Cancel Rejection" : "Reject Client"}
              </button>
            </div>
            
            {/* Rejection Form */}
            {showRemarkInput && (
              <div className="mb-8 p-6 bg-red-50 rounded-xl border border-red-100 transition-all duration-300">
                <h3 className="text-lg font-semibold text-red-800 mb-3">Rejection Details</h3>
                <p className="text-sm text-red-700 mb-4">Please provide a reason for rejecting this client request:</p>
                <textarea
                  className="w-full border border-red-200 bg-white rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-red-400 shadow-sm transition-all duration-300"
                  placeholder="Enter detailed explanation for client..."
                  rows={4}
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                />
                <button 
                  onClick={() => handleAction(client._id, "rejected")}
                  className="mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl w-full md:w-auto transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Submit Rejection
                </button>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Details */}
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <User size={20} className="text-blue-600" /> Personal Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <Mail className="text-blue-600 mt-1" size={18} />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p className="text-gray-800">{client.userId.email}</p>
                    </div>
                  </div>
                  
                  {client.userId.mobile && (
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <Phone className="text-blue-600 mt-1" size={18} />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Phone</p>
                        <p className="text-gray-800">{client.userId.mobile}</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <Calendar className="text-blue-600 mt-1" size={18} />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Request Date</p>
                      <p className="text-gray-800">{new Date(client.createdAt || Date.now()).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Property Details */}
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Home size={20} className="text-blue-600" /> Property Preferences
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <Home className="text-blue-600 mt-1" size={18} />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Pincode</p>
                      <p className="text-gray-800">{client.proposalId.pincode.join(', ')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <DollarSign className="text-blue-600 mt-1" size={18} />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Price Range</p>
                      
                      <p className="text-gray-800">₹0-₹{client.proposalId.price_range} </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <Bed className="text-blue-600 mt-1" size={18} />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Property Type</p>
                        <p className="text-gray-800">{client.proposalId.propertyType}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <Bed className="text-blue-600 mt-1" size={18} />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Number of Bedrooms</p>
                        <p className="text-gray-800">{client.proposalId.noOfBedRooms}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Requirements & Notes */}
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 md:col-span-2">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <ClipboardList size={20} className="text-blue-600" /> Requirements & Notes
                  </h3>
                  <div className="p-4 bg-gray-50 rounded-lg">
  {client.proposalId ? (
    <>
      <p className="text-gray-700 whitespace-pre-line">
        Property Buying Plan: {client.proposalId.property_buying_plain}
      </p>
      <p className="text-gray-700 whitespace-pre-line">
        Purpose of Buying Property: {client.proposalId.purpose_purchase}
      </p>
    </>
  ) : (
    <p className="text-gray-500 italic">No specific requirements provided.</p>
  )}
</div>

                </div>
              </div>
              
              {/* Request Status */}
              <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${
                      client.accept_status === "pending" ? "bg-yellow-500" : 
                      client.accept_status === "accepted" ? "bg-green-500" : "bg-red-500"
                    }`}></div>
                    <span className="font-medium text-gray-700">
                      Status: <span className="capitalize">{client.accept_status}</span>
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Last Updated: {new Date(client.updatedAt || client.createdAt || Date.now()).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default ClientDetails;