import { Check } from "lucide-react";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../../../../utils/axiosInstance";

export default function PropertyStep({ details, updateDetails }) {
  const bedroomOptions = ["1", "2", "3", "4+"];
  const priceRanges = [
    "Less than $449,000",
    "$450,000–$699,999",
    "$700,000–$999,999",
    "$1m–$1.49m",
    "$1.5m–$2.49m",
    "$2.5m or more",
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
    flex items-center px-4 py-2 rounded-lg border-2 text-base font-medium transition-colors
    ${
      isSelected
        ? "bg-slate-600 text-white border-slate-600"
        : "border-slate-400 text-slate-600 hover:bg-slate-100"
    }
  `;

  return (
    <div className="mx-auto w-full max-w-2xl text-left">
      <div className="space-y-8 text-gray-900">
        {/* Property Type - Dynamic */}
        <div>
          <h3 className="text-lg font-semibold mb-3">
            What type of property are you looking to buy?
          </h3>
          <div className="flex flex-wrap gap-2">
            {error ? (
              <p className="text-red-500 text-sm">{error}</p>
            ) : propertyTypes.length > 0 ? (
              propertyTypes.map((type) => (
                <button
                  key={type.name}
                  onClick={() => updateDetails({ propertyType: type._id })}
                  className={getButtonClasses(details.propertyType === type._id)}
                >
                  {type.name}
                </button>
              ))
            ) : (
              <p className="text-sm text-gray-500">Loading property types...</p>
            )}
          </div>
        </div>

        {/* Bedrooms */}
        <div>
          <h3 className="text-lg font-semibold mb-3">
            How many bedrooms are you looking for?
          </h3>
          <div className="flex flex-wrap gap-2">
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
          <h3 className="text-lg font-semibold mb-3">
            What's your ideal price range for the property?
          </h3>
          <div className="flex flex-wrap gap-2">
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