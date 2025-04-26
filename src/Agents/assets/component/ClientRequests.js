import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import { Check, X, RefreshCw, ChevronDown, Search, AlertTriangle, User } from "lucide-react";

const ClientRequests = () => {
  const [requests, setRequests] = useState([]);
  const [remark, setRemark] = useState("");
  const [showRemarkInput, setShowRemarkInput] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedDetails, setExpandedDetails] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    setError(null);
    setIsRefreshing(true);
    
    try {
      const response = await axiosInstance.get("/agent/view/request");
      setRequests(Array.isArray(response.data.data) ? response.data.data : []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching client requests:", error);
      setError("Failed to load client requests. Please try again.");
      setRequests([]);
    } finally {
      setLoading(false);
      setTimeout(() => setIsRefreshing(false), 500);
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

      setRequests((prevRequests) => prevRequests.filter((request) => request._id !== requestId));
      setShowRemarkInput(null);
      setRemark("");
      setNotification({
        type: "success",
        message: `Request ${status === "accepted" ? "accepted" : "rejected"} successfully!`
      });
      
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      console.error(`Error updating request to ${status}:`, error);
      setNotification({
        type: "error",
        message: `Failed to ${status} request. Please try again.`
      });
    }
  };

  const toggleDetails = (requestId) => {
    setExpandedDetails(expandedDetails === requestId ? null : requestId);
  };

  const filteredRequests = requests.filter(request => 
    request.userId.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.userId.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getInitials = (name) => {
    if (!name) return "U";
    const nameParts = name.split(" ");
    if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();
    return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
  };

  const getAvatarColor = (name) => {
    const colors = [
      "bg-blue-500", "bg-purple-500", "bg-green-500", "bg-yellow-500", 
      "bg-red-500", "bg-pink-500", "bg-indigo-500", "bg-teal-500"
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
      
      <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-700 to-blue-700 p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full opacity-10">
            <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-yellow-300"></div>
            <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-blue-400"></div>
          </div>
          <div className="relative z-10">
            <h2 className="text-4xl font-extrabold mb-2 text-white">Client Requests</h2>
            <p className="text-blue-100 opacity-90">Manage incoming client connection requests</p>
          </div>
        </div>
        
        {/* Actions Bar */}
        <div className="bg-white border-b border-gray-200 px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-80">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 w-full rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
          </div>
          
          <button 
            onClick={fetchRequests}
            disabled={isRefreshing}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl transition-all duration-300 ${
              isRefreshing ? "bg-gray-200 text-gray-500" : "bg-blue-100 text-blue-700 hover:bg-blue-200"
            }`}
          >
            <RefreshCw size={18} className={isRefreshing ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6 md:p-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-12 h-12 border-4 border-blue-200 border-t-blue -600 rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">Loading requests...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12 bg-red-50 rounded-xl border border-red-100">
              <AlertTriangle size={48} className="mx-auto text-red-500 mb-4" />
              <p className="text-red-800">{error}</p>
              <button 
                onClick={fetchRequests}
                className="mt-4 px-6 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors duration-300"
              >
                Try Again
              </button>
            </div>
          ) : filteredRequests.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-xl">
              <User  size={64} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-700 text-lg">
                {searchTerm ? "No matching requests found." : "No client requests available."}
              </p>
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm("")}
                  className="mt-4 px-6 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors duration-300"
                >
                  Clear Search
                </button>
              )}
            </div>
          ) : (
            <ul className="space-y-6">
              {filteredRequests.map((request) => (
  <li key={request._id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4" onClick={() => navigate(`/agents/client-details/${request.userId._id}`)}>
          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${getAvatarColor(request.userId.userName)}`}>
            {getInitials(request.userId.userName)}
            
          </div>
          <div>
            <p className="font-semibold text-xl text-gray-800 cursor-pointer hover:text-blue-600 transition duration-300 flex items-center gap-2">
              {request.userId.userName}
              <span className="text-blue-500 text-sm font-normal hover:underline">(view profile)</span>
            </p>
            <p className="text-sm text-gray-500">{request.userId.email}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
          {request.accept_status === "accepted" ? (
            <>
              <span className="text-green-600 font-semibold">Accepted</span>
              <button 
                onClick={() => navigate(`/chat/${request.userId._id}`)}  
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-5 py-2 rounded-xl flex items-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Chat Now
              </button>
            </>
          ) : request.accept_status === "rejected" ? (
            <span className="text-red-600 font-semibold">Rejected</span>
          ) : (
            <>
              <button 
                onClick={() => handleAction(request._id, "accepted")} 
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-5 py-2 rounded-xl flex items-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <Check size={18} /> Accept
              </button>
              <button 
                onClick={() => setShowRemarkInput(request._id)} 
                className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-5 py-2 rounded-xl flex items-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <X size={18} /> Reject
              </button>
            </>
          )}
          <button
            onClick={() => toggleDetails(request._id)}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-xl flex items-center gap-1 transition-all duration-300"
          >
            Details
            <ChevronDown 
              size={16} 
              className={`transition-transform duration-300 ${expandedDetails === request._id ? "transform rotate-180" : ""}`} 
            />
          </button>
        </div>
      </div>

                    {/* Optional Details */}
                    {expandedDetails === request._id && (
                      <div className="mt-4 pt-4 border-t border-gray-100 text-sm text-gray-600 transition-opacity duration-300 opacity-100">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="font-medium">Request Date</p>
                            <p>{new Date(request.createdAt || Date.now()).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="font-medium">User  ID</p>
                            <p className="font-mono text-xs bg-gray-100 p-1 rounded">{request.userId._id}</p>
                          </div>
                          {request.userId.phoneNumber && (
                            <div>
                              <p className="font-medium">Phone Number</p>
                              <p>{request.userId.phoneNumber}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Rejection Form */}
                    {showRemarkInput === request._id && (
                      <div className="mt-5 pt-5 border-t border-gray-200 transition-all duration-300">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Reason for rejection:
                        </label>
                        <textarea
                          className="w-full border border-gray-300 bg-white rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-red-400 shadow-sm transition-all duration-300"
                          placeholder="Please provide a detailed explanation..."
                          rows={3}
                          value={remark}
                          onChange={(e) => setRemark(e.target.value)}
                        />
                        <div className="flex gap-3 mt-3">
                          <button 
                            onClick={() => handleAction(request._id, "rejected")}
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                          >
                            Submit Rejection
                          </button>
                          <button 
                            onClick={() => {
                              setShowRemarkInput(null);
                              setRemark("");
                            }}
                            className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-all duration-300"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      
      {/* Page footer */}
      <div className="mt-6 text-center text-gray-500 text-sm">
        <p>Showing {filteredRequests.length} of {requests.length} total requests</p>
      </div>
    </div>
  );
};

export default ClientRequests;