"use client";

import { ChevronDown } from "lucide-react";

export function StepThree({ onSubmit }) {
  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Full range of services you provide
        </label>
        <div className="relative">
          <select className="w-full p-3 border border-[#B4BAC8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F56D9] focus:border-transparent appearance-none">
            <option>Property Search</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          What method of sales do you cover?
        </label>
        <div className="relative">
          <select className="w-full p-3 border border-[#B4BAC8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F56D9] focus:border-transparent appearance-none">
            <option>Private sales</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          What's the duration of your buyer's agency agreement?
        </label>
        <div className="relative">
          <select className="w-full p-3 border border-[#B4BAC8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F56D9] focus:border-transparent appearance-none">
            <option>1 Month</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your sales team count
        </label>
        <input
          type="number"
          className="w-full p-3 border border-[#B4BAC8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F56D9] focus:border-transparent"
          placeholder="0"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Which postcodes do you cover
        </label>
        <div className="flex gap-2">
          {["1001", "1002", "1003", "1004"].map((code) => (
            <input
              key={code}
              type="text"
              className="w-24 p-3 border border-[#B4BAC8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F56D9] focus:border-transparent"
              placeholder={code}
            />
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Areas of specialization
        </label>
        <div className="relative">
          <select className="w-full p-3 border border-[#B4BAC8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F56D9] focus:border-transparent appearance-none">
            <option>Residential</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Types of clients you typically work with
        </label>
        <div className="relative">
          <select className="w-full p-3 border border-[#B4BAC8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F56D9] focus:border-transparent appearance-none">
            <option>Full-time buyers</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Do you offer video calls for homebuyers?
        </label>
        <div className="relative">
          <select className="w-full p-3 border border-[#B4BAC8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F56D9] focus:border-transparent appearance-none">
            <option>Yes</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          What technology do you use for video calls?
        </label>
        <div className="relative">
          <select className="w-full p-3 border border-[#B4BAC8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F56D9] focus:border-transparent appearance-none">
            <option>Zoom</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Which digital solutions do you offer?
        </label>
        <div className="relative">
          <select className="w-full p-3 border border-[#B4BAC8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F56D9] focus:border-transparent appearance-none">
            <option>3D tours</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          How do you structure your fees?
        </label>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              For Properties between
            </span>
            <div className="relative flex-1">
              <select className="w-full p-3 border border-[#B4BAC8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F56D9] focus:border-transparent appearance-none">
                <option>$50,000</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
            <div className="relative flex-1">
              <select className="w-full p-3 border border-[#B4BAC8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F56D9] focus:border-transparent appearance-none">
                <option>$200,000</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">I charge a</span>
            <div className="relative flex-1">
              <select className="w-full p-3 border border-[#B4BAC8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F56D9] focus:border-transparent appearance-none">
                <option>Percentage</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
            <input
              type="text"
              className="flex-1 p-3 border border-[#B4BAC8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F56D9] focus:border-transparent"
              placeholder="5.000"
            />
            <span className="text-sm text-gray-600">%</span>
          </div>
        </div>
      </div>

      <div className="pt-6">
        <button
          onClick={onSubmit}
          className="w-full bg-[#7F56D9] text-white py-3 px-4 rounded-full hover:bg-[#6941C6] transition-colors font-semibold"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
