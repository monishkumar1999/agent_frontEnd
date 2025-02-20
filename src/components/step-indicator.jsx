import { Check } from "lucide-react";

export function StepIndicator({ currentStep }) {
  return (
    <div className="flex justify-between items-center mb-12 relative w-[50%] mx-auto">
      <div className="absolute top-4 left-0 w-full h-[2px] bg-[#B4BAC8]">
        <div
          className="h-full bg-[#7F56D9] transition-all duration-300"
          style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
        />
      </div>

      <div className="flex flex-col items-center z-10">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 
          ${
            currentStep > 1
              ? "bg-[#10B981]"
              : currentStep === 1
              ? "bg-[#7F56D9] border-white"
              : "bg-white border-[#B4BAC8]"
          } 
          ${currentStep >= 1 ? "text-white" : "text-gray-500"} 
          border-[2px] border-solid`}
        >
          {currentStep > 1 ? <Check className="w-5 h-5" /> : "01"}
        </div>
        <span
          className={`text-sm ${
            currentStep > 1
              ? "text-[#10B981]"
              : currentStep === 1
              ? "text-[#7F56D9]"
              : "text-gray-500"
          }`}
        >
          About You
        </span>
      </div>

      <div className="flex flex-col items-center z-10">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 
          ${
            currentStep > 2
              ? "bg-[#10B981]"
              : currentStep === 2
              ? "bg-[#7F56D9] border-white"
              : "bg-white border-[#B4BAC8]"
          } 
          ${currentStep >= 2 ? "text-white" : "text-gray-500"} 
          border-[2px] border-solid`}
        >
          {currentStep > 2 ? <Check className="w-5 h-5" /> : "02"}
        </div>
        <span
          className={`text-sm ${
            currentStep > 2
              ? "text-[#10B981]"
              : currentStep === 2
              ? "text-[#7F56D9]"
              : "text-gray-500"
          }`}
        >
          About Agency
        </span>
      </div>

      <div className="flex flex-col items-center z-10">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 
          ${
            currentStep > 3
              ? "bg-[#10B981]"
              : currentStep === 3
              ? "bg-[#7F56D9] border-white"
              : "bg-white border-[#B4BAC8]"
          } 
          ${currentStep >= 3 ? "text-white" : "text-gray-500"} 
          border-[2px] border-solid`}
        >
          {currentStep > 3 ? <Check className="w-5 h-5" /> : "03"}
        </div>
        <span
          className={`text-sm ${
            currentStep > 3
              ? "text-[#10B981]"
              : currentStep === 3
              ? "text-[#7F56D9]"
              : "text-gray-500"
          }`}
        >
          Setup your profile
        </span>
      </div>
    </div>
  );
}
