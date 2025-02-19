import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "../../../../utils/axiosInstance";

Modal.setAppElement("#root"); // Accessibility requirement

const AgentModal = ({ agent, onClose }) => {
    const [agentDetails, setAgentDetails] = useState(null);

    useEffect(() => {
        const fetchAgentDetails = async () => {
            if (!agent?._id) return; // Prevent API call if agent is null

            try {
                const response = await axiosInstance.post("/admin/get-agent-details", { id: agent._id });
                setAgentDetails(response.data.data); // ✅ Store response data correctly
            } catch (error) {
                console.error("Error fetching agent details:", error);
            }
        };

        fetchAgentDetails();
    }, [agent?._id]); // ✅ Re-fetch when agent changes

    if (!agent) return null;

    return (
        <AnimatePresence>
        <Modal
    isOpen={!!agent}
    onRequestClose={onClose}
    contentLabel="Agent Details"
    className="flex items-center justify-center"
    overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center backdrop-blur-md"
>
    <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -50, scale: 0.9 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full max-h-[80vh] overflow-y-auto" // ✅ Fixed max height & scroll
    >
        <h2 className="text-xl font-bold mb-4">Agent Details</h2>

        <div className="overflow-y-auto max-h-[60vh] p-2">  {/* ✅ Scrollable area */}
            <img
                src={agentDetails?.profile_img || "/default-avatar.png"}
                alt="Profile"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
            />
            <p><strong>Name:</strong> {agentDetails?.firstName} {agentDetails?.lastName}</p>
            <p><strong>Email:</strong> {agentDetails?.email}</p>
            <p><strong>Phone:</strong> {agentDetails?.phone}</p>
            <p><strong>Status:</strong> {agentDetails?.is_approval === "1" ? "✅ Approved" : "⏳ Pending"}</p>
            <p><strong>Joined:</strong> {agentDetails?.createdAt ? new Date(agentDetails.createdAt).toLocaleDateString() : "N/A"}</p>

            <h3 className="text-lg font-bold mt-4">Agent Information</h3>
            <p><strong>Agency:</strong> {agentDetails?.agentDetails?.agency_name || "N/A"}</p>
            <p><strong>Work Type:</strong> {agentDetails?.agentDetails?.agent_work_type || "N/A"}</p>
            <p><strong>Agency Type:</strong> {agentDetails?.agentDetails?.agencyType || "N/A"}</p>
            <p><strong>Specialization:</strong> {agentDetails?.agentDetails?.specialization || "N/A"}</p>
            <p><strong>Services Provided:</strong> {agentDetails?.agentDetails?.services_provided || "N/A"}</p>
            <p><strong>Fees:</strong> ${agentDetails?.agentDetails?.fees_structure?.min} - ${agentDetails?.agentDetails?.fees_structure?.max}</p>
        </div>

        <button
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded w-full"
            onClick={onClose}
        >
            Close
        </button>
    </motion.div>
</Modal>

        </AnimatePresence>
    );
};

export default AgentModal;
