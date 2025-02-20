"use client";

import { Check } from "lucide-react";

export function StepOne({
  selectedRole,
  setSelectedRole,
  selectedPosition,
  setSelectedPosition,
  onNext,
}) {
  return (
    <div className="space-y-8">
      <div className="space-y-8 mb-12">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            About you
          </label>
          <textarea
            className="w-full p-4 border-[1px] border-solid border-[#B4BAC8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F56D9] focus:border-transparent"
            rows={3}
            defaultValue="experiences for digital products, encompassing Mobile Apps, Web Applications. I love problem-solving abilities and creative skills."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            About your agency
          </label>
          <textarea
            className="w-full p-4 border-[1px] border-solid border-[#B4BAC8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F56D9] focus:border-transparent"
            rows={3}
            defaultValue="experiences for digital products, encompassing Mobile Apps, Web Applications. I love problem-solving abilities and creative skills."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Negotiation style and approach
          </label>
          <textarea
            className="w-full p-4 border-[1px] border-solid border-[#B4BAC8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F56D9] focus:border-transparent"
            rows={3}
            defaultValue="experiences for digital products, encompassing Mobile Apps, Web Applications. I love problem-solving abilities and creative skills."
          />
        </div>
      </div>

      <div className="space-y-8 mb-12">
        <div>
          <p className="text-sm font-medium text-gray-700 mb-4 italic">
            Which best describes you?
          </p>
          <div className="flex flex-wrap gap-3">
            {["Principal / Director", "Employee", "Contractor"].map((role) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`flex items-center gap-2 py-2 px-4 rounded-full transition-colors ${
                  selectedRole === role
                    ? "bg-[#7F56D9] text-white"
                    : "border border-black bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {selectedRole === role && (
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
                {role}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-700 mb-4 italic">
            What is your role?
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              "Administration manager",
              "Assistant property manager",
              "Assistant to the principal",
              "Business development manager",
              "Director",
              "Investor services manager",
              "Licensee",
              "Senior property manager",
              "Senior sales executive",
              "Others",
            ].map((position) => (
              <button
                key={position}
                onClick={() => setSelectedPosition(position)}
                className={`flex items-center gap-2 py-2 px-4 rounded-full transition-colors ${
                  selectedPosition === position
                    ? "bg-[#7F56D9] text-white"
                    : "border border-black bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {selectedPosition === position && (
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
                {position}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onNext}
          className="bg-[#7F56D9] text-white py-2 px-48 rounded-full hover:bg-[#6941C6] transition-colors font-semibold"
        >
          Next
        </button>
      </div>
    </div>
  );
}
