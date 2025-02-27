import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateDetails } from "../../../admin/reduxStore/user/detailsSlice";
import { ArrowRight, Home, MapPin, ClipboardList } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropertyStep from "./Proposal/Property/Property";
import LocationStep from "./Proposal/Location/Location";
import NeedsStepper from "./Proposal/YourNeeds/Needs";

import axiosInstance from "../../../utils/axiosInstance";

const DetailsForm = () => {
  const details = useSelector((state) => state.details);
  const dispatch = useDispatch();

  const steps = [
    { id: "01", label: "About Property", component: PropertyStep, icon: Home },
    { id: "02", label: "Location", component: LocationStep, icon: MapPin },
    {
      id: "03",
      label: "Your Needs",
      component: NeedsStepper,
      icon: ClipboardList,
    },
  ];

  const [currentStep, setCurrentStep] = useState(0);

  const validateCurrentStep = () => {
    if (currentStep === 0) {
      if (
        !details.propertyType ||
        !details.bedroomCount ||
        !details.weeklyOrSaleValue
      ) {
        toast.error(
          "Please fill all fields in 'About Property' before proceeding!",
          { position: "top-center" }
        );
        return false;
      }
    } else if (currentStep === 1) {
      if (!details.location || !details.pincode) {
        toast.error("Please enter a location and pincode before proceeding!", {
          position: "top-center",
        });
        return false;
      }
    } else if (currentStep === 2) {
      if (
        !details.selectedPlan ||
        !details.selectedPurpose ||
        !details.selectedUserCommunication
      ) {
        toast.error(
          "Please fill all fields in 'Your Needs' before proceeding!",
          { position: "top-center" }
        );
        return false;
      }
      if (!details.isLegalReady || !details.isAssistance) {
        toast.error(
          "Please select options for mortgage and assistance before proceeding!",
          { position: "top-center" }
        );
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
        bedroomCount: "noOfBedRooms",
        weeklyOrSaleValue: "price_range",
        pincode: "pincode",
        selectedPlan: "property_buying_plain",
        selectedPurpose: "purpose_purchase",
        selectedUserCommunication: "communicate_preferred",
      };

      // Transform details to match API parameters
      const formattedDetails = Object.keys(backendFields).reduce((acc, key) => {
        if (details[key]?.id) {
          acc[backendFields[key]] = details[key].id; // Store only the ID for backend-connected fields
        } else {
          acc[backendFields[key]] = details[key]; // Store other details as-is
        }
        return acc;
      }, {});

      console.log("Submitting Data:", formattedDetails); // Debugging log

      try {
        const response = await axiosInstance.post(
          "/user/store-proposal",
          formattedDetails
        );
        console.log("Response from server:", response.data);
        alert("Form Submitted and Stored Successfully!");
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("Failed to store data. Please try again.");
      }
    }
  };

  const handleUpdateDetails = (newData) => {
    dispatch(updateDetails(newData));
  };

  return (
    <section className="flex justify-center items-start pt-0 pb-[82px] pl-[21px] pr-5 max-w-full text-center text-black font-instrument-sans">
      <ToastContainer />
      <div className="w-full max-w-screen-lg flex flex-col items-start gap-[50px]">
        <div className="flex flex-row items-start justify-center px-5 w-full">
          <div className="w-full max-w-screen-md flex flex-col gap-4">
            <h1 className="text-3xl font-semibold sm:text-2xl text-center">
              Explore Our Network of Top Buyer's Agents
            </h1>
            <div className="text-xl sm:text-lg text-center">
              Get all the details you need to compare agents side by side, so
              you're confident before your first conversation.
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-violet-800 rounded-xl overflow-hidden flex flex-col gap-6 px-5 py-4 w-full relative">
          <div className="w-full shadow-md bg-white rounded-xl p-6 flex flex-col items-center gap-4 relative">
            <div className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-violet-700"></div>
            <div className="flex justify-between w-full relative">
              {steps.map((step, index) => (
                <div key={step.id} className="flex-1 text-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center border-4 transition-all
                      ${
                        currentStep === index
                          ? "bg-gradient-to-r from-purple-600 to-violet-800 text-white border-violet-800"
                          : "bg-white border-gray-400 text-gray-600"
                      }`}
                    >
                      <step.icon className="w-8 h-8" />
                    </div>
                    <div className="mt-2 text-lg font-medium">{step.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            {React.createElement(steps[currentStep].component, {
              details,
              updateDetails: handleUpdateDetails,
            })}
          </div>

          <div className="flex justify-between w-full">
            <button
              onClick={handleBack}
              className={`py-3 px-6 rounded-full text-lg font-semibold border-2 border-violet-800 text-violet-800 bg-white transition-all ${
                currentStep === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-violet-100"
              }`}
              disabled={currentStep === 0}
            >
              Back
            </button>
            <button
              onClick={
                currentStep === steps.length - 1
                  ? () => handleSubmit(details)
                  : handleNext
              }
              className="py-3 px-6 rounded-full border-2 border-violet-800 text-violet-800 bg-white text-lg font-semibold transition-all hover:bg-violet-100"
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

export default DetailsForm;
