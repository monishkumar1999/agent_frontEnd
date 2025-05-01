import React, { useState } from "react";

// ✅ 100 Australian cities
const cities = [
  "Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Gold Coast",
  "Canberra", "Newcastle", "Wollongong", "Geelong", "Hobart", "Townsville",
  "Cairns", "Darwin", "Toowoomba", "Ballarat", "Bendigo", "Launceston",
  "Mackay", "Rockhampton", "Bundaberg", "Coffs Harbour", "Wagga Wagga",
  "Hervey Bay", "Mildura", "Shepparton", "Gladstone", "Tamworth", "Traralgon",
  "Orange", "Bowral", "Dubbo", "Albany", "Geraldton", "Nowra", "Bathurst",
  "Warrnambool", "Kalgoorlie", "Devonport", "Mount Gambier", "Lismore",
  "Burnie", "Broken Hill", "Sunbury", "Frankston", "Campbelltown", "Goulburn",
  "Armidale", "Queanbeyan", "Bunbury", "Port Macquarie", "Albion Park",
  "Emerald", "Grafton", "Karratha", "Busselton", "Port Hedland", "Whyalla",
  "Alice Springs", "Horsham", "Wodonga", "Katherine", "Taree", "Morwell",
  "Mount Isa", "Albury", "Echuca", "Sale", "Forster", "Narrabri", "Inverell",
  "Kingaroy", "Parkes", "Griffith", "Lithgow", "Swan Hill", "Yeppoon",
  "Gympie", "Port Lincoln", "Colac", "Muswellbrook", "Bairnsdale", "Roma",
  "Dalby", "Warwick", "Cowra", "Scone", "Ulverstone", "Charters Towers",
  "Deniliquin", "Moe", "Stawell", "Ararat", "Victor Harbor", "Lorne",
  "Moranbah", "Kempsey", "Narrandera", "Yass", "Gatton"
];

const LocationStep = ({ details, updateDetails }) => {
  const [query, setQuery] = useState(details.location || "");
  const [filteredCities, setFilteredCities] = useState([]);

  const handleLocationChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    updateDetails({ location: value });

    const matches = cities.filter(city =>
      city.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCities(value ? matches : []);
  };

  const handleCitySelect = (city) => {
    setQuery(city);
    setFilteredCities([]);
    updateDetails({ location: city });
  };

 

  const [pincodeError, setPincodeError] = useState("");

// Australian postcodes are 4 digits
const handlePincodeChange = (event) => {
  const value = event.target.value;

  // Only allow digits
  if (!/^\d*$/.test(value)) return;

  updateDetails({ pincode: value });

  if (value.length === 6) {
    setPincodeError(""); // valid
  } else if (value.length > 0) {
    setPincodeError("Postcode must be 6 digits");
  } else {
    setPincodeError("");
  }
};


  return (
    <div className="mx-auto w-full max-w-xl text-center py-10">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
        Where do you need the Buyer's Agent?
      </h2>
      <p className="text-gray-600 text-base mb-6">
        The postcode or town for the address where you want the Buyer's Agent.
      </p>

      {/* Location Input */}
      <div className="relative mb-6 text-left">
        <input
          type="text"
          placeholder="Enter a location"
          value={query}
          onChange={handleLocationChange}
          className="w-full px-4 py-4 rounded-md border border-gray-300 bg-gray-50 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Dropdown */}
        {filteredCities.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-md max-h-48 overflow-y-auto shadow-lg">
            {filteredCities.map((city, index) => (
              <li
                key={index}
                onClick={() => handleCitySelect(city)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {city}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Pincode Input (optional) */}
      <div className="mb-2 text-left">
  {/* <input
    type="text"
    placeholder="Enter postcode"
    value={details.pincode || ""}
    onChange={handlePincodeChange}
    maxLength={6}
    className={`w-full px-4 py-4 rounded-md border ${
      pincodeError ? "border-red-500" : "border-gray-300"
    } bg-gray-50 placeholder-gray-500 focus:outline-none focus:ring-2 ${
      pincodeError ? "focus:ring-red-500" : "focus:ring-blue-500"
    }`}
  /> */}
  {pincodeError && (
    <p className="text-sm text-red-500 mt-1">{pincodeError}</p>
  )}
</div>

    </div>
  );
};

export default LocationStep;
