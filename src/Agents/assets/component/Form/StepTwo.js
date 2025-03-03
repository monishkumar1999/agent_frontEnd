import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../../../../utils/axiosInstance";
import { updateFormData } from "../../../../admin/reduxStore/formSlice";

const StepTwo = ({ errors = {} }) => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form.formData);
  const [agencyTypes, setAgencyTypes] = useState([]);

  useEffect(() => {
    const fetchAgencyTypes = async () => {
      try {
        const response = await axiosInstance.get("/describeMaster/view");

        console.log("Full API Response:", response.data); // Debugging log

        if (response.data && Array.isArray(response.data.data)) {
          // If data is inside a nested "data" property
          setAgencyTypes(response.data.data.map((item) => item.type || item.name));
        } else if (Array.isArray(response.data)) {
          // If response is already an array
          setAgencyTypes(response.data.map((item) => item.type || item.name));
        } else {
          console.error("Unexpected API response format:", response.data);
          setAgencyTypes([]);
        }
      } catch (error) {
        console.error("Error fetching agency types:", error.response?.data || error.message);
        setAgencyTypes([]);
      }
    };

    fetchAgencyTypes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateFormData({ [name]: value }));
  };

  return (
    <div>
      <label className="block text-gray-700 text-left ">Agency Name</label>
      <input
        type="text"
        name="agency_name"
        value={formData.agency_name || ""}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg mt-2 bg-white text-black border-indigo-600"
        placeholder="Enter Your Agency Name..."
      />
      {errors.agency_name && <p className="text-red-500">{errors.agency_name}</p>}
      <label className="block text-gray-700 text-left mt-4">Branch</label>
                <input
                  type="text"
                  name="Branch"
                  value={formData.Branch}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg mt-2 border-indigo-600 bg-white text-black"
                  placeholder="Branch Name..."
                />
                {errors.Branch && <p className="text-red-500">{errors.Branch}</p>}

                <label className="block text-gray-700 text-left mt-4">Location Address</label>
                <input
                  type="text"
                  name="location_Address"
                  value={formData.location_Address}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg mt-2 bg-white text-black border-indigo-600"
                  placeholder="Location Address..."
                />
                {errors.location_Address && <p className="text-red-500">{errors.location_Address}</p>}

      <label className="block text-gray-700 text-left mt-4">Which Best Describes Your Agency?</label>
      <select
        name="agencyType"
        value={formData.agencyType || ""}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg mt-2 bg-white text-black border-indigo-600"
      >
        <option value="">Select Agency Type</option>
        {agencyTypes.length > 0 ? (
          agencyTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))
        ) : (
          <option disabled>Loading options...</option>
        )}
      </select>
      {errors.agencyType && <p className="text-red-500">{errors.agencyType}</p>}
    </div>
  );
};

export default StepTwo;
