import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../../../../utils/axiosInstance";
import { updateFormData } from "../../../../admin/reduxStore/formSlice";

const StepOne = ({ errors = {} }) => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form.formData);
  const [describes_agent, setdescribes_agent] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState({ roles: true, descriptions: true, existingData: true });

  useEffect(() => {
    const fetchRoleDescriptions = async () => {
      try {
        const response = await axiosInstance.get("/describeMaster/view");
        if (response.data && Array.isArray(response.data.data)) {
          setdescribes_agent(response.data.data.map((item) => item.name || item.title));
        }
      } catch (error) {
        console.error("Error fetching role descriptions:", error.message);
      } finally {
        setLoading((prev) => ({ ...prev, descriptions: false }));
      }
    };

    const fetchRoles = async () => {
      try {
        const response = await axiosInstance.get("/roleMaster/view");
        if (response.data && Array.isArray(response.data.data)) {
          setRoles(response.data.data.map((item) => item.name || item.title));
        }
      } catch (error) {
        console.error("Error fetching roles:", error.message);
      } finally {
        setLoading((prev) => ({ ...prev, roles: false }));
      }
    };

    const fetchExistingData = async () => {
      try {
        const response = await axiosInstance.get("/agent/get-agent-details");
        if (response.data && response.data.status === "true" && response.data.data) {
          const agentData = response.data.data;
          
          // Check if agentDetails exists in the response
          if (agentData.agentDetails) {
            // Update the Redux store with the fetched data
            dispatch(updateFormData({
              aboutAgent: agentData.agentDetails.aboutAgent || "",
              aboutAgency: agentData.agentDetails.aboutAgency || "",
              NegotiationStyle: agentData.agentDetails.NegotiationStyle || "",
              describes_agent: agentData.agentDetails.describes_agent || "",
              role: agentData.agentDetails.role || ""
            }));
          }
        }
      } catch (error) {
        console.error("Error fetching existing agent data:", error.message);
      } finally {
        setLoading((prev) => ({ ...prev, existingData: false }));
      }
    };

    fetchRoleDescriptions();
    fetchRoles();
    fetchExistingData();
  }, [dispatch]);

  const handleSelection = (field, value) => {
    dispatch(updateFormData({ [field]: value }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateFormData({ [name]: value }));
  };

  return (
    <div>
      {loading.existingData && <p className="text-gray-500">Loading your information...</p>}
      
      {/* About You */}
      <label className="block text-gray-700 text-left">About You</label>
      <textarea
        name="aboutAgent"
        value={formData.aboutAgent || ""}
        onChange={handleChange}
        className="w-full p-3 border border-gray-700 rounded-lg mt-2 bg-white text-black"
        placeholder="Tell us about yourself..."
      />
      {errors.aboutAgent && <p className="text-red-500">{errors.aboutAgent}</p>}

      {/* About Agency */}
      <label className="block text-gray-700 text-left mt-4">Describe about Your Agency</label>
      <textarea
        name="aboutAgency"
        value={formData.aboutAgency || ""}
        onChange={handleChange}
        className="w-full p-3 border border-gray-700 rounded-lg mt-2 bg-white text-black"
        placeholder="Describe about your Agency..."
      />
      {errors.aboutAgency && <p className="text-red-500">{errors.aboutAgency}</p>}

      {/* Negotiation Style */}
      <label className="block text-gray-700 text-left mt-4">Negotiation Style and Approach</label>
      <textarea
        name="NegotiationStyle"
        value={formData.NegotiationStyle || ""}
        onChange={handleChange}
        className="w-full p-3 border border-gray-700 rounded-lg mt-2 bg-white text-black"
        placeholder="Describe your negotiation style and approach..."
      />
      {errors.NegotiationStyle && <p className="text-red-500">{errors.NegotiationStyle}</p>}

      {/* Which Best Describes You? */}
      <label className="block text-gray-700 font-semibold mt-4 text-left">Which Best Describes You?</label>
      <div className="flex gap-2 mt-2">
        {loading.descriptions ? (
          <p className="text-gray-500">Loading options...</p>
        ) : describes_agent.length > 0 ? (
          describes_agent.map((option, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSelection("describes_agent", option)}
              className={`px-4 py-2 rounded-full border border-gray-700 ${
                formData.describes_agent === option ? "bg-purple-600 text-white" : "text-gray-600"
              }`}
            >
              {option}
            </button>
          ))
        ) : (
          <p className="text-red-500">No options available.</p>
        )}
      </div>
      {errors.describes_agent && <p className="text-red-500">{errors.describes_agent}</p>}

      {/* What is Your Role? */}
      <label className="block text-gray-700 font-semibold mt-4 text-left">What is Your Role?</label>
      <div className="flex flex-wrap gap-2 mt-2">
        {loading.roles ? (
          <p className="text-gray-500">Loading options...</p>
        ) : roles.length > 0 ? (
          roles.map((role, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSelection("role", role)}
              className={`px-4 py-2 rounded-full border border-gray-700 ${
                formData.role === role ? "bg-purple-600 text-white" : "text-gray-600"
              }`}
            >
              {role}
            </button>
          ))
        ) : (
          <p className="text-red-500">No options available.</p>
        )}
      </div>
      {errors.role && <p className="text-red-500">{errors.role}</p>}
    </div>
  );
};

export default StepOne;