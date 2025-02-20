import React, { useEffect, useState } from "react";
import { Check, ChevronDown, HelpCircle } from "lucide-react";
import axios from "axios";

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [describe, setdescribe] = useState([]);
  const [role, setrole] = useState([]);
  const [describeMaster, setdescribeMaster] = useState([]);
  const [serviceProvide, setserviceProvide] = useState([]);
  const [salemethod, setsalemethod] = useState([]);
  const [durationRoute, setdurationRoute] = useState([]);
  const [specalize, setspecalize] = useState([]);
  const [typically, setTypically] = useState([]);
  const [videoCalltech, setvideoCalltech] = useState([]);
  const [digitalTech, setdigitalTech] = useState([]);
  const [load, setLoading] = useState("");
  const [error, setError] = useState("");

  console.log(describeMaster)
  const [formData, setFormData] = useState({
    // Step 1
    aboutYou: "",
    aboutAgency: "",
    negotiationStyle: "",
    role: "Principal / Director",
    position: "Administration manager",
    // Step 2
    agencyName: "",
    branch: "",
    location: "",
    agencyType: "Franchise",
    // Step 3
    services: "Property Search",
    salesMethod: "Private sales",
    agreementDuration: "1 Month",
    teamCount: "",
    postcodes: ["", "", "", ""],
    specialization: "Residential",
    clientTypes: "Full-time buyers",
    offerVideoCalls: "Yes",
    videoTechnology: "Zoom",
    digitalSolutions: "3D tours",
    feeStructure: {
      propertyRangeStart: "$50,000",
      propertyRangeEnd: "$200,000",
      feeType: "Percentage",
      feeAmount: "",
    },
  });

  const getData = [
    {
      apiName: "master",
      useMethodname: setdescribe,
    },
    {
      apiName: "roleMaster",
      useMethodname: setrole,
    },

    {
      apiName: "describeMaster",
      useMethodname: setdescribeMaster,
    },

    {
      apiName: "describeMaster",
      useMethodname: setdescribeMaster,
    },

    {
      apiName: "serviceProvide",
      useMethodname: setserviceProvide,
    },

    {
      apiName: "salemethod",
      useMethodname: setsalemethod,
    },
    {
      apiName: "durationRoute",
      useMethodname: setdurationRoute,
    },
    {
      apiName: "specalize",
      useMethodname: setspecalize,
    },
    {
      apiName: "typically",
      useMethodname: setTypically,  
    },{
      apiName: "videoCalltech",
      useMethodname: setvideoCalltech,  
    },
    {
      apiName: "digitalTech",
      useMethodname: setdigitalTech,  
    }

  ];
  
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        for (const data of getData) {
          const response = await axios.get(
            `http://localhost:8000/${data.apiName}/view`,
            { withCredentials: true }
          );
          data.useMethodname(response.data.data || []); // Update state with fetched data
        }
  
        setLoading(false); // Set loading to false after all requests complete
      } catch (err) {
        setError("Failed to load roles");
        setLoading(false);
      }
    };
  
    fetchRoles();
  }, []);
  
  

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePostcodeChange = (index, value) => {
    const newPostcodes = [...formData.postcodes];
    newPostcodes[index] = value;
    setFormData((prevState) => ({
      ...prevState,
      postcodes: newPostcodes,
    }));
  };

  const handleFeeStructureChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      feeStructure: {
        ...prevState.feeStructure,
        [name]: value,
      },
    }));
  };

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

 
  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = "/ProfileSuccess";
    console.log("Form submitted:", formData);
  };

  const StepIndicator = () => (
    <div className="flex justify-between items-center mb-12 mt-10 relative w-[50%] mx-auto">
      <div className="absolute top-4 left-0 w-full h-[2px] bg-[#B4BAC8]">
        <div
          className="h-full bg-[#7F56D9] transition-all duration-300"
          style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
        />
      </div>
      {["About You", "About Agency", "Setup your profile"].map(
        (step, index) => (
          <div key={step} className={`flex flex-col items-center z-10 ${
            index === 0
              ? "-ml-10"
              : index === 1
              ? "items-center"
              : "-mr-12"
          }`}>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 
              ${
                currentStep > index + 1
                  ? "bg-[#039855]"
                  : currentStep === index + 1
                  ? "bg-[#7F56D9]"
                  : "bg-white"
              } 
              ${currentStep >= index + 1 ? "text-white" : "text-[#7F56D9]"} 
              border-2 border-solid ${
                currentStep > index + 1
                  ? "border-[#039855]"
                  : currentStep === index + 1
                  ? "border-[#7F56D9]"
                  : "border-[#D6BBFB]"
              }`}
            >
              {currentStep > index + 1 ? (
                <Check className="w-5 h-5" />
              ) : (
                // <img
                //   className="h-[30px] w-[30px]"
                //   loading="lazy"
                //   alt="Completed step"
                //   src="/images/checkmark-circle-03.png"
                // />
                <span className="text-sm font-medium">{`0${index + 1}`}</span>
              )}
            </div>
            <span
              className={`text-sm font-medium ${
                currentStep > index + 1
                  ? "text-[#039855]"
                  : currentStep === index + 1
                  ? "text-[#7F56D9]"
                  : "text-[#7F56D9]"
              }`}
            >
              {step}
            </span>
          </div>
        )
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#ECECEC] from-purple-50 to-white flex flex-col items-center">
      <header className="w-full bg-white px-16 py-4 flex justify-between items-center mb-8 z-[1]">
        <img
          className="h-[22.4px] relative max-w-full overflow-hidden shrink-0"
          loading="lazy"
          alt="FindMyAgent logo"
          src="/findmyagent.svg"
        />
        <button
          onClick={openModal}
          className="text-[#7F56D9] border border-[2px] border-[#7F56D9] py-2 px-4 rounded-full hover:bg-[#F3F0FF] transition-colors"
        >
          See Pricing Model
        </button>
      </header>
      <img
        className="absolute top-[-322px] left-[-524px] w-[720.2px] h-[698.2px]"
        alt=""
        src="/footer-wave.svg"
      />
      <div className="w-full max-w-5xl px-4 z-[1]">
        <StepIndicator />
        <form onSubmit={handleSubmit}>
          {currentStep === 1 && (
            <div className="space-y-8">
              <div className="space-y-8 mb-12">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    About you
                  </label>
                  <textarea
                    name="aboutYou"
                    className="w-full p-4 border-[1px] border-solid border-[#B4BAC8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F56D9] focus:border-transparent"
                    rows={3}
                    value={formData.aboutYou}
                    onChange={handleInputChange}
                    placeholder="Tell us about yourself..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    About your agency
                  </label>
                  <textarea
                    name="aboutAgency"
                    className="w-full p-4 border-[1px] border-solid border-[#B4BAC8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F56D9] focus:border-transparent"
                    rows={3}
                    value={formData.aboutAgency}
                    onChange={handleInputChange}
                    placeholder="Tell us about your agency..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Negotiation style and approach
                  </label>
                  <textarea
                    name="negotiationStyle"
                    className="w-full p-4 border-[1px] border-solid border-[#B4BAC8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F56D9] focus:border-transparent"
                    rows={3}
                    value={formData.negotiationStyle}
                    onChange={handleInputChange}
                    placeholder="Describe your negotiation style..."
                  />
                </div>
              </div>
              <div className="space-y-8 mb-12">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-4 italic">
                    Which best describes you?
                  </p>
                  <div className="flex flex-wrap gap-3">
  {describe.length > 0 &&
    describe.map((role) => (
      <button
        key={role._id} // Use a unique identifier like `_id` for the key
        type="button"
        onClick={() => setFormData((prev) => ({ ...prev, role: role.name }))}
        className={`flex items-center gap-2 py-2 px-4 rounded-full transition-colors ${
          formData.role === role.name
            ? "bg-[#7F56D9] text-white"
            : "border border-black bg-white text-gray-700 hover:bg-gray-50"
        }`}
      >
        {formData.role === role.name && (
          <div
            className="relative inline-flex items-center justify-center w-6 h-6 rounded-full"
            style={{ backgroundColor: "white" }}
          >
            <Check className="w-4 h-4" color="#8046F1" strokeWidth={3} />
          </div>
        )}
        {role.name} {/* Render the name property */}
      </button>
    ))}
</div>


                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-4 italic">
                    What is your role?
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {role.map((position) => (
                      <button
                        key={position._id}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, position:position.name }))
                        }
                        className={`flex items-center gap-2 py-2 px-4 rounded-full transition-colors ${
                          formData.position === position.name
                            ? "bg-[#7F56D9] text-white"
                            : "border border-black bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {formData.position === position.name && (
                          <div
                            className="relative inline-flex items-center justify-center w-6 h-6 rounded-full"
                            style={{ backgroundColor: "white" }}
                          >
                            <Check
                              className="w-4 h-4"
                              color="#8046F1"
                              strokeWidth={3}
                            />
                          </div>
                        )}
                        {position.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-[#7F56D9] text-white mt-[20px] mb-[40px] py-2 px-48 rounded-full hover:bg-[#6941C6] transition-colors font-semibold"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="max-w-xl mx-auto">
              <h2 className="text-2xl font-bold text-center mb-4">
                About your agency
              </h2>
              <p className="text-center text-black mb-8">
                Great! Now we just need a few details about your agency
              </p>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Agency Name
                  </label>
                  <input
                    type="text"
                    name="agencyName"
                    value={formData.agencyName}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-[#B4BAC8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F56D9] focus:border-transparent"
                    placeholder="Enter your agency name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Branch
                  </label>
                  <input
                    type="text"
                    name="branch"
                    value={formData.branch}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-[#B4BAC8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F56D9] focus:border-transparent"
                    placeholder="Branch name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location Address
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-[#B4BAC8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F56D9] focus:border-transparent"
                    placeholder="Enter location"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Which best describes your agency?
                  </label>
                  <div className="relative">
                    <select
                      name="agencyType"
                      value={formData.agencyType}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-[#B4BAC8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F56D9] focus:border-transparent appearance-none"
                    >
                      {describeMaster.map((item) => (
    <option key={item._id} value={item.name}>
      {item.name}
    </option>
  ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-[#7F56D9] text-white mt-[40px] mb-[40px] py-2 px-48 rounded-full hover:bg-[#6941C6] transition-colors font-semibold"
                >
                  Next
                </button>
              </div>
              {/* <div className="mt-12 flex justify-between">
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="bg-white text-[#7F56D9] border border-[#7F56D9] py-3 px-4 rounded-full hover:bg-[#F3F0FF] transition-colors font-semibold"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-[#7F56D9] text-white py-3 px-4 rounded-full hover:bg-[#6941C6] transition-colors font-semibold"
                >
                  Next
                </button>
              </div> */}
            </div>
          )}

          {currentStep === 3 && (
            <div className="max-w-xl mx-auto space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full range of services you provide
                </label>
                <div className="relative">
                  <select
                    name="services"
                    value={formData.services}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-[#B4BAC8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F56D9] focus:border-transparent appearance-none"
                  >
                 {serviceProvide.map((item) => (
    <option key={item._id} value={item.name}>
      {item.name}
    </option>
  ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What method of sales do you cover?
                </label>
                <div className="relative">
                  <select
                    name="salesMethod"
                    value={formData.salesMethod}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-[#B4BAC8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F56D9] focus:border-transparent appearance-none"
                  >
                      {salemethod.map((item) => (
    <option key={item._id} value={item.name}>
      {item.name}
    </option>
  ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What's the duration of your buyer's agency agreement?
                </label>
                <div className="relative">
                  <select
                    name="agreementDuration"
                    value={formData.agreementDuration}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-[#B4BAC8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F56D9] focus:border-transparent appearance-none"
                  >
                      {durationRoute.map((item) => (
    <option key={item._id} value={item.name}>
      {item.name}
    </option>
  ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your sales team count
                </label>
                <input
                  type="number"
                  name="teamCount"
                  value={formData.teamCount}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-[#B4BAC8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F56D9] focus:border-transparent"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Which postcodes do you cover
                </label>
                <div className="flex gap-2">
                  {formData.postcodes.map((code, index) => (
                    <input
                      key={index}
                      type="text"
                      value={code}
                      onChange={(e) =>
                        handlePostcodeChange(index, e.target.value)
                      }
                      className="w-24 p-3 border border-[#B4BAC8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F56D9] focus:border-transparent"
                      placeholder={`100${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Areas of specialization
                </label>
                <div className="relative">
                  <select
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-[#B4BAC8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F56D9] focus:border-transparent appearance-none"
                  >

                    {specalize.map((item) => (
    <option key={item._id} value={item.name}>
      {item.name}
    </option>
  ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Types of clients you typically work with
                </label>
                <div className="relative">
                  <select
                    name="clientTypes"
                    value={formData.clientTypes}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-[#B4BAC8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F56D9] focus:border-transparent appearance-none"
                  >
                   {typically.map((item) => (
    <option key={item._id} value={item.name}>
      {item.name}
    </option>
  ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Do you offer video calls for homebuyers?
                </label>
                <div className="relative">
                  <select
                    name="offerVideoCalls"
                    value={formData.offerVideoCalls}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-[#B4BAC8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F56D9] focus:border-transparent appearance-none"
                  >
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What technology do you use for video calls?
                </label>
                <div className="relative">
                  <select
                    name="videoTechnology"
                    value={formData.videoTechnology}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-[#B4BAC8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F56D9] focus:border-transparent appearance-none"
                  >
                    <option>Zoom</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Which digital solutions do you offer?
                </label>
                <div className="relative">
                  <select
                    name="digitalSolutions"
                    value={formData.digitalSolutions}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-[#B4BAC8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F56D9] focus:border-transparent appearance-none"
                  >
                    <option>3D tours</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How do you structure your fees?
                </label>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600 ">
                    For Properties between
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="relative flex-1">
                      <select
                        name="propertyRangeStart"
                        value={formData.feeStructure.propertyRangeStart}
                        onChange={handleFeeStructureChange}
                        className="w-full p-3 border border-[#B4BAC8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F56D9] focus:border-transparent appearance-none"
                      >
                        <option>$50,000</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    </div>
                    <div className="relative flex-1">
                      <select
                        name="propertyRangeEnd"
                        value={formData.feeStructure.propertyRangeEnd}
                        onChange={handleFeeStructureChange}
                        className="w-full p-3 border border-[#B4BAC8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F56D9] focus:border-transparent appearance-none"
                      >
                        <option>$200,000</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-[10px]">I charge a</p>
                  <div className="flex items-center gap-4">
                    <div className="relative flex-1">
                      <select
                        name="feeType"
                        value={formData.feeStructure.feeType}
                        onChange={handleFeeStructureChange}
                        className="w-full p-3 border border-[#B4BAC8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F56D9] focus:border-transparent appearance-none"
                      >
                        <option>Percentage</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    </div>
                    <input
                      type="text"
                      name="feeAmount"
                      value={formData.feeStructure.feeAmount}
                      onChange={handleFeeStructureChange}
                      className="flex-1 p-3 border border-[#B4BAC8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F56D9] focus:border-transparent"
                      placeholder="5.000"
                    />
                    <span className="text-sm text-gray-600">%</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  // onClick={handleNext}
                  className="bg-[#7F56D9] text-white mt-[40px] mb-[40px] py-2 px-48 rounded-full hover:bg-[#6941C6] transition-colors font-semibold"
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gradient-to-b from-white to-yellow-200 p-8 rounded-lg max-w-[1200px] w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <h2 className="text-[48px] font-bold text-center mb-12">
              Pricing Model
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-8">
              {/* First Card */}
              <div className="w-[350px] h-[300px] bg-white rounded-[20px] p-8 border-[2px] border-[#7F56D9]">
                <h3 className="text-[24px] font-semibold mb-8">
                  Monthly Subscription Fees
                </h3>
                <ol className="space-y-6 list-decimal list-inside">
                  <li className="text-[16px] leading-relaxed">
                    Agencies and additional agents pay monthly subscription fees
                    ($1000)
                  </li>
                  <li className="text-[16px] leading-relaxed">
                    Expected growth: Start with 50 agencies, growing to 200
                    agencies by Year 3.
                  </li>
                </ol>
              </div>

              {/* Middle Card - Taller */}
              <div className="w-[350px] h-[380px] bg-gradient-to-br from-[#5F1BE3] to-[#560064] rounded-[20px] p-8 text-white">
                <h3 className="text-[24px] font-semibold mb-8">
                  Monthly Subscription Fees
                </h3>
                <ol className="space-y-6 list-decimal list-inside">
                  <li className="text-[16px] leading-relaxed">
                    10% fee on agents commissions from closed deals
                  </li>
                  <li className="text-[16px] leading-relaxed">
                    Average deal size: $500,000 with a 2% agent commission
                  </li>
                  <li className="text-[16px] leading-relaxed">
                    Expected closed deals: 100 deals in Year 1, scaling to 500
                    by Year 3.
                  </li>
                </ol>
              </div>

              {/* Third Card */}
              <div className="w-[350px] h-[300px] bg-white rounded-[20px] p-8 border-[2px] border-[#7F56D9]">
                <h3 className="text-[24px] font-semibold mb-8">
                  Monthly Subscription Fees
                </h3>
                <ol className="space-y-6 list-decimal list-inside">
                  <li className="text-[16px] leading-relaxed">
                    Revenue from premium features (e.g: advanced market
                    analytics, exclusive listing).
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiStepForm;
