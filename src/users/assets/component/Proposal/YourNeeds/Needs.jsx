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
        const communicationResponse = await axiosInstance.get("/communicate/view");
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
    flex items-center px-4 py-2 rounded-lg border-2 text-base font-medium transition-colors
    ${
      isSelected
        ? "bg-slate-600 text-white border-slate-600"
        : "border-slate-400 text-slate-600 hover:bg-slate-100"
    }
  `;

  return (
    <div className="mx-auto w-full max-w-2xl text-left">
      <div className="space-y-6 text-gray-900">
        {/* Planning to Buy */}
        <div>
          <h3 className="text-lg font-semibold mb-2">
            When are you planning to buy your new home?
          </h3>
          <div className="flex flex-wrap gap-2">
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
          <h3 className="text-lg font-semibold mb-2">
            What’s the purpose of your purchase?
          </h3>
          <div className="flex flex-wrap gap-2">
            {error ? (
              <p className="text-red-500 text-sm">{error}</p>
            ) : purchaseOptions.length > 0 ? (
              purchaseOptions.map((type) => (
                <button
                  key={type.name}
                  onClick={() => updateDetails({ selectedPurpose: type._id })}
                  className={getButtonClasses(details.selectedPurpose === type._id)}
                >
                  {type.name}
                </button>
              ))
            ) : (
              <p className="text-sm text-gray-500">Loading options...</p>
            )}
          </div>
        </div>

        {/* Additional Questions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <div className="flex flex-col">
    <label className="block text-sm font-bold text-gray-900 mb-2 whitespace-nowrap">
      Are you a first-time home buyer?
    </label>
    <select
      value={details.isLegalReady || ""}
      onChange={(e) => updateDetails({ isLegalReady: e.target.value })}
      className="w-full h-10 px-3 text-black rounded-md border-2 border-slate-400 bg-white focus:outline-none focus:border-slate-600"
    >
      <option value="">Select</option>
      <option value="Yes">Yes</option>
      <option value="No">No</option>
    </select>
  </div>
  <div className="flex flex-col">
    <label className="block text-sm font-bold text-gray-900 mb-2 whitespace-nowrap">
      Are you pre-qualified or pre-approved for a mortgage?
    </label>
    <select
      value={details.isAssistance || ""}
      onChange={(e) => updateDetails({ isAssistance: e.target.value })}
      className="w-full h-10 px-3 text-black rounded-md border-2 border-slate-400 bg-white focus:outline-none focus:border-slate-600"
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