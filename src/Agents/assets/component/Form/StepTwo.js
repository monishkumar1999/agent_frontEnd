import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../../../../utils/axiosInstance";
import { updateFormData } from "../../../../admin/reduxStore/formSlice";

const StepTwo = ({ errors = {} }) => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form.formData);
  const [agencyTypes, setAgencyTypes] = useState([]);
  const [loading, setLoading] = useState({
    agencyTypes: true,
    existingData: true
  });

  useEffect(() => {
    // Fetch Agency Types
    const fetchAgencyTypes = async () => {
      try {
        const response = await axiosInstance.get("/describeMaster/view");
        if (response.data && Array.isArray(response.data.data)) {
          setAgencyTypes(response.data.data.map((item) => item.type || item.name));
        }
      } catch (error) {
        console.error("Error fetching agency types:", error.message);
      } finally {
        setLoading((prev) => ({ ...prev, agencyTypes: false }));
      }
    };

    // Fetch Existing Agency Details
    const fetchExistingAgencyData = async () => {
      try {
        const response = await axiosInstance.get("/agent/get-agent-details");
        if (response.data && response.data.status === "true" && response.data.data) {
          const agentData = response.data.data;
          
          // Check if agencyDetails exists in the response
          if (agentData.agentDetails) {
            // Update the Redux store with the fetched data
            dispatch(updateFormData({
              agency_name: agentData.agentDetails.agency_name || "",
              Branch: agentData.agentDetails.Branch || "",
              location_Address: agentData.agentDetails.location_Address || "",
              agencyType: agentData.agentDetails.agencyType || ""
            }));
          }
        }
      } catch (error) {
        console.error("Error fetching existing agency data:", error.message);
      } finally {
        setLoading((prev) => ({ ...prev, existingData: false }));
      }
    };

    fetchAgencyTypes();
    fetchExistingAgencyData();
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateFormData({ [name]: value }));
  };

  return (
    <div>
      {loading.existingData && <p className="text-gray-500">Loading your information...</p>}

      {/* Agency Name */}
      <label className="block text-gray-700 text-left">Agency Name</label>
      <input
        type="text"
        name="agency_name"
        value={formData.agency_name || ""}
        onChange={handleChange}
        className="w-full p-3 border border-gray-700 rounded-lg mt-2 bg-white text-black"
        placeholder="Enter Your Agency Name..."
      />
      {errors.agency_name && <p className="text-red-500">{errors.agency_name}</p>}

      {/* Branch */}
      <label className="block text-gray-700 text-left mt-4">Branch</label>
      <input
        type="text"
        name="Branch"
        value={formData.Branch || ""}
        onChange={handleChange}
        className="w-full p-3 border border-gray-700 rounded-lg mt-2 bg-white text-black"
        placeholder="Branch Name..."
      />
      {errors.Branch && <p className="text-red-500">{errors.Branch}</p>}

      {/* Location Address */}
      <label className="block text-gray-700 text-left mt-4">Location Address</label>
      <input
        type="text"
        name="location_Address"
        value={formData.location_Address || ""}
        onChange={handleChange}
        className="w-full p-3 border border-gray-700 rounded-lg mt-2 bg-white text-black"
        placeholder="Location Address..."
      />
      {errors.location_Address && <p className="text-red-500">{errors.location_Address}</p>}

      {/* Agency Type */}
      <label className="block text-gray-700 text-left mt-4">Which Best Describes Your Agency?</label>
      <div className="flex flex-wrap gap-2 mt-2">
        {loading.agencyTypes ? (
          <p className="text-gray-500">Loading options...</p>
        ) : agencyTypes.length > 0 ? (
          agencyTypes.map((type, index) => (
            <button
              key={index}
              type="button"
              onClick={() => dispatch(updateFormData({ agencyType: type }))}
              className={`px-4 py-2 rounded-full border border-gray-700 ${
                formData.agencyType === type ? "bg-purple-600 text-white" : "text-gray-600"
              }`}
            >
              {type}
            </button>
          ))
        ) : (
          <p className="text-red-500">No options available.</p>
        )}
      </div>
      {errors.agencyType && <p className="text-red-500">{errors.agencyType}</p>}
    </div>
  );
};

export default StepTwo;