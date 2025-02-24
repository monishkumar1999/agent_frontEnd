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
    <div className="mx-auto w-[90%] text-left">
      <div className="space-y-10 text-black">
        {/* Property Type */}
        <div>
          <h3 className="text-xl font-semibold mb-4">
            What type of property are you looking to buy?
          </h3>
          <div className="flex flex-wrap gap-3">
            {propertyTypes.map((name) => (
              <button
                key={name}
                onClick={() => updateDetails({ propertyType: name })}
                className={`flex items-center px-4 py-2 rounded-full border-2 text-base transition-all duration-300 ease-in-out transform hover:scale-105 delay-100
                  ${
                    details.propertyType === name
                      ? "bg-gradient-to-r from-purple-500 to-violet-700 text-white border-purple-600"
                      : "border-purple-600 text-purple-600 hover:bg-violet-100"
                  }
                `}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        {/* Bedrooms */}
        <div>
          <h3 className="text-xl font-semibold mb-4">
            How many bedrooms are you looking for?
          </h3>
          <div className="flex flex-wrap gap-3">
            {bedroomOptions.map((name) => (
              <button
                key={name}
                onClick={() => updateDetails({ bedroomCount: name })}
                className={`flex items-center px-4 py-2 rounded-full border-2 text-base transition-all duration-300 ease-in-out transform hover:scale-105 delay-100
                  ${
                    details.bedroomCount === name
                      ? "bg-gradient-to-r from-purple-500 to-violet-700 text-white border-purple-600"
                      : "border-purple-600 text-purple-600 hover:bg-violet-100"
                  }
                `}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h3 className="text-xl font-semibold mb-4">
            What's your ideal price range for the property?
          </h3>
          <div className="flex flex-wrap gap-3">
            {priceRanges.map((name) => (
              <button
                key={name}
                onClick={() => updateDetails({ weeklyOrSaleValue: name })}
                className={`flex items-center px-4 py-2 rounded-full border-2 text-base transition-all duration-300 ease-in-out transform hover:scale-105 delay-100
                  ${
                    details.weeklyOrSaleValue === name
                      ? "bg-gradient-to-r from-purple-500 to-violet-700 text-white border-purple-600"
                      : "border-purple-600 text-purple-600 hover:bg-violet-100"
                  }
                `}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
