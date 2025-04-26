import React from "react";

const LocationStep = ({ details, updateDetails }) => {
  // Handlers to update location and pincode in global state
  const handleLocationChange = (event) => {
    updateDetails({ location: event.target.value });
  };

  const handlePincodeChange = (event) => {
    updateDetails({ pincode: event.target.value });
  };

  return (
    <div className="mx-auto w-[90%] text-left">
      <div className="space-y-6">
        {/* Location Input */}
        <div>
          <h3 className="text-xl font-semibold mb-2 text-black">
            Where's your ideal location?
          </h3>
          <input
            type="text"
            placeholder="Enter Location"
            value={details.location || ""}
            onChange={handleLocationChange}
            className="w-full px-4 py-3 border-2 rounded-lg transition-all duration-300 ease-in-out 
              border-transparent bg-white shadow-md 
              focus:outline-none focus:ring-2 focus:ring-violet-500 
              hover:border-[2px] hover:border-transparent hover:bg-gradient-to-r hover:from-purple-600 hover:to-violet-800 hover:text-white"
          />
        </div>

        {/* Pincode Input */}
        <div>
          <h3 className="text-xl font-semibold mb-2 text-black">
            Enter Pincode
          </h3>
          <input
            type="text"
            placeholder="Enter Pincode"
            value={details.pincode || ""}
            onChange={handlePincodeChange}
            className="w-full px-4 py-3 border-2 rounded-lg transition-all duration-300 ease-in-out 
              border-transparent bg-white shadow-md
              focus:outline-none focus:ring-2 focus:ring-violet-500 
              hover:border-[2px] hover:border-transparent hover:bg-gradient-to-r hover:from-purple-600 hover:to-violet-800 hover:text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default LocationStep;
