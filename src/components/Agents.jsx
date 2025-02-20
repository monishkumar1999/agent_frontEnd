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
    countryCode:"",
    countryName:"",
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
      // Property Step validation
      if (!details.propertyType || !details.bedroomCount || !details.weeklyOrSaleValue) {
        toast.error("Please complete all fields in 'About Property'!", {
          position: "top-center",
          autoClose: 3000,
        });
        return false;
      }
    } else if (currentStep === 1) {
      // Location Step validation
      if (!details.location) {
        toast.error("Please provide a location!", {
          position: "top-center",
          autoClose: 3000,
        });
        return false;
      }
    } else if (currentStep === 2) {
      // Needs Step validation
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
      // Final Step validation
      if (!details.emailAddress || !details.phoneNumber) {
        toast.error("Please provide both your email address and phone number!", {
          position: "top-center",
          autoClose: 3000,
        });
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

  const handleSendOTP = async() => {
    localStorage.setItem("SendOTP", true);
    const requestData = {
      email: details.emailAddress // Get email from formData
    };

    try {
      const response = await fetch('https://api.agentmatchr.com/api/sendCode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      });

      const result = await response.json();

      if (result.code === 1) {
        
        // showToast('Code sent to email successfully');
        // setSendOTP(true);
        // Call the onNext prop to proceed

      } else {
        // showToast('Failed to send code: ' + result.message);
      }
    } catch (error) {
      // showToast('Error: ' + error.message);
    }
    
    
  };

  const handleNavigated = () => {
    localStorage.removeItem("SendOTP");
    navigate("/ListOfBuyerAgents", { state: { details } });
  };

  const updateDetails = (newData) => {
    setDetails((prevDetails) => ({ ...prevDetails, ...newData }));
  };

  return (
    <section
      className={`self-stretch flex flex-row items-start justify-center pt-0 pb-[82px] pl-[21px] pr-5 box-border max-w-full shrink-0 text-center text-29xl text-black font-instrument-sans mq800:pb-[34px] mq800:box-border mq1125:pb-[53px] mq1125:box-border `}
    >
      <ToastContainer />
      <div className="w-[1087px] flex flex-col items-start justify-start gap-[50px] max-w-full mq800:gap-[25px]">
        <div className="self-stretch flex flex-row items-start justify-center py-0 px-5 box-border max-w-full">
          <div className="w-[607px] flex flex-col items-start justify-start gap-[15px] max-w-full">
            <h1 className="m-0 relative text-[48px] font-semibold font-[inherit] mq800:text-19xl mq450:text-10xl">
              Explore Our Network of Top Buyer's Agents
            </h1>
            <div className="relative text-xl tracking-[0.01em] mq450:text-base">
              Get all the details you need to compare agents side by side, so
              you're confident before your first conversation.
            </div>
          </div>
        </div>
        <div className="self-stretch rounded-xl bg-[#8046F1] border-gainsboro-400 border-[1px] border-solid box-border overflow-hidden flex flex-col items-end justify-start pt-2 px-[9px] pb-[31px] gap-[42px] max-w-full text-lg text-dimgray mq800:gap-[21px]">
          <div className="self-stretch shadow-[0px_4px_54px_rgba(0,_0,_0,_0.02)] rounded-xl bg-white border-gainsboro-200 border-[1px] border-solid box-border overflow-hidden flex flex-col items-end justify-start py-[29px] pl-[292px] pr-[291px] gap-[13px] max-w-full mq800:pl-[73px] mq800:pr-[72px] mq800:box-border mq450:pl-5 mq450:pr-5 mq450:box-border mq1125:pl-[146px] mq1125:pr-[145px] mq1125:box-border">
            <div className="w-[448px] h-[15%] flex flex-row items-start justify-start gap-20 max-w-full mq450:gap-10">
              <ol className="flex items-center w-full text-xs text-gray-900 font-medium sm:text-base">
                {steps.map((step, index) => (
                  <li
                    key={step.number}
                    className={`
                        flex-1 relative flex flex-col items-center 
                        ${index < steps.length - 1
                        ? "after:content-[''] after:w-full after:h-0.5 after:absolute after:top-8 after:left-1/2"
                        : ""
                      }
                        ${index === currentStep
                        ? "text-indigo-600 after:bg-indigo-600"
                        : "text-gray-900 after:bg-gray-200"
                      }
                      `}
                  >
                    <div className="flex flex-col items-center whitespace-nowrap z-10 text-center">
                      <span
                        className={`
                          w-10 h-10 flex justify-center items-center mb-2 text-xl rounded-full p-7 
                          ${index === currentStep
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-50 text-gray-900 border-2 border-[#E1E2E4]"
                          }
                        `}
                      >
                        {step.number}
                      </span>
                      <span className="text-center">{step.label}</span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          {/* Render the current step's content */}
          {currentStep === 0 && <PropertyStep details={details} updateDetails={updateDetails} />}
          {currentStep === 1 && <LocationStep details={details} updateDetails={updateDetails} />}
          {currentStep === 2 && <NeedsStepper details={details} updateDetails={updateDetails} />}
          {currentStep === 3 && <FinalStep details={details} updateDetails={updateDetails} />}
          {status === "true" ? (
            <button
              onClick={handleNavigated}
              className={`
              mx-auto w-[80%] rounded-full py-4 px-6 font-semibold flex items-center justify-center gap-2 
              hover:bg-gray-50 transition-colors text-lg
              bg-white text-[#8046F1]
            `}
            >
              Confirm
            </button>
          ) : (
            <button
              onClick={
                currentStep === steps.length - 1 ? handleSendOTP : handleNext
              }
              className={`
              mx-auto w-[80%] rounded-full py-4 px-6 font-semibold flex items-center justify-center gap-2 
              hover:bg-gray-50 transition-colors text-lg
              ${currentStep === steps.length - 1
                  ? "bg-white text-[#8046F1]"
                  : "bg-white text-[#8046F1]"
                }
            `}
            >
              {currentStep === steps.length - 1 ? "Send OTP" : "Next"}
              {currentStep < steps.length - 1 && (
                <ArrowRight className="w-5 h-5" />
              )}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Agents;
