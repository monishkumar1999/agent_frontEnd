import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../../../../utils/axiosInstance";
import { updateFormData } from "../../../../admin/reduxStore/formSlice";

const StepThree = ({ errors = {}, setErrors }) => {
  const dispatch = useDispatch();
  
  const formData = useSelector((state) => state.form.formData);
  const [servicesOptions, setServicesOptions] = useState([]);
  const [salesMethodOptions, setSalesMethodOptions] = useState([]);
  const [durationOptions, setDurationOptions] = useState([]);
  const [specializeOptions, setSpecializeOptions] = useState([]);
  const [typeOptions, setTypeOptions] = useState([]);
  const [videoCalltechOptions, setVideoCalltechOptions] = useState([]);
  const [digitalTechOptions, setDigitalTechOptions] = useState([]);
 

  const sales_team_count = useSelector((state) => state.form.formData.sales_team_count);
  

  const [loading, setLoading] = useState({
    services: true,
    salesMethods: true,
    durations: true,
    specialize: true,
    type: true,
    videoCalltech: true,
    digitalTech: true,
  });

  useEffect(() => {
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
        });
      }
    };

    fetchOptions();
  }, []);

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
        const updatedPostCodes = [...formData.postCode_cover];

        // Ensure the index exists and replace null with an empty string
        updatedPostCodes[index] = value.trim() !== "" ? value : "";

        dispatch(updateFormData({ postCode_cover: updatedPostCodes }));
        return;
    }


    // Ensure fee updates correctly
    if (name === "fee") {
      dispatch(updateFormData({ fee: value }));  
      return;
    }

    dispatch(updateFormData({ [name]: value }));
};

  
  
  const handleIncrease = () => {
    dispatch(updateFormData({ sales_team_count: sales_team_count + 1 }));
  };

  const handleDecrease = () => {
    if (sales_team_count > 1) {
      dispatch(updateFormData({ sales_team_count: sales_team_count - 1 }));
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
        className="w-full p-3 border rounded-lg mt-2 bg-white text-black border-indigo-600"
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
        className="w-full p-3 border rounded-lg mt-2 bg-white text-black border-indigo-600"
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
        className="w-full p-3 border rounded-lg mt-2 bg-white text-black border-indigo-600"
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
          className="w-full p-2 border rounded-lg text-center bg-white text-black border-indigo-600"
          value={sales_team_count}
          readOnly
        />
        <button className="p-2 bg-gray-200 rounded-lg" onClick={handleIncrease}>
          +
        </button>
      </div>

      {/* Postcodes */}
<label className="block text-gray-700 mt-4 text-left">
  Which Postcodes Do You Cover?
</label>
<div className="grid grid-cols-2 gap-2 mt-2">
  {formData.postCode_cover.map((postCode_cover, index) => (
  <input
    key={index}
    type="text"
    className="w-full p-2 border rounded-lg bg-white text-black border-indigo-600"
    placeholder={`Postcode ${index + 1}`}
    value={postCode_cover}
    onChange={handleChange}
    data-index={index}   // Pass index
    name="postCode_cover"     // Name should be "postcodes"
  />
))}

</div>
{errors.postCode_cover && <p className="text-red-500">{errors.postCode_cover}</p>}


      {/* Areas of Specialization */}
      <label className="block text-gray-700 mt-4 text-left">Areas of Specialization</label>
      <select
        name="specialization"
        value={formData.specialization || ""}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg mt-2 bg-white text-black border-indigo-600"
      >
        <option value="">Select Specialization</option>
        {loading.specialize ? (
          <option disabled>Loading specializations...</option>
        ) : specializeOptions.length > 0 ? (
          specializeOptions.map((specialize, index) => (
            <option key={index} value={specialize}>
              {specialize}
            </option>
          ))
        ) : (
          <option disabled>No specializations available</option>
        )}
      </select>
      {errors.specialization && <p className="text-red-500">{errors.specialization}</p>}

      {/* Types of Clients */}
      <label className="block text-gray-700 mt-4 text-left">Types of Clients You Typically Work With</label>
      <select
        name="agent_work_type"
        value={formData.agent_work_type || ""}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg mt-2 bg-white text-black border-indigo-600"
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
        className="w-full p-2 border rounded-lg mt-2 bg-white text-black border-indigo-600"
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
        className="w-full p-3 border rounded-lg mt-2 bg-white text-black border-indigo-600"
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
        className="w-full p-3 border rounded-lg mt-2 bg-white text-black border-indigo-600"
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
      {/* Fees Structure */}
<label className="block text-gray-700 font-semibold mt-4 text-left">
  Fee Structure (Min - Max)
</label>
<div className="flex gap-2 mt-2">
  <input
    type="number"
    name="min"
    value={formData.fees_structure?.min || ""}
    onChange={(e) => handleChange(e, "fees_structure")}
    className="w-full p-2 border rounded-lg bg-white text-black border-indigo-600"
    placeholder="Min Fee"
  />
  <input
    type="number"
    name="max"
    value={formData.fees_structure?.max || ""}
    onChange={(e) => handleChange(e, "fees_structure")}
    className="w-full p-2 border rounded-lg bg-white text-black border-indigo-600"
    placeholder="Max Fee"
  />
</div>
{errors.fees_structure && <p className="text-red-500">{errors.fees_structure}</p>}


      <label className="block text-gray-700 mt-4 text-left">I Charge a</label>
      <div className="flex gap-2 mt-2">
        <select
          className="w-1/2 p-2 border rounded-lg bg-white text-black border-indigo-600"
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
           value={formData?.fee || ""}
           onChange={handleChange}
           className="w-full p-3 border rounded-lg mt-2 bg-white text-black border-indigo-600"
           placeholder="Enter fee..."
         />
      
      </div>
      {errors.chargeType && <p className="text-red-500">{errors.chargeType}</p>}
    </div>
  );
};

export default StepThree;