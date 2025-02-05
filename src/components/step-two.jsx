"use client";

import { ChevronDown } from "lucide-react";

export function StepTwo({ agencyForm, onAgencyFormChange, onNext }) {
  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-4">
        About your agency
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Great! Now we just need a few details about your agency
      </p>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Agency Name
          </label>
          <input
            type="text"
            name="agencyName"
            value={agencyForm.agencyName}
            onChange={onAgencyFormChange}
            className="w-full p-3 border border-[#B4BAC8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F56D9] focus:border-transparent"
            placeholder="alexsmith@gmail.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Branch
          </label>
          <input
            type="text"
            name="branch"
            value={agencyForm.branch}
            onChange={onAgencyFormChange}
            className="w-full p-3 border border-[#B4BAC8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F56D9] focus:border-transparent"
            placeholder="Branch name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location Address
          </label>
          <input
            type="text"
            name="location"
            value={agencyForm.location}
            onChange={onAgencyFormChange}
            className="w-full p-3 border border-[#B4BAC8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F56D9] focus:border-transparent"
            placeholder="New York"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Which best describes your agency?
          </label>
          <div className="relative">
            <select
              name="agencyType"
              value={agencyForm.agencyType}
              onChange={(e) => onAgencyFormChange(e)}
              className="w-full p-3 border border-[#B4BAC8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F56D9] focus:border-transparent appearance-none"
            >
              <option value="Franchise">Franchise</option>
              <option value="Independent">Independent</option>
              <option value="Network">Network</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>
      </div>

      <div className="mt-12">
        <button
          onClick={onNext}
          className="w-full bg-[#7F56D9] text-white py-3 px-4 rounded-full hover:bg-[#6941C6] transition-colors font-semibold"
        >
          Next
        </button>
      </div>
    </div>
  );
}
