import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../../../../utils/axiosInstance";
import { updateFormData } from "../../../../admin/reduxStore/formSlice";

const StepThree = ({ errors = {}, setErrors }) => {
  const dispatch = useDispatch();
  
  const formData = useSelector((state) => state.form.formData);
  const [postcodes, setPostcodes] = useState([""]);

  const agentDetails = useSelector((state) => state.form.formData);
  const [servicesOptions, setServicesOptions] = useState([]);
  const [salesMethodOptions, setSalesMethodOptions] = useState([]);
  const [durationOptions, setDurationOptions] = useState([]);
  const [specializeOptions, setSpecializeOptions] = useState([]);
  const [typeOptions, setTypeOptions] = useState([]);
  const [videoCalltechOptions, setVideoCalltechOptions] = useState([]);
  const [digitalTechOptions, setDigitalTechOptions] = useState([]);
 
  const sales_team_count = useSelector((state) => state.form.formData.sales_team_count || 1);
  
  const [loading, setLoading] = useState({
    services: true,
    salesMethods: true,
    durations: true,
    specialize: true,
    type: true,
    videoCalltech: true,
    digitalTech: true,
    existingData: true
  });

  useEffect(() => {
    const fetchExistingData = async () => {
      try {
        const response = await axiosInstance.get("/agent/get-agent-details");
        if (response.data && response.data.status === "true" && response.data.data) {
          const agentData = response.data.data;
          
          // Check if agentDetails exists in the response
          if (agentData.agentDetails) {
            // Update the Redux store with the fetched data for StepThree fields
            dispatch(updateFormData({
              services_provided: agentData.agentDetails.services_provided || "",
              method_of_sale: agentData.agentDetails.method_of_sale || "",
              buyer_agency_agreement: agentData.agentDetails.buyer_agency_agreement || "",
              sales_team_count: agentData.agentDetails.sales_team_count || 1,
              postCode_cover: agentData.agentDetails.postCode_cover || [0, 0, 0],
              specialization: agentData.agentDetails.specialization || "",
              agent_work_type: agentData.agentDetails.agent_work_type || "",
              videoCall_offer: agentData.agentDetails.videoCall_offer || "",
              videoCallTech: agentData.agentDetails.videoCallTech || "",
              digital_solution: agentData.agentDetails.digital_solution || "",
              fees_structure: agentData.agentDetails.fees_structure || { min: "", max: "" },
              chargeType: agentData.agentDetails.chargeType || "",
              fee: agentData.agentDetails.fee || ""
            }));
          }
        }
      } catch (error) {
        console.error("Error fetching existing agent data:", error.message);
      } finally {
        setLoading((prev) => ({ ...prev, existingData: false }));
      }
    };

    const fetchOptions = async () => {
      try {
        const [
          servicesRes,
          salesRes,
          durationRes,
          specializeRes,
          typeRes,
          videoCalltechRes,
          digitalTechRes,
        ] = await Promise.all([
          axiosInstance.get("/serviceProvide/view"),
          axiosInstance.get("/salemethod/view"),
          axiosInstance.get("/durationRoute/view"),
          axiosInstance.get("/specalize/view"),
          axiosInstance.get("/typically/view"),
          axiosInstance.get("/videoCalltech/view"),
          axiosInstance.get("/digitalTech/view"),
        ]);

        console.log("Services API Response:", servicesRes.data);
        console.log("Sales Methods API Response:", salesRes.data);
        console.log("Durations API Response:", durationRes.data);
        console.log("Specialization API Response:", specializeRes.data);
        console.log("Type API Response:", typeRes.data);
        console.log("Video Call Technology API Response:", videoCalltechRes.data);
        console.log("Digital Technology API Response:", digitalTechRes.data);

        // Adjust based on the actual response structure
        if (servicesRes.data && Array.isArray(servicesRes.data.data)) {
          setServicesOptions(servicesRes.data.data.map((item) => item.name));
        } else if (Array.isArray(servicesRes.data)) {
          setServicesOptions(servicesRes.data.map((item) => item.name));
        } else {
          console.error("Unexpected services format:", servicesRes.data);
        }

        if (salesRes.data && Array.isArray(salesRes.data.data)) {
          setSalesMethodOptions(salesRes.data.data.map((item) => item.name));
        } else if (Array.isArray(salesRes.data)) {
          setSalesMethodOptions(salesRes.data.map((item) => item.name));
        } else {
          console.error("Unexpected sales methods format:", salesRes.data);
        }

        if (durationRes.data && Array.isArray(durationRes.data.data)) {
          setDurationOptions(durationRes.data.data.map((item) => item.name));
        } else if (Array.isArray(durationRes.data)) {
          setDurationOptions(durationRes.data.map((item) => item.name));
        } else {
          console.error("Unexpected durations format:", durationRes.data);
        }

        if (specializeRes.data && Array.isArray(specializeRes.data.data)) {
          setSpecializeOptions(specializeRes.data.data.map((item) => item.name));
        } else if (Array.isArray(specializeRes.data)) {
          setSpecializeOptions(specializeRes.data.map((item) => item.name));
        } else {
          console.error("Unexpected specialization format:", specializeRes.data);
        }

        if (typeRes.data && Array.isArray(typeRes.data.data)) {
          setTypeOptions(typeRes.data.data.map((item) => item.name));
        } else if (Array.isArray(typeRes.data)) {
          setTypeOptions(typeRes.data.map((item) => item.name));
        } else {
          console.error("Unexpected type format:", typeRes.data);
        }

        if (videoCalltechRes.data && Array.isArray(videoCalltechRes.data.data)) {
          setVideoCalltechOptions(videoCalltechRes.data.data.map((item) => item.name));
        } else if (Array.isArray(videoCalltechRes.data)) {
          setVideoCalltechOptions(videoCalltechRes.data.map((item) => item.name));
        } else {
          console.error("Unexpected video call technology format:", videoCalltechRes.data);
        }

        if (digitalTechRes.data && Array.isArray(digitalTechRes.data.data)) {
          setDigitalTechOptions(digitalTechRes.data.data.map((item) => item.name));
        } else if (Array.isArray(digitalTechRes.data)) {
          setDigitalTechOptions(digitalTechRes.data.map((item) => item.name));
        } else {
          console.error("Unexpected digital technology format:", digitalTechRes.data);
        }
      } catch (error) {
        console.error("Error fetching options:", error.response?.data || error.message);
      } finally {
        setLoading({
          services: false,
          salesMethods: false,
          durations: false,
          specialize: false,
          type: false,
          videoCalltech: false,
          digitalTech: false,
          existingData: loading.existingData
        });
      }
    };

    fetchExistingData();
    fetchOptions();
  }, [dispatch]);

  const handleChange = (e, parentKey = null) => {
    const { name, value, dataset } = e.target;

    if (parentKey === "fees_structure") {
        dispatch(updateFormData({
            fees_structure: { ...formData.fees_structure, [name]: value }
        }));
        return;
    }

    if (name === "postCode_cover") {
        const index = parseInt(dataset.index, 10);
        const updatedPostCodes = [...(formData.postCode_cover || ["", "", "", ""])];

        // Update only the index that changed
        updatedPostCodes[index] = value;

        dispatch(updateFormData({ postCode_cover: updatedPostCodes }));
        return;
    }

    if (name === "fee") {
        dispatch(updateFormData({ fee: value }));
        return;
    }

    dispatch(updateFormData({ [name]: value }));
};
React.useEffect(() => {
  if (!agentDetails.postCode_cover) {
    dispatch({
      type: 'UPDATE_FORM_DATA',
      payload: {
        ...agentDetails,
        postCode_cover: [''] // Initialize with one empty postcode
      }
    });
  }
}, [agentDetails, dispatch]);

// Function to add a new postcode field (up to 4)
const addPostcode = () => {
  if (postcodes.length < 4) {
    setPostcodes([...postcodes, ""]); // Add a new empty field
  }
};
// Function to update a specific postcode value
const updatePostcode = (index, value) => {
  if (agentDetails.postCode_cover) {
    const updatedPostcodes = [...agentDetails.postCode_cover];
    updatedPostcodes[index] = value;
    dispatch({
      type: 'UPDATE_FORM_DATA',
      payload: {
        ...agentDetails,
        postCode_cover: updatedPostcodes
      }
    });
  }
};

// Function to remove a postcode field
const removePostcode = (index) => {
  if (agentDetails.postCode_cover) {
    const updatedPostcodes = agentDetails.postCode_cover.filter((_, i) => i !== index);
    dispatch({
      type: 'UPDATE_FORM_DATA',
      payload: {
        ...agentDetails,
        postCode_cover: updatedPostcodes
      }
    });
  }
};

// Guard against agentDetails.postCode_cover being undefined



  
  
  const handleIncrease = () => {
    dispatch(updateFormData({ sales_team_count: (sales_team_count || 1) + 1 }));
  };

  const handleDecrease = () => {
    if (sales_team_count > 1) {
      dispatch(updateFormData({ sales_team_count: sales_team_count - 1 }));
    }
  };
  const handlePostcodeChange = (index, value) => {
    if (/^\d*$/.test(value)) { // Allow only numbers
      const newPostcodes = [...postcodes];
      newPostcodes[index] = value;
      setPostcodes(newPostcodes);
    }
  };

  return (
    <div>
      
      
      {/* Services Provided */}
      <label className="block text-gray-700 font-semibold mt-4 text-left">
        Full Range of Services You Provide
      </label>
      <select
        name="services_provided"
        value={formData.services_provided || ""}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg mt-2 bg-white text-black border-gray-700"
      >
        <option value="">Select Service</option>
        {loading.services ? (
          <option disabled>Loading services...</option>
        ) : servicesOptions.length > 0 ? (
          servicesOptions.map((service, index) => (
            <option key={index} value={service}>
              {service}
            </option>
          ))
        ) : (
          <option disabled>No services available</option>
        )}
      </select>
      {errors.services_provided && <p className="text-red-500">{errors.services_provided}</p>}

      {/* Sales Method */}
      <label className="block text-gray-700 font-semibold mt-4 text-left">
        What Method of Sales Do You Cover?
      </label>
      <select
        name="method_of_sale"
        value={formData.method_of_sale || ""}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg mt-2 bg-white text-black border-gray-700"
      >
        <option value="">Select Sales Method</option>
        {loading.salesMethods ? (
          <option disabled>Loading sales methods...</option>
        ) : salesMethodOptions.length > 0 ? (
          salesMethodOptions.map((method, index) => (
            <option key={index} value={method}>
              {method}
            </option>
          ))
        ) : (
          <option disabled>No sales methods available</option>
        )}
      </select>
      {errors.method_of_sale && <p className="text-red-500">{errors.method_of_sale}</p>}

      {/* Agreement Duration */}
      <label className="block text-gray-700 font-semibold mt-4 text-left">
        What's the duration of your buyer's agency agreement?
      </label>
      <select
        name="buyer_agency_agreement"
        value={formData.buyer_agency_agreement || ""}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg mt-2 bg-white text-black border-gray-700"
      >
        <option value="">Select Duration</option>
        {loading.durations ? (
          <option disabled>Loading durations...</option>
        ) : durationOptions.length > 0 ? (
          durationOptions.map((duration, index) => (
            <option key={index} value={duration}>
              {duration}
            </option>
          ))
        ) : (
          <option disabled>No durations available</option>
        )}
      </select>
      {errors.buyer_agency_agreement && <p className="text-red-500">{errors.buyer_agency_agreement}</p>}

      {/* Sales Team Count */}
      <label className="block text-gray-700 mt-4 text-left">
        Your Sales Team Count
      </label>
      <div className="flex items-center gap-2 mt-2">
        <button className="p-2 bg-gray-200 rounded-lg" onClick={handleDecrease}>
          -
        </button>
        <input
          type="sales_team_count"
          className="w-full p-2 border rounded-lg text-center bg-white text-black border-gray-700"
          value={sales_team_count || 1}
          readOnly
        />
        <button className="p-2 bg-gray-200 rounded-lg" onClick={handleIncrease}>
          +
        </button>
      </div>

       {/* Postcode Input Fields */}
       {postcodes.map((postcode, index) => (
        <input
          key={index}
          type="text"
          value={postcode}
          onChange={(e) => handlePostcodeChange(index, e.target.value)}
          className="block mt-2 p-2 border rounded w-full"
          placeholder={`Enter postcode ${index + 1}`}
        />
      ))}

      {/* Add Postcode Button */}
      {postcodes.length < 4 && (
        <button
          type="button"
          onClick={addPostcode}
          className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
        >
          Add Postcode
        </button>
      )}

      {/* Display count */}
      <div className="mt-2 text-sm text-gray-600">
        Postcodes added: {postcodes.length}/4
      </div>
    



      {/* Areas of Specialization */}
      <label className="block text-gray-700 mt-4 text-left">Areas of Specialization</label>
      <select
        name="specialization"
        value={formData.specialization || ""}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg mt-2 bg-white text-black border-gray-700"
      >
        <option value="">Select Type</option>
        {loading.type ? (
          <option disabled>Loading types...</option>
        ) : typeOptions.length > 0 ? (
          typeOptions.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))
        ) : (
          <option disabled>No types available</option>
        )}
      </select>
      {errors.agent_work_type && <p className="text-red-500">{errors.agent_work_type}</p>}

      {/* Video Call Option */}
      <label className="block text-gray-700 mt-4 text-left">Do You Offer Video Calls for Homebuyers?</label>
      <select
        name="videoCall_offer"
        value={formData.videoCall_offer || ""}
        onChange={handleChange}
        className="w-full p-2 border rounded-lg mt-2 bg-white text-black border-gray-700"
      >
        <option value="">Select Option</option>
        <option>Yes</option>
        <option>No</option>
      </select>
      {errors.videoCall_offer && <p className="text-red-500">{errors.videoCall_offer}</p>}

      {/* Video Call Technology */}
      <label className="block text-gray-700 mt-4 text-left">What Technology Do You Use for Video Calls?</label>
      <select
        name="videoCallTech"
        value={formData.videoCallTech || ""}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg mt-2 bg-white text-black border-gray-700"
      >
        <option value="">Select Video Call Technology</option>
        {loading.videoCalltech ? (
          <option disabled>Loading video call technology...</option>
        ) : videoCalltechOptions.length > 0 ? (
          videoCalltechOptions.map((videoCalltech, index) => (
            <option key={index} value={videoCalltech}>
              {videoCalltech}
            </option>
          ))
        ) : (
          <option disabled>No video call technologies available</option>
        )}
      </select>
      {errors.videoCallTech && <p className="text-red-500">{errors.videoCallTech}</p>}

      {/* Digital Solutions */}
      <label className="block text-gray-700 mt-4 text-left">Which Digital Solutions Do You Offer?</label>
      <select
        name="digital_solution"
        value={formData.digital_solution || ""}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg mt-2 bg-white text-black border-gray-700"
      >
        <option value="">Select Digital Technology</option>
        {loading.digitalTech ? (
          <option disabled>Loading digital technologies...</option>
        ) : digitalTechOptions.length > 0 ? (
          digitalTechOptions.map((digitalTech, index) => (
            <option key={index} value={digitalTech}>
              {digitalTech}
            </option>
          ))
        ) : (
          <option disabled>No digital technologies available</option>
        )}
      </select>
      {errors.digital_solution && <p className="text-red-500">{errors.digital_solution}</p>}

      {/* Fee Structure */}
      <label className="block text-gray-700 font-semibold mt-4 text-left">
        Fee Structure (Min - Max)
      </label>
      <div className="flex gap-2 mt-2">
        <input
          type="number"
          name="min"
          value={formData.fees_structure?.min || ""}
          onChange={(e) => handleChange(e, "fees_structure")}
          className="w-full p-2 border rounded-lg bg-white text-black border-gray-700"
          placeholder="Min Fee"
        />
        <input
          type="number"
          name="max"
          value={formData.fees_structure?.max || ""}
          onChange={(e) => handleChange(e, "fees_structure")}
          className="w-full p-2 border rounded-lg bg-white text-black border-gray-700"
          placeholder="Max Fee"
        />
      </div>
      {errors.fees_structure && <p className="text-red-500">{errors.fees_structure}</p>}

      <label className="block text-gray-700 mt-4 text-left">I Charge a</label>
      <div className="flex gap-2 mt-2">
        <select
          className="w-1/2 p-2 border rounded-lg bg-white text-black border-gray-700"
          name="chargeType"
          value={formData.chargeType || ""}
          onChange={handleChange}
        >
          <option value="">Select Fee Type</option>
          <option>Percentage</option>
          <option>Fixed Fee</option>
        </select>
        <input
          type="text"
          name="fee"
          value={formData.fee || ""}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg mt-2 bg-white text-black border-gray-700"
          placeholder="Enter fee..."
        />
      </div>
      {errors.chargeType && <p className="text-red-500">{errors.chargeType}</p>}
    </div>
  );
};

export default StepThree;