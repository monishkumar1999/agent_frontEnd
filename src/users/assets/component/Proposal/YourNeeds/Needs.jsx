import React, { useEffect, useState } from "react";
import axiosInstance from "../../../../../utils/axiosInstance";

export default function NeedsStepper({ details, updateDetails }) {
  const planningType = ["Immediately", "1-3 months", "4-5 months", "6+ months"];

  const [purchaseOptions, setPurchaseOptions] = useState([]);
  const [communicationOptions, setCommunicationOptions] = useState([]);
  const [error, setError] = useState(null);

  // Fetch purchase and communication options from backend
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        // Fetch purchase options
        const purchaseResponse = await axiosInstance.get("/purchase/view");
        if (Array.isArray(purchaseResponse.data.data)) {
          setPurchaseOptions(purchaseResponse.data.data);
        } else {
          throw new Error("Invalid purchase data format");
        }

        // Fetch communication options
        const communicationResponse = await axiosInstance.get(
          "/communicate/view"
        );
        if (Array.isArray(communicationResponse.data.data)) {
          setCommunicationOptions(communicationResponse.data.data);
        } else {
          throw new Error("Invalid communication data format");
        }
      } catch (error) {
        console.error("Error fetching options:", error);
        setError("Failed to load options");
      }
    };

    fetchOptions();
  }, []);

  const getButtonClasses = (isSelected) => `
    flex items-center px-4 py-2 rounded-full border-2 text-base transition-all duration-300 ease-in-out transform
    ${
      isSelected
        ? "bg-gradient-to-r from-purple-500 to-violet-800 text-white border-transparent shadow-lg scale-100 hover:scale-110"
        : "border-[#8A2BE2] text-[#8A2BE2] hover:bg-violet-100 hover:shadow-md hover:scale-105 transition delay-100"
    }
  `;

  return (
    <div className="mx-auto w-[90%] text-left">
      <div className="space-y-10 text-black">
        {/* Planning to Buy */}
        <div>
          <h3 className="text-xl font-semibold mb-4">
            When are you planning to buy your new home?
          </h3>
          <div className="flex flex-wrap gap-3">
            {planningType.map((type) => (
              <button
                key={type}
                onClick={() => updateDetails({ selectedPlan: type })}
                className={getButtonClasses(details.selectedPlan === type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Purpose of Purchase - Now Dynamic */}
        <div>
          <h3 className="text-xl font-semibold mb-4">
            What’s the purpose of your purchase?
          </h3>
          <div className="flex flex-wrap gap-3">
            {error ? (
              <p className="text-red-500">{error}</p>
            ) : purchaseOptions.length > 0 ? (
              purchaseOptions.map((type) => (
                <button
                  key={type.name}
                  onClick={() => updateDetails({ selectedPurpose: type._id })}
                  className={getButtonClasses(
                    details.selectedPurpose === type._id
                  )}
                >
                  {type.name}
                </button>
              ))
            ) : (
              <p>Loading options...</p>
            )}
          </div>
        </div>

        {/* Preferred Communication - Now Dynamic */}
        <div>
          <h3 className="text-xl font-semibold mb-4">
            What’s your preferred way to communicate?
          </h3>
          <div className="flex flex-wrap gap-3">
            {error ? (
              <p className="text-red-500">{error}</p>
            ) : communicationOptions.length > 0 ? (
              communicationOptions.map((type) => (
                <button
                  key={type.name}
                  onClick={() =>
                    updateDetails({ selectedUserCommunication: type._id })
                  }
                  className={getButtonClasses(
                    details.selectedUserCommunication === type._id
                  )}
                >
                  {type.name}
                </button>
              ))
            ) : (
              <p>Loading options...</p>
            )}
          </div>
        </div>

        {/* Additional Questions */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Are you pre-qualified or pre-approved for a mortgage?
            </label>
            <select
              value={details.isLegalReady || ""}
              onChange={(e) => updateDetails({ isLegalReady: e.target.value })}
              className="mt-1 block w-full h-[50px] text-black rounded-md border-2 transition-all duration-300 ease-in-out transform
                border-[#8A2BE2] bg-white shadow-md
                focus:outline-none focus:ring-2 focus:ring-[#8A2BE2] 
                hover:bg-violet-100 hover:shadow-md hover:scale-105 transition delay-100"
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Would you like assistance with negotiation and closing?
            </label>
            <select
              value={details.isAssistance || ""}
              onChange={(e) => updateDetails({ isAssistance: e.target.value })}
              className="mt-1 block w-full h-[50px] text-black rounded-md border-2 transition-all duration-300 ease-in-out transform
                border-[#8A2BE2] bg-white shadow-md
                focus:outline-none focus:ring-2 focus:ring-[#8A2BE2] 
                hover:bg-violet-100 hover:shadow-md hover:scale-105 transition delay-100"
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
