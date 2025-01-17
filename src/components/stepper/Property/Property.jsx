import { Check } from "lucide-react";
import React from "react";

export default function PropertyStep({ details, updateDetails }) {
  const propertyTypes = [
    "House",
    "Unit",
    "Land",
    "Apartment",
    "Townhouse",
    "Villa",
  ];

  const bedroomOptions = ["1", "2", "3", "4+"];
  const priceRanges = [
    "Less than $200k",
    "$200k to $400k",
    "$400k to $600k",
    "$600k to $800k",
    "$800k to $1m",
    "$1m to $1.5m",
    "$1.5m to $2m",
    "$2m+",
  ];

  return (
    <div className="mx-auto w-[80%] text-left">
      <div className="space-y-12 text-white">
        {/* Property Type */}
        <div>
          <h3 className="text-2xl font-medium italic mb-6">
            What type of property are you looking to buy?
          </h3>
          <div className="flex flex-wrap gap-3">
            {propertyTypes.map((type) => (
              <button
                key={type}
                onClick={() => updateDetails({ propertyType: type })}
                className={`
                  flex items-center gap-2 px-6 py-3 rounded-full text-base transition-all
                  ${
                    details.propertyType === type
                      ? "bg-white text-[#8046F1]"
                      : "border border-white/40 hover:border-white"
                  }
                `}
              >
                {details.propertyType === type && (
                  <div
                    className="relative inline-flex items-center justify-center w-6 h-6 rounded-full"
                    style={{ backgroundColor: "#5600FF" }}
                  >
                    <Check className="w-4 h-4" color="white" strokeWidth={3} />
                  </div>
                )}
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Bedrooms */}
        <div>
          <h3 className="text-2xl font-medium italic mb-6">
            How many bedrooms are you looking for?
          </h3>
          <div className="flex flex-wrap gap-3">
            {bedroomOptions.map((option) => (
              <button
                key={option}
                onClick={() => updateDetails({ bedroomCount: option })}
                className={`
                  flex items-center gap-2 px-6 py-3 rounded-full text-base transition-all
                  ${
                    details.bedroomCount === option
                      ? "bg-white text-[#8046F1]"
                      : "border border-white/40 hover:border-white"
                  }
                `}
              >
                {details.bedroomCount === option && (
                  <div
                    className="relative inline-flex items-center justify-center w-6 h-6 rounded-full"
                    style={{ backgroundColor: "#5600FF" }}
                  >
                    <Check className="w-4 h-4" color="white" strokeWidth={3} />
                  </div>
                )}
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h3 className="text-2xl font-medium italic mb-6">
            What's your ideal price range for the property?
          </h3>
          <div className="flex flex-wrap gap-3">
            {priceRanges.map((range) => (
              <button
                key={range}
                onClick={() => updateDetails({ weeklyOrSaleValue: range })}
                className={`
                  flex items-center gap-2 px-6 py-3 rounded-full text-base transition-all
                  ${
                    details.weeklyOrSaleValue === range
                      ? "bg-white text-[#8046F1]"
                      : "border border-white/40 hover:border-white"
                  }
                `}
              >
                {details.weeklyOrSaleValue === range && (
                  <div
                    className="relative inline-flex items-center justify-center w-6 h-6 rounded-full"
                    style={{ backgroundColor: "#5600FF" }}
                  >
                    <Check className="w-4 h-4" color="white" strokeWidth={3} />
                  </div>
                )}
                {range}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
