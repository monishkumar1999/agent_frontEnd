import React, { useState } from "react";
import { ArrowRight, Home, MapPin, ClipboardList } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

const MultiStepForm = () => {
  const [step, setStep] = useState(0);
  const [teamCount, setTeamCount] = useState(0);
  const [formData, setFormData] = useState({
    aboutYou: "",
    experience: "",
    agencyName: "",
    branch: "",
    address: "",
    negotiationStyle: "",
    roleDescription: "",
    role: "",
    aboutAgency: "",
    agencyType: "",
    specialization: "",
    clientType: "",
    videoCall: "",
    videoTech: "",
    digitalSolutions: "",
    feesStructure: "",
    feeType: "",
    feeAmount: "",
    services: "",
    salesMethod: "",
    agreementDuration: "",
    postcodes: ["", "", "", ""],
  });

  const steps = [
    { id: "01", label: "About You", icon: Home },
    { id: "02", label: "About Agency", icon: MapPin },
    { id: "03", label: "Setup Profile", icon: ClipboardList },
  ];

  const [errors, setErrors] = useState({});

  const validateCurrentStep = () => {
    const newErrors = {};
    if (step === 0) {
      if (!formData.aboutYou) newErrors.aboutYou = "Please provide information about yourself.";
      if (!formData.experience) newErrors.experience = "Experience details are required.";
      if (!formData.negotiationStyle) newErrors.negotiationStyle = "Negotiation style must be specified.";
      if (!formData.roleDescription) newErrors.roleDescription = "Please describe your role.";
      if (!formData.role) newErrors.role = "Your role is required.";
    } else if (step === 1) {
      if (!formData.agencyName) newErrors.agencyName = "Agency name is required.";
      if (!formData.branch) newErrors.branch = "Branch information is required.";
      if (!formData.address) newErrors.address = "Please provide the agency's address.";
      if (!formData.aboutAgency) newErrors.aboutAgency = "Details about your agency are required.";
      if (!formData.agencyType) newErrors.agencyType = "Please select the type of agency.";
    } else if (step === 2) {
      if (!formData.specialization) newErrors.specialization = "Specialization is required.";
      if (!formData.clientType) newErrors.clientType = "Client type must be specified.";
      if (!formData.videoCall) newErrors.videoCall = "Please indicate if you offer video calls.";
      if (!formData.videoTech) newErrors.videoTech = "Video technology must be specified.";
      if (!formData.digitalSolutions) newErrors.digitalSolutions = "Please list the digital solutions you offer.";
      if (!formData.feesStructure) newErrors.feesStructure = "Fees structure is required.";
      if (!formData.feeType) newErrors.feeType = "Please select a fee type.";
      if (!formData.feeAmount) newErrors.feeAmount = "Fee amount must be specified.";
      if (!formData.services) newErrors.services = "Please select the services you provide.";
      if (!formData.salesMethod) newErrors.salesMethod = "Sales method must be specified.";
      if (!formData.agreementDuration) newErrors.agreementDuration = "Agreement duration is required.";

      // Validate postcodes
      const emptyPostcodes = formData.postcodes.filter(postcode => !postcode);
      if (emptyPostcodes.length > 0) {
        newErrors.postcodes = "All postcode fields are required.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    if (validateCurrentStep()) {
      console.log("Form Data Submitted:", formData);
      toast.success("Form submitted successfully!");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "postcodes") {
      const index = parseInt(e.target.dataset.index);
      const newPostcodes = [...formData.postcodes];
      newPostcodes[index] = value;
      setFormData({ ...formData, postcodes: newPostcodes });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSelection = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleDecrease = () => {
    setTeamCount((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleIncrease = () => {
    setTeamCount((prev) => prev + 1);
  };

  return (
    <section className="flex justify-center items-start pt-0 pb-[82px] pl-[21px] pr-5 max-w-full text-black font-instrument-sans">
      <ToastContainer />
      <div className="w-full max-w-screen-lg flex flex-col items-start gap-[50px]">
        <div className="flex flex-row items-start justify-center px-5 w-full">
          <div className="w-full max-w-screen-md flex flex-col gap-4">
            <h1 className="text-3xl font-semibold sm:text-2xl text-center">
              Explore Our Network of Top Buyer's Agents
            </h1>
            <div className="text-xl sm:text-lg text-center">
              Get all the details you need to compare agents side by side, so you're confident before your first conversation.
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-violet-800 rounded-xl overflow-hidden flex flex-col gap-6 px-5 py-4 w-full relative">
          <div className="w-full shadow-md bg-white rounded-xl p-6 flex flex-col items-center gap-4 relative">
            <div className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-violet-700"></div>
            <div className="flex justify-between w-full relative">
              {steps.map((stepItem, index) => (
                <div key={stepItem.id} className="flex-1 text-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center border-4 transition-all
                      ${step === index
                        ? "bg-gradient-to-r from-purple-600 to-violet-800 text-white border-violet-800"
                        : "bg-white border-gray-400 text-gray-600"
                      }`}
                    >
                      <stepItem.icon className="w-8 h-8" />
                    </div>
                    <div className="mt-2 text-lg font-medium">{stepItem.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            key={step}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 50, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            {step === 0 && (
              <div>
                <label className="block text-gray-700 text-left">About You</label>
                <textarea
                  name="aboutYou"
                  value={formData.aboutYou}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg mt-2 bg-white text-black"
                  placeholder="Tell us about yourself..."
                />
                {errors.aboutYou && <p className="text-red-500">{errors.aboutYou}</p>}

                <label className="block text-gray-700 text-left mt-4">Describe Your Experience</label>
                <textarea
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg mt-2 bg-white text-black"
                  placeholder="Describe your experience..."
                />
                {errors.experience && <p className="text-red-500">{errors.experience}</p>}

                <label className="block text-gray-700 text-left mt-4">Negotiation Style and Approach</label>
                <textarea
                  name="negotiationStyle"
                  value={formData.negotiationStyle}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg mt-2 bg-white text-black"
                  placeholder="Describe your negotiation style and approach..."
                />
                {errors.negotiationStyle && <p className="text-red-500">{errors.negotiationStyle}</p>}

                <label className="block text-gray-700 font-semibold mt-4 text-left">Which Best Describes You?</label>
                <div className="flex gap-2 mt-2">
                  {["Principal / Director", "Employee", "Contractor"].map((option) => (
                    <button
                      key={option}
                      onClick={() => handleSelection("roleDescription", option)}
                      className={`px-4 py-2 rounded-full border ${
                        formData.roleDescription === option
                          ? "bg-purple-600 text-white"
                          : "text-gray-600 border-gray-400"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {errors.roleDescription && <p className="text-red-500">{errors.roleDescription}</p>}

                <label className="block text-gray-700 font-semibold mt-4 text-left">What is Your Role?</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {["Administration Manager", "Assistant Property Manager", "Assistant to the Principal", "Business Development Manager", "Director", "Investor Services Manager", "Licensee", "Senior Property Manager", "Senior Sales Executive", "Others"].map((role) => (
                    <button
                      key={role}
                      onClick={() => handleSelection("role", role)}
                      className={`px-4 py-2 rounded-full border ${
                        formData.role === role
                          ? "bg-purple-600 text-white"
                          : "text-gray-600 border-gray-400"
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
                {errors.role && <p className="text-red-500">{errors.role}</p>}
              </div>
            )}

            {step === 1 && (
              <div>
                <label className="block text-gray-700 text-left">Agency Name</label>
                <input
                  type="text"
                  name="agencyName"
                  value={formData.agencyName}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg mt-2 bg-white text-black"
                  placeholder="Enter Your Agency Name..."
                />
                {errors.agencyName && <p className="text-red-500">{errors.agencyName}</p>}

                <label className="block text-gray-700 text-left mt-4">Branch</label>
                <input
                  type="text"
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg mt-2 bg-white text-black"
                  placeholder="Branch Name..."
                />
                {errors.branch && <p className="text-red-500">{errors.branch}</p>}

                <label className="block text-gray-700 text-left mt-4">Location Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg mt-2 bg-white text-black"
                  placeholder="Location Address..."
                />
                {errors.address && <p className="text-red-500">{errors.address}</p>}

                <label className="block text-gray-700 text-left mt-4">About Your Agency</label>
                <textarea
                  name="aboutAgency"
                  value={formData.aboutAgency}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg mt-2 bg-white text-black"
                  placeholder="Tell us about your agency..."
                />
                {errors.aboutAgency && <p className="text-red-500">{errors.aboutAgency}</p>}

                <label className="block text-gray-700 font-semibold mt-4 text-left">Which Best Describes Your Agency?</label>
                <select
                  name="agencyType"
                  value={formData.agencyType}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg mt-2 bg-white text-black"
                >
                  <option value="">Select Agency Type</option>
                  <option value="Franchise">Franchise</option>
                  <option value="Independent">Independent</option>
                  <option value="Network">Network</option>
                </select>
                {errors.agencyType && <p className="text-red-500">{errors.agencyType}</p>}
              </div>
            )}

            {step === 2 && (
              <div>
                <label className="block text-gray-700 font-semibold mt-4 text-left">Full Range of Services You Provide</label>
                <select
                  name="services"
                  value={formData.services}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg mt-2 bg-white text-black"
                >
                  <option value="">Select Service</option>
                  <option value="Property Search">Property Search</option>
                  <option value="Buy">Buy</option>
                  <option value="Rent">Rent</option>
                </select>
                {errors.services && <p className="text-red-500">{errors.services}</p>}

                <label className="block text-gray-700 font-semibold mt-4 text-left">What Method of Sales Do You Cover?</label>
                <select
                  name="salesMethod"
                  value={formData.salesMethod}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg mt-2 bg-white text-black"
                >
                  <option value="">Select Sales Method</option>
                  <option value="Franchise">Franchise</option>
                  <option value="Independent">Independent</option>
                  <option value="Network">Network</option>
                </select>
                {errors.salesMethod && <p className="text-red-500">{errors.salesMethod}</p>}

                <label className="block text-gray-700 font-semibold mt-4 text-left">What's the Duration of Your Buyer's Agency Agreement?</label>
                <select
                  name="agreementDuration"
                  value={formData.agreementDuration}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg mt-2 bg-white text-black"
                >
                  <option value="">Select Duration</option>
                  <option value="1 Month">1 Month</option>
                  <option value="6 Months">6 Months</option>
                  <option value="1 Year">1 Year</option>
                </select>
                {errors.agreementDuration && <p className="text-red-500">{errors.agreementDuration}</p>}

                <label className="block text-gray-700 mt-4 text-left">Your Sales Team Count</label>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    className="p-2 bg-gray-200 rounded-lg"
                    onClick={handleDecrease}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="w-full p-2 border rounded-lg text-center bg-white text-black"
                    value={teamCount}
                    readOnly
                  />
                  <button
                    className="p-2 bg-gray-200 rounded-lg"
                    onClick={handleIncrease}
                  >
                    +
                  </button>
                </div>

                <label className="block text-gray-700 mt-4 text-left">Which Postcodes Do You Cover?</label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {formData.postcodes.map((postcode, index) => (
                    <input
                      key={index}
                      type="text"
                      className="w-full p-2 border rounded-lg bg-white text-black"
                      placeholder={`Postcode ${index + 1}`}
                      value={postcode}
                      onChange={handleChange}
                      data-index={index}
                      name="postcodes"
                    />
                  ))}
                </div>
                {errors.postcodes && <p className="text-red-500">{errors.postcodes}</p>}

                <label className="block text-gray-700 mt-4 text-left">Areas of Specialization</label>
                <select
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg mt-2 bg-white text-black"
                >
                  <option value="">Select Specialization</option>
                  <option>Residential</option>
                  <option>Commercial</option>
                </select>
                {errors.specialization && <p className="text-red-500">{errors.specialization}</p>}

                <label className="block text-gray-700 mt-4 text-left">Types of Clients You Typically Work With</label>
                <select
                  name="clientType"
                  value={formData.clientType}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg mt-2 bg-white text-black"
                >
                  <option value="">Select Client Type</option>
                  <option>Full-time Buyers</option>
                  <option>Investors</option>
                </select>
                {errors.clientType && <p className="text-red-500">{errors.clientType}</p>}

                <label className="block text-gray-700 mt-4 text-left">Do You Offer Video Calls for Homebuyers?</label>
                <select
                  name="videoCall"
                  value={formData.videoCall}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg mt-2 bg-white text-black"
                >
                  <option value="">Select Option</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
                {errors.videoCall && <p className="text-red-500">{errors.videoCall}</p>}

                <label className="block text-gray-700 mt-4 text-left">What Technology Do You Use for Video Calls?</label>
                <select
                  name="videoTech"
                  value={formData.videoTech}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg mt-2 bg-white text-black"
                >
                  <option value="">Select Technology</option>
                  <option>Zoom</option>
                  <option>Google Meet</option>
                  <option>Microsoft Teams</option>
                </select>
                {errors.videoTech && <p className="text-red-500">{errors.videoTech}</p>}

                <label className="block text-gray-700 mt-4 text-left">Which Digital Solutions Do You Offer?</label>
                <select
                  name="digitalSolutions"
                  value={formData.digitalSolutions}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg mt-2 bg-white text-black"
                >
                  <option value="">Select Solutions</option>
                  <option>3D Tours</option>
                  <option>Virtual Walkthroughs</option>
                  <option>Live Consultations</option>
                </select>
                {errors.digitalSolutions && <p className="text-red-500">{errors.digitalSolutions}</p>}

                <label className="block text-gray-700 mt-4 text-left">How Do You Structure Your Fees?</label>
                <div className="flex gap-2 mt-2">
                  <input
                    type="text"
                    className="w-1/2 p-2 border rounded-lg bg-white text-black"
                    placeholder="$50,000"
                  />
                  <input
                    type="text"
                    className="w-1/2 p-2 border rounded-lg bg-white text-black"
                    placeholder="$200,000"
                  />
                </div>

                <label className="block text-gray-700 mt-4 text-left">I Charge a</label>
                <div className="flex gap-2 mt-2">
                  <select
                    className="w-1/2 p-2 border rounded-lg bg-white text-black"
                    name="feeType"
                    value={formData.feeType}
                    onChange={handleChange}
                  >
                    <option value="">Select Fee Type</option>
                    <option>Percentage</option>
                    <option>Fixed Fee</option>
                  </select>
                  <input
                    type="text"
                    className="w-1/2 p-2 border rounded-lg bg-white text-black"
                    placeholder="5.000"
                  />%
                </div>
                {errors.feeType && <p className="text-red-500">{errors.feeType}</p>}
              </div>
            )}
          </motion.div>

          <div className="flex justify-between w-full">
            <button
              onClick={handleBack}
              className={`py-3 px-6 rounded-full text-lg font-semibold border-2 border-violet-800 text-violet-800 bg-white transition-all ${
                step === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-violet-100"
              }`}
              disabled={step === 0}
            >
              Back
            </button>
            <button
              onClick={step === steps.length - 1 ? handleSubmit : handleNext}
              className="py-3 px-6 rounded-full border-2 border-violet-800 text-violet-800 bg-white text-lg font-semibold transition-all hover:bg-violet-100"
            >
              {step === steps.length - 1 ? "Submit" : "Next"}
              <ArrowRight className="w-5 h-5 inline ml-2" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MultiStepForm;