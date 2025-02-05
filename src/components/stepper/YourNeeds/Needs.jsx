import { Check } from "lucide-react";
import React from "react";

export default function NeedsStepper({ details, updateDetails }) {
  const planningType = ["Immediately", "1-3 months", "4-5 months", "6+ months"];
  const PurchaseOption = ["Living", "Investment", "Vacation"];
  const CommunicateOption = ["Email", "Phone", "In-app messaging"];

  return (
    <>
      <div className="mx-auto w-[80%] text-left">
        <div className="space-y-12 text-white">
          {/* Planning to Buy */}
          <div>
            <h3 className="text-2xl font-medium italic mb-6">
              When are you planning to buy your new home?{" "}
            </h3>
            <div className="flex flex-wrap gap-3">
              {planningType.map((type) => (
                <button
                  key={type}
                  onClick={() => updateDetails({ selectedPlan: type })}
                  className={`
                    flex items-center gap-2 px-6 py-3 rounded-full text-base transition-all
                    ${
                      details.selectedPlan === type
                        ? "bg-white text-[#8046F1] font-bold"
                        : "border border-white/40 hover:border-white"
                    }
                  `}
                >
                  {details.selectedPlan === type && (
                    <div
                      className="relative inline-flex items-center justify-center w-6 h-6 rounded-full"
                      style={{ backgroundColor: "#5600FF" }}
                    >
                      <Check
                        className="w-4 h-4"
                        color="white"
                        strokeWidth={3}
                      />
                    </div>
                  )}
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Purpose of Purchase */}
          <div>
            <h3 className="text-2xl font-medium italic mb-6">
              What’s the purpose of your purchase?{" "}
            </h3>
            <div className="flex flex-wrap gap-3">
              {PurchaseOption.map((type) => (
                <button
                  key={type}
                  onClick={() => updateDetails({ selectedPurpose: type })}
                  className={`
                    flex items-center gap-2 px-6 py-3 rounded-full text-base transition-all
                    ${
                      details.selectedPurpose === type
                        ? "bg-white text-[#8046F1] font-bold"
                        : "border border-white/40 hover:border-white"
                    }
                  `}
                >
                  {details.selectedPurpose === type && (
                    <div
                      className="relative inline-flex items-center justify-center w-6 h-6 rounded-full"
                      style={{ backgroundColor: "#5600FF" }}
                    >
                      <Check
                        className="w-4 h-4"
                        color="white"
                        strokeWidth={3}
                      />
                    </div>
                  )}
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Preferred Communication */}
          <div>
            <h3 className="text-2xl font-medium italic mb-6">
              What’s your preferred way to communicate?{" "}
            </h3>
            <div className="flex flex-wrap gap-3">
              {CommunicateOption.map((type) => (
                <button
                  key={type}
                  onClick={() => updateDetails({ selectedUserCommunication: type })}
                  className={`
                    flex items-center gap-2 px-6 py-3 rounded-full text-base transition-all
                    ${
                      details.selectedUserCommunication === type
                        ? "bg-white text-[#8046F1] font-bold"
                        : "border border-white/40 hover:border-white"
                    }
                  `}
                >
                  {details.selectedUserCommunication === type && (
                    <div
                      className="relative inline-flex items-center justify-center w-6 h-6 rounded-full"
                      style={{ backgroundColor: "#5600FF" }}
                    >
                      <Check
                        className="w-4 h-4"
                        color="white"
                        strokeWidth={3}
                      />
                    </div>
                  )}
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Additional Questions */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="pre-qualified"
                className="block text-sm font-medium text-white"
              >
                Are you pre-qualified or pre-approved for a mortgage?
              </label>
              <select
                id="pre-qualified"
                value={details.isLegalReady ? "Yes" : "No"}
                onChange={(e) =>
                  updateDetails({ isLegalReady: e.target.value === "Yes" })
                }
                className="mt-1 block w-full h-[50px] text-black rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              >
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="assistance"
                className="block text-sm font-medium text-white"
              >
                Would you like assistance with negotiation and closing?
              </label>
              <select
                id="assistance"
                value={details.isAssistance ? "Yes" : "No"}
                onChange={(e) =>
                  updateDetails({ isAssistance: e.target.value === "Yes" })
                }
                className="mt-1 block w-full h-[50px] text-black rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              >
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
