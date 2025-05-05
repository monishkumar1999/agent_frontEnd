import React, { useState } from "react";
import { Home, MapPin, DollarSign, User, ChevronDown } from "lucide-react";

// List of 100 Australian cities
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

// Custom Dropdown Component
const CustomDropdown = ({ options, value, onChange, placeholder, icon: Icon, label }) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find((option) => option._id === value) || null;

  const handleSelect = (option) => {
    onChange(option._id);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 font-poppins mb-1">
        {label}
      </label>
      <div
        className="flex items-center bg-white rounded-lg px-3 py-2 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icon className="w-5 h-5 mr-2 text-gray-500" />
        <span className="text-gray-700 flex-1 truncate font-inter">
          {selectedOption ? selectedOption.name : placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>
      {isOpen && (
        <div className="absolute z-20 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto animate-fade-in">
          {options.length > 0 ? (
            options.map((option) => (
              <div
                key={option._id}
                className="px-4 py-2 text-gray-700 font-inter text-sm hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200 cursor-pointer"
                onClick={() => handleSelect(option)}
              >
                {option.name}
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-500 font-inter text-sm">
              No options available
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Custom Yes/No Dropdown Component
const YesNoDropdown = ({ value, onChange, placeholder, icon: Icon, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const options = [
    { _id: "Yes", name: "Yes" },
    { _id: "No", name: "No" },
  ];

  const selectedOption = options.find((option) => option._id === value) || null;

  const handleSelect = (option) => {
    onChange(option._id);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 font-poppins mb-1">
        {label}
      </label>
      <div
        className="flex items-center bg-white rounded-lg px-3 py-2 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icon className="w-5 h-5 mr-2 text-gray-500" />
        <span className="text-gray-700 flex-1 truncate font-inter">
          {selectedOption ? selectedOption.name : placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>
      {isOpen && (
        <div className="absolute z-20 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto animate-fade-in">
          {options.map((option) => (
            <div
              key={option._id}
              className="px-4 py-2 text-gray-700 font-inter text-sm hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200 cursor-pointer"
              onClick={() => handleSelect(option)}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Custom Price Range Dropdown Component
const PriceRangeDropdown = ({ options, value, onChange, placeholder, icon: Icon, label }) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find((option) => option === value) || null;

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 font-poppins mb-1">
        {label}
      </label>
      <div
        className="flex items-center bg-white rounded-lg px-3 py-2 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icon className="w-5 h-5 mr-2 text-gray-500" />
        <span className="text-gray-700 flex-1 truncate font-inter">
          {selectedOption || placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>
      {isOpen && (
        <div className="absolute z-20 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto animate-fade-in">
          {options.length > 0 ? (
            options.map((option) => (
              <div
                key={option}
                className="px-4 py-2 text-gray-700 font-inter text-sm hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200 cursor-pointer"
                onClick={() => handleSelect(option)}
              >
                {option}
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-500 font-inter text-sm">
              No options available
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Custom Location Autocomplete Component
const LocationAutocomplete = ({ value, onChange, placeholder, icon: Icon, label }) => {
  const [query, setQuery] = useState(value || "");
  const [filteredCities, setFilteredCities] = useState([]);

  const handleLocationChange = (event) => {
    const newValue = event.target.value;
    setQuery(newValue);
    onChange(newValue);

    const matches = cities.filter((city) =>
      city.toLowerCase().includes(newValue.toLowerCase())
    );
    setFilteredCities(newValue ? matches : []);
  };

  const handleCitySelect = (city) => {
    setQuery(city);
    setFilteredCities([]);
    onChange(city);
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 font-poppins mb-1">
        {label}
      </label>
      <div className="flex items-center bg-white rounded-lg px-3 py-2 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
        <Icon className="w-5 h-5 mr-2 text-gray-500" />
        <input
          type="text"
          className="bg-transparent outline-none text-gray-700 flex-1 font-inter"
          value={query}
          onChange={handleLocationChange}
          placeholder={placeholder}
        />
      </div>
      {filteredCities.length > 0 && (
        <div className="absolute z-20 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto animate-fade-in">
          {filteredCities.map((city, index) => (
            <div
              key={index}
              className="px-4 py-2 text-gray-700 font-inter text-sm hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200 cursor-pointer"
              onClick={() => handleCitySelect(city)}
            >
              {city}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const AgentFilterSidebar = ({
  agentDetails,
  setAgentDetails,
  propertyTypes,
  propertyTypeError,
  purchaseOptions,
  priceRanges,
  optionsError,
  handleApplyFilters,
  filterLoading,
}) => {
  return (
    <div className="w-full bg-gradient-to-r from-gray-50 to-gray-100 border rounded-xl p-6 shadow-lg mb-8">
      {optionsError && (
        <p className="text-red-500 text-sm mb-4 font-inter">{optionsError}</p>
      )}
      <div className="flex flex-wrap gap-4 items-end justify-center">
        {/* Property Type */}
        <div className="flex-1 min-w-[200px]">
          {propertyTypeError ? (
            <p className="text-red-500 text-sm font-inter">Error</p>
          ) : (
            <CustomDropdown
              options={propertyTypes}
              value={agentDetails?.propertyType || ""}
              onChange={(value) =>
                setAgentDetails({ ...agentDetails, propertyType: value })
              }
              placeholder="Select Type"
              icon={Home}
              label="Property Type"
            />
          )}
        </div>

        {/* Price Range */}
        <div className="flex-1 min-w-[200px]">
          <PriceRangeDropdown
            options={priceRanges}
            value={agentDetails?.weeklyOrSaleValue || ""}
            onChange={(value) =>
              setAgentDetails({ ...agentDetails, weeklyOrSaleValue: value })
            }
            placeholder="Select Range"
            icon={DollarSign}
            label="Price Range"
          />
        </div>

        {/* Location with Autocomplete */}
        <div className="flex-1 min-w-[200px]">
          <LocationAutocomplete
            value={agentDetails?.location || ""}
            onChange={(value) =>
              setAgentDetails({ ...agentDetails, location: value })
            }
            placeholder="Enter Location"
            icon={MapPin}
            label="Location"
          />
        </div>

        {/* First-Time Buyer */}
        <div className="flex-1 min-w-[200px]">
          <YesNoDropdown
            value={agentDetails?.isLegalReady || ""}
            onChange={(value) =>
              setAgentDetails({ ...agentDetails, isLegalReady: value })
            }
            placeholder="Select Option"
            icon={User}
            label="First-Time Buyer"
          />
        </div>

        <button
  className={`relative px-6 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-purple-700 shadow-lg transition-all duration-300 ease-in-out 
              hover:from-purple-600 hover:to-purple-800 hover:shadow-purple-500/50 hover:scale-105 disabled:opacity-50`}
  onClick={handleApplyFilters}
  disabled={filterLoading}
>
  <span className="flex items-center gap-2">
    {filterLoading ? (
      <>
        <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
        Applying...
      </>
    ) : (
      "Apply Filters"
    )}
  </span>
</button>

      </div>
    </div>
  );
};

export default AgentFilterSidebar;