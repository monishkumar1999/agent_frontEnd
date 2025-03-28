import { Check } from "lucide-react";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../../../../utils/axiosInstance";

export default function PropertyStep({ details, updateDetails }) {
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

  const [propertyTypes, setPropertyTypes] = useState([]);
  const [error, setError] = useState(null);

  // Fetch property types dynamically from the backend
  useEffect(() => {
    const fetchPropertyTypes = async () => {
      try {
        const response = await axiosInstance.get("/property/view");
        if (Array.isArray(response.data.data)) {
          setPropertyTypes(response.data.data);
        } else {
          throw new Error("Invalid data format");
        }
      } catch (error) {
        console.error("Error fetching property types:", error);
        setError("Failed to load property types");
      }
    };

    fetchPropertyTypes();
  }, []);

  const getButtonClasses = (isSelected) => `
    flex items-center px-4 py-2 rounded-full border-2 text-base transition-all duration-300 ease-in-out transform hover:scale-105 delay-100
    ${
      isSelected
        ? "bg-gradient-to-r from-purple-500 to-violet-700 text-white border-purple-600"
        : "border-purple-600 text-purple-600 hover:bg-violet-100"
    }
  `;

  return (
    <div className="mx-auto w-[90%] text-left">
      <div className="space-y-10 text-black">
        {/* Property Type - Dynamic */}
        <div>
          <h3 className="text-xl font-semibold mb-4">
            What type of property are you looking to buy?
          </h3>
          <div className="flex flex-wrap gap-3">
            {error ? (
              <p className="text-red-500">{error}</p>
            ) : propertyTypes.length > 0 ? (
              propertyTypes.map((type) => (
                <button
                  key={type.name}
                  onClick={() => updateDetails({ propertyType: type._id })}
                  className={getButtonClasses(
                    details.propertyType === type._id
                  )}
                >
                  {type.name}
                </button>
              ))
            ) : (
              <p>Loading property types...</p>
            )}
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
                className={getButtonClasses(details.bedroomCount === name)}
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
                className={getButtonClasses(details.weeklyOrSaleValue === name)}
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
