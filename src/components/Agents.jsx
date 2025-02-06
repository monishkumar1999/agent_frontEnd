import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropertyStep from "./stepper/Property/Property";
import LocationStep from "./stepper/Location/Location";
import NeedsStepper from "./stepper/YourNeeds/Needs";
import FinalStep from "./stepper/Finish/Finish";
import { useNavigate } from "react-router-dom";

const Agents = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("");

  const [details, setDetails] = useState({
    propertyType: "",
    bedroomCount: "",
    weeklyOrSaleValue: "",
    location: "",
    emailAddress: "",
    phoneNumber: "",
    selectedOption: "",
    selectedPurpose: "",
    selectedUserCommunication: "",
    isAssistance: false,
    isLegalReady: false,
    isOTPVerified: false,
    countryCode: "",
    countryName: "",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const CheckOTP = localStorage.getItem("SendOTP");
      setStatus(CheckOTP);
    }, 2000);
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const steps = [
    { number: "01", label: "About Property" },
    { number: "02", label: "Location" },
    { number: "03", label: "Your Needs" },
    { number: "04", label: "Finish" },
  ];

  const [currentStep, setCurrentStep] = useState(0);

  const validateCurrentStep = () => {
    if (currentStep === 0) {
      if (
        !details.propertyType ||
        !details.bedroomCount ||
        !details.weeklyOrSaleValue
      ) {
        toast.error("Please complete all fields in 'About Property'!", {
          position: "top-center",
          autoClose: 3000,
        });
        return false;
      }
    } else if (currentStep === 1) {
      if (!details.location) {
        toast.error("Please provide a location!", {
          position: "top-center",
          autoClose: 3000,
        });
        return false;
      }
    } else if (currentStep === 2) {
      if (
        !details.selectedPlan ||
        !details.selectedPurpose ||
        !details.selectedUserCommunication ||
        details.isAssistance === undefined ||
        details.isLegalReady === undefined
      ) {
        toast.error("Please complete all fields in 'Your Needs'!", {
          position: "top-center",
          autoClose: 3000,
        });
        return false;
      }
    } else if (currentStep === 3) {
      if (!details.emailAddress || !details.phoneNumber) {
        toast.error(
          "Please provide both your email address and phone number!",
          {
            position: "top-center",
            autoClose: 3000,
          }
        );
        return false;
      }
      if (!details.isOTPVerified) {
        toast.error("Please verify the OTP before proceeding!", {
          position: "top-center",
          autoClose: 3000,
        });
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSendOTP = async () => {
    console.log("User Details Before Sending OTP:", details); // Log all entered details to the console

    localStorage.setItem("SendOTP", true);
    const requestData = {
      email: details.emailAddress, // Get email from formData
    };

    try {
      const response = await fetch("https://api.agentmatchr.com/api/sendCode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();

      if (result.code === 1) {
        // OTP sent successfully
        toast.success("OTP sent successfully!", {
          position: "top-center",
          autoClose: 3000,
        });
      } else {
        // OTP failed
        toast.error("Failed to send OTP. Please try again!", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      // Error handling
      console.error("Error sending OTP:", error);
      toast.error("An error occurred while sending OTP. Please try again!", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  const handleNavigated = () => {
    localStorage.removeItem("SendOTP");
    console.log("User Details:", details);
    navigate("/ListOfBuyerAgents", { state: { details } });
  };

  const updateDetails = (newData) => {
    setDetails((prevDetails) => ({ ...prevDetails, ...newData }));
  };

  const isStepValid = (stepIndex) => {
    if (stepIndex === 0) {
      return (
        details.propertyType &&
        details.bedroomCount &&
        details.weeklyOrSaleValue
      );
    }
    if (stepIndex === 1) {
      return details.location;
    }
    if (stepIndex === 2) {
      return (
        details.selectedPlan &&
        details.selectedPurpose &&
        details.selectedUserCommunication &&
        details.isAssistance !== undefined &&
        details.isLegalReady !== undefined
      );
    }
    if (stepIndex === 3) {
      return (
        details.emailAddress && details.phoneNumber && details.isOTPVerified
      );
    }
    return true;
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

        <div className="bg-[#8046F1] rounded-xl overflow-hidden flex flex-col gap-6 px-5 py-4 w-full">
          <div className="w-full shadow-md bg-white rounded-xl p-6 flex flex-col items-center gap-4">
            <ol className="flex justify-center items-center w-full space-x-6 sm:space-x-8">
              {steps.map((step, index) => (
                <li
                  key={step.number}
                  className={`flex-1 relative flex flex-col items-center ${
                    index < steps.length - 1
                      ? "after:content-[''] after:w-full after:h-0.5 after:absolute after:top-8 after:left-1/2"
                      : ""
                  } ${
                    index === currentStep
                      ? "text-indigo-600 after:bg-indigo-600"
                      : "text-gray-900 after:bg-gray-200"
                  }`}
                >
                  <div
                    onClick={() => {
                      if (isStepValid(index) || index === currentStep) {
                        setCurrentStep(index);
                      }
                    }}
                    className={`cursor-pointer flex flex-col items-center ${
                      !isStepValid(index) && index !== currentStep
                        ? "cursor-not-allowed opacity-50"
                        : ""
                    }`}
                  >
                    <span
                      className={`w-12 h-12 flex justify-center items-center mb-2 text-lg rounded-full ${
                        index === currentStep
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-50 text-gray-900 border-2 border-[#E1E2E4]"
                      }`}
                    >
                      {step.number}
                    </span>
                    <span className="text-xs sm:text-sm text-center">
                      {step.label}
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Render the current step's content */}
          {currentStep === 0 && (
            <PropertyStep details={details} updateDetails={updateDetails} />
          )}
          {currentStep === 1 && (
            <LocationStep details={details} updateDetails={updateDetails} />
          )}
          {currentStep === 2 && (
            <NeedsStepper details={details} updateDetails={updateDetails} />
          )}
          {currentStep === 3 && (
            <FinalStep details={details} updateDetails={updateDetails} />
          )}

          <div className="flex justify-center">
            {status === "true" ? (
              <button
                onClick={handleNavigated}
                className="w-full sm:w-3/4 py-4 rounded-full bg-white text-[#8046F1] font-semibold text-lg flex items-center justify-center gap-2"
              >
                Confirm
              </button>
            ) : (
              <button
                onClick={
                  currentStep === steps.length - 1 ? handleSendOTP : handleNext
                }
                className="w-full sm:w-3/4 py-4 rounded-full bg-white text-[#8046F1] font-semibold text-lg flex items-center justify-center gap-2"
              >
                {currentStep === steps.length - 1 ? "Send OTP" : "Next"}
                {currentStep < steps.length - 1 && (
                  <ArrowRight className="w-5 h-5" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Agents;