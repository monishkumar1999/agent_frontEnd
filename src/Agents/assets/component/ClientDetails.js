import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import { 
  User, Mail, Phone, Home, DollarSign, Bed, Check, X, 
  Calendar, ArrowLeft, RefreshCw, AlertTriangle
} from "lucide-react";
import { IMGURL } from "../../../utils/imgpath";

const NOPROFILE_BASE = IMGURL;

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

      console.log(response)
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

  const getInitials = (name) => {
    if (!name) return "U";
    const nameParts = name.split(" ");
    if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();
    return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
  };

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
      {notification && (
        <div 
          className={`fixed top-6 right-6 z-50 p-4 rounded-lg shadow-lg flex items-center gap-3 ${notification.type === "success" ? "bg-green-500" : "bg-red-500"} text-white`}
        >
          {notification.type === "success" ? <Check size={20} /> : <AlertTriangle size={20} />}
          <p>{notification.message}</p>
        </div>
      )}

      <button
        onClick={() => navigate("/agents/request")}
        className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-800"
      >
        <ArrowLeft size={16} /> Back to Client Requests
      </button>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl shadow-xl">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="mt-6 text-gray-600 text-lg">Loading client details...</p>
        </div>
      ) : error ? (
        <div className="text-center py-20 bg-red-50 rounded-3xl shadow-xl">
          <AlertTriangle size={64} className="mx-auto text-red-500 mb-4" />
          <p className="text-red-800 text-xl font-medium">{error}</p>
          <button
            onClick={fetchClientDetails}
            className="mt-6 px-6 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg"
          >
            <RefreshCw size={16} /> Try Again
          </button>
        </div>
      ) : !client ? (
        <div className="text-center py-20 bg-gray-50 rounded-3xl shadow-xl">
          <User size={64} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-700 text-xl">No client details found.</p>
        </div>
      ) : (
        <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-3xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-700 to-blue-700 p-8 relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6">
              {client.userId.profile_img ? (
                <img
                  src={`${NOPROFILE_BASE}${client.userId.profile_img}`}
                  alt="Profile"
                  className="w-24 h-24 rounded-full border-4 border-white shadow-xl object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                    const parent = e.target.parentNode;
                    const avatar = document.createElement('div');
                    avatar.className = `w-24 h-24 rounded-full flex items-center justify-center text-white text-2xl font-bold ${getAvatarColor(client.userId.userName)}`;
                    avatar.textContent = getInitials(client.userId.userName);
                    parent.appendChild(avatar);
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
                  <Mail size={16} /> {client.userId.email}
                </p>
                {client.userId.mobile && (
                  <p className="text-blue-100 opacity-90 flex items-center gap-2 justify-center md:justify-start mt-1">
                    <Phone size={16} /> {client.userId.mobile}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            {/* Status Tag */}
            <div className="mb-6 flex items-center justify-center md:justify-start">
              {client.accept_status === "accepted" ? (
                <span className="bg-green-500 text-white px-4 py-2 rounded-xl">Accepted</span>
              ) : client.accept_status === "rejected" ? (
                <span className="bg-red-500 text-white px-4 py-2 rounded-xl">Rejected</span>
              ) : (
                <span className="bg-yellow-500 text-white px-4 py-2 rounded-xl">Pending</span>
              )}
            </div>

            {/* Action Buttons */}
            {client.accept_status !== "accepted" && client.accept_status !== "rejected" && (
              <div className="mb-8 flex flex-wrap gap-4 justify-center md:justify-start">
                <button
                  onClick={() => handleAction(client._id, "accepted")}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-xl flex items-center gap-2"
                >
                  <Check size={20} /> Accept Client
                </button>
                <button
                  onClick={() => setShowRemarkInput(!showRemarkInput)}
                  className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-6 py-3 rounded-xl flex items-center gap-2"
                >
                  <X size={20} /> {showRemarkInput ? "Cancel Rejection" : "Reject Client"}
                </button>
              </div>
            )}

            {/* Rejection Input */}
            {showRemarkInput && client.accept_status !== "accepted" && client.accept_status !== "rejected" && (
              <div className="mb-8 p-6 bg-red-50 rounded-xl">
                <h3 className="text-lg font-semibold text-red-800 mb-3">Rejection Details</h3>
                <textarea
                  className="w-full p-4 border border-red-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
                  rows={4}
                  placeholder="Enter rejection reason..."
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                />
                <button
                  onClick={() => handleAction(client._id, "rejected")}
                  className="mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl w-full md:w-auto"
                >
                  Submit Rejection
                </button>
              </div>
            )}

            {/* Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <User size={20} className="text-blue-600" /> Personal Information
                </h3>
                <div className="space-y-3">
                  <p><Mail size={16} className="inline-block mr-2" /> {client.userId.email}</p>
                  {client.userId.mobile && (
                    <p><Phone size={16} className="inline-block mr-2" /> {client.userId.mobile}</p>
                  )}
                  <p><Calendar size={16} className="inline-block mr-2" /> {new Date(client.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Home size={20} className="text-blue-600" /> Property Preferences
                </h3>
                <div className="space-y-3">
  {client.proposalId?.propertyType && (
    <p><Home size={16} className="inline-block mr-2" /> Property Type: {client.proposalId.propertyType}</p>
  )}
  {client.proposalId?.price_range && (
    <p>
      <DollarSign size={16} className="inline-block mr-2" />
      {client.proposalId.price_range.min && client.proposalId.price_range.max
        ? `$${client.proposalId.price_range.min} - $${client.proposalId.price_range.max}`
        : "Price range not available"}
    </p>
  )}
  {client.proposalId?.rooms && (
    <p><Bed size={16} className="inline-block mr-2" /> Rooms: {client.proposalId.rooms}</p>
  )}
</div>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientDetails;
