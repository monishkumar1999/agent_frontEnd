import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Home, MapPin, ClipboardList } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { updateDetails } from "../admin/reduxStore/user/detailsSlice";
import PropertyStep from "../users/assets/component/Proposal/Property/Property";
import LocationStep from "../users/assets/component/Proposal/Location/Location";
import NeedsStepper from "../users/assets/component/Proposal/YourNeeds/Needs";

import axiosInstance from "../utils/axiosInstance";

const FindAgentForm = () => {
  const details = useSelector((state) => state.details);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const steps = [
    { id: "01", label: "About Property", component: PropertyStep, icon: Home },
    { id: "02", label: "Location", component: LocationStep, icon: MapPin },
    { id: "03", label: "Your Needs", component: NeedsStepper, icon: ClipboardList },
  ];

  const [currentStep, setCurrentStep] = useState(0);

  const validateCurrentStep = () => {
    if (currentStep === 0) {
      if (!details.propertyType || !details.weeklyOrSaleValue) {
        toast.error("Please fill all fields in 'About Property' before proceeding!", { position: "top-center" });
        return false;
      }
    } else if (currentStep === 1) {
      if (!details.location ) {
        toast.error("Please enter a location and pincode before proceeding!", { position: "top-center" });
        return false;
      }
    } else if (currentStep === 2) {
      if (!details.selectedPlan || !details.selectedPurpose) {
        toast.error("Please fill all fields in 'Your Needs' before proceeding!", { position: "top-center" });
        return false;
      }
      if (!details.isLegalReady || !details.isAssistance) {
        toast.error("Please select options for mortgage and assistance before proceeding!", { position: "top-center" });
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async (details) => {
    if (validateCurrentStep()) {
      const backendFields = {
        propertyType: "propertyType",
        weeklyOrSaleValue: "price_range",
        location: "location",
        pincode: "pincode",
        selectedPlan: "property_buying_plain",
        selectedPurpose: "purpose_purchase",
        selectedUserCommunication: "communicate_preferred",
      };

      const formattedDetails = Object.keys(backendFields).reduce((acc, key) => {
        if (details[key]?.id) {
          acc[backendFields[key]] = details[key].id;
        } else {
          acc[backendFields[key]] = details[key];
        }
        return acc;
      }, {});

      if (formattedDetails.pincode) {
        formattedDetails.pincode = formattedDetails.pincode.split(",").map((pin) => pin.trim());
      }
      if (formattedDetails.price_range) {
        const priceMatch = formattedDetails.price_range.match(/\$?([\d.]+)(k|m)?\s*to\s*\$?([\d.]+)(k|m)?/i);
        if (priceMatch) {
          const convertToNumber = (value, unit) => {
            let num = parseFloat(value);
            if (unit === "k") return num * 1000;
            if (unit === "m") return num * 1000000;
            return num;
          };
          formattedDetails.price_range = {
            min: convertToNumber(priceMatch[1], priceMatch[2]),
            max: convertToNumber(priceMatch[3], priceMatch[4]),
          };
        } else {
          console.error("Invalid price range format:", formattedDetails.price_range);
        }
      }

      console.log("Submitting Data:", formattedDetails);
      navigate(`/showAgent`);
    }
  };

  const handleUpdateDetails = (newData) => {
    dispatch(updateDetails(newData));
  };

  return (
    <section className="flex justify-center items-start pt-10 pb-20  max-w-full text-center text-gray-900 font-sans ">
      <ToastContainer />
      <div className="w-full max-w-4xl flex flex-col items-center gap-12">
        <div className="w-full flex flex-col items-center gap-6">
        <h1 className="text-2xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-2  py-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-fade-in ">
          Explore Our Network of Top Buyer's Agents
          </h1>
          <p className="text-lg md:text-xl text-gray-600 font-medium text-center max-w-2xl">
            Get all the details you need to compare agents side by side, so you're confident before your first conversation.
          </p>
        </div>

        <div className="w-full bg-white overflow-hidden p-6">
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
            <div
              className="bg-slate-700 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>

          {/* Step Indicators */}
          <div className="w-full flex justify-between mb-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center">
                <div
                  className={`w-24 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-300 ${
                    currentStep === index
                      ? "bg-slate-700 text-white border-slate-800"
                      : "bg-gray-200 border-gray-300 text-gray-500"
                  }`}
                >
                  <step.icon className="w-6 h-6" />
                </div>
                <span className="mt-2 text-sm font-medium text-gray-700">{step.label}</span>
              </div>
            ))}
          </div>

          {/* Form Content */}
          <div className="bg-white p-6  shadow-md border rounded-md">
            {React.createElement(steps[currentStep].component, {
              details,
              updateDetails: handleUpdateDetails,
            })}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            <button
              onClick={handleBack}
              className={`py-2 px-6 rounded-lg text-lg font-semibold border-2 border-slate-700 text-slate-700 bg-white transition-all ${
                currentStep === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-slate-100"
              }`}
              disabled={currentStep === 0}
            >
              Back
            </button>
            <button
              onClick={
                currentStep === steps.length - 1 ? () => handleSubmit(details) : handleNext
              }
              className="py-2 px-6 rounded-lg text-lg font-semibold border-2 border-slate-700 text-slate-700 bg-white transition-all"
            >
              {currentStep === steps.length - 1 ? "Submit" : "Next"}
              <ArrowRight className="w-5 h-5 inline ml-2" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FindAgentForm;