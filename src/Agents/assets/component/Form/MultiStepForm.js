import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ArrowRight, CheckCircle, ChevronLeft } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { nextStep, prevStep, updateErrors } from "../../../../admin/reduxStore/formSlice";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import axiosInstance from "../../../../utils/axiosInstance";

// Define custom styles for form elements
const formStyles = {
  inputClass: "w-full px-4 py-3 rounded-lg border-2 border-gray-400 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200 shadow-sm hover:shadow-md text-gray-800 border-b-2 border-red-500", // Added text border color
  labelClass: "block text-gray-700 font-medium mb-2",
  selectClass: "w-full px-4 py-3 rounded-lg border-2 border-gray-400 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200 shadow-sm hover:shadow-md",
  checkboxClass: "w-5 h-5 text-indigo-600 rounded border-2 border-gray-400 focus:ring-indigo-500",
  errorClass: "text-red-500 text-sm mt-1"
};

const MultiStepForm = () => {
  const dispatch = useDispatch();
  const { step, formData, errors } = useSelector((state) => state.form);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const agentDetails = formData;

  const validateCurrentStep = () => {
    const newErrors = {};
    // Validation logic...
    dispatch(updateErrors(newErrors));
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      dispatch(nextStep());
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    console.log("Updated Step:", step);
  }, [step]);

  const handleBack = () => {
    if (step > 0) {
      dispatch(prevStep());
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async () => {
    if (validateCurrentStep()) {
      setIsSubmitting(true);
      try {
        // Submit logic...
        toast.success("Form submitted successfully!");
      } catch (error) {
        toast.error("Something went wrong. Please try again.");
        console.error(error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const steps = [
    { name: "Personal Details", component: StepOne },
    { name: "Professional Information", component: StepTwo },
    { name: "Additional Information", component: StepThree },
  ];

  return (
    <section className="flex justify-center items-start pt-16 pb-24 px-5 bg-gradient-to-b from-gray-50 to-gray-100">
      <ToastContainer />
      <div className="w-full max-w-3xl flex flex-col items-center gap-12">
        
        {/* Header Section with Shadow */}
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg border-t-4 border-indigo-600">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            Join Our Network of Top Buyer's Agents
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Fill out the form below to get started. We're here to help you every step of the way.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="w-full max-w-2xl px-4">
          <div className="flex justify-between items-center mb-2">
            {steps.map((s, index) => (
              <div key={index} className="flex flex-col items-center">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold border-2 shadow-md ${
                    step >= index 
                      ? "bg-indigo-600 border-indigo-600 text-white" 
                      : "bg-white border-gray-300 text-gray-400"
                  }`}
                >
                  {step > index ? <CheckCircle className="w-6 h-6" /> : index + 1}
                </div>
                <span className={`mt-2 text-sm font-medium ${step >= index ? "text-indigo-600" : "text-gray-500"}`}>
                  {s.name}
                </span>
              </div>
            ))}
          </div>
          <div className="relative h-2 bg-gray-200 rounded-full mb-8 shadow-inner">
            <div 
              className="absolute top-0 left-0 h-2 bg-indigo-600 rounded-full transition-all duration-300 shadow"
              style={{ width: `${(step / (steps.length - 1)) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Form Container with Enhanced Shadow */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full border border-gray-100">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="p-2"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b-2 border-indigo-100">
              {steps[step].name}
            </h2>
            
            {/* Pass formStyles to each step component */}
            {step === 0 && <StepOne errors={errors} styles={formStyles} />}
            {step === 1 && <StepTwo errors={errors} styles={formStyles} />}
            {step === 2 && <StepThree errors={errors} styles={formStyles} />}
          </motion.div>

          {/* Navigation Buttons with Enhanced Shadow */}
          <div className="flex justify-between w-full mt-8 pt-6 border-t border-gray-200">
            {step > 0 ? (
              <button 
                onClick={handleBack} 
                className="py-3 px-6 rounded-lg border-2 border-gray-300 text-gray-700 bg-white hover:bg-gray-50 transition duration-300 flex items-center shadow-md hover:shadow-lg"
              >
                <ChevronLeft className="w-5 h-5 mr-2" /> Back
              </button>
            ) : (
              <div></div> // Empty div to maintain flex spacing
            )}

            <button 
              onClick={step === 2 ? handleSubmit : handleNext} 
              disabled={isSubmitting}
              className={`py-3 px-8 rounded-lg text-white transition duration-300 flex items-center shadow-lg hover:shadow-xl ${
                isSubmitting 
                  ? "bg-indigo-400 cursor-not-allowed" 
                  : "bg-indigo-600 hover:bg-indigo-700 active:transform active:translate-y-px"
              }`}
            >
              {step === 2 ? (isSubmitting ? "Submitting..." : "Submit") : "Continue"}
              {!isSubmitting && <ArrowRight className="w-5 h-5 ml-2" />}
            </button>
          </div>
        </div>

        {/* Trust Indicators with Enhanced Design */}
        <div className="bg-white p-6 rounded-xl shadow-lg w-full flex items-center justify-center gap-8 text-gray-600 border border-gray-100">
          <div className="flex items-center">
            <div className="bg-indigo-100 p-2 rounded-full mr-3">
              <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path>
              </svg>
            </div>
            <span className="font-medium">Secure Form</span>
          </div>
          <div className="flex items-center">
            <div className="bg-indigo-100 p-2 rounded-full mr-3">
              <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5a2 2 0 012-2zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"></path>
              </svg>
            </div>
            <span className="font-medium">Privacy Protected</span>
          </div>
          <div className="flex items-center">
            <div className="bg-indigo-100 p-2 rounded-full mr-3">
              <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
              </svg>
            </div>
            <span className="font-medium">24/7 Support</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MultiStepForm;