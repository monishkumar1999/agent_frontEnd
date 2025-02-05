import React from "react";

const LocationStep = ({ details, updateDetails }) => {
  // Handler to update location in global state
  const handleInputChange = (event) => {
    updateDetails({ location: event.target.value });
  };

  return (
    <div className="mx-auto w-[80%]">
      <h2 className="text-2xl font-medium text-white text-left italic mb-6">
        Where's your ideal location?
      </h2>
      <input
        type="text"
        placeholder="Enter Location"
        value={details.location} // Use global state value
        onChange={handleInputChange} // Update global state
        className="w-full px-4 py-3 mb-[200px] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-purple-800 focus:border-transparent"
      />
    </div>
  );
};

export default LocationStep;
