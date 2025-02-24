import React, { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import Flag from "react-world-flags";

const FinalStep = ({ details, updateDetails }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const countries = [
    { code: "44", flag: "GB", name: "United Kingdom" },
    { code: "1", flag: "US", name: "United States" },
    { code: "61", flag: "AU", name: "Australia" },
    { code: "91", flag: "IN", name: "India" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const CheckOTP = localStorage.getItem("SendOTP");
      updateDetails({ isOTPVerified: CheckOTP === "true" });
    }, 2000);
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [updateDetails]);

  const handleCountrySelect = (country) => {
    updateDetails({ countryCode: country.code });
    setIsDropdownOpen(false);
  };

  const handleEmailChange = (event) => {
    updateDetails({ emailAddress: event.target.value });
  };

  const handlePhoneChange = (event) => {
    updateDetails({ phoneNumber: event.target.value });
  };

  return (
    <div className="mx-auto w-[60%]">
      <h2 className="text-2xl font-medium text-white text-left italic mb-6">
        Please share your email address and phone number.
      </h2>

      {/* Email Address Field */}
      <p className="text-xl text-white text-left mb-2">Email Address</p>
      <input
        type="text"
        placeholder="yourmail@gmail.com"
        value={details.emailAddress || ""}
        onChange={handleEmailChange}
        className="w-full px-4 py-3 mb-4 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-purple-800 focus:border-transparent"
      />

      {/* Phone Number Field */}
      <div>
        <p className="text-xl text-white text-left mb-2">Phone Number</p>
        <div className="flex relative border border-[#D0D5DD] rounded-lg">
          <div className="relative w-32 rounded-lg">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex bg-white items-center justify-between w-full px-3 py-2 h-[50px]"
            >
              <Flag
                code={details.countryCode ? details.countryCode : "GB"}
                alt={details.countryName ? details.countryName : "United Kingdom"}
                className="w-6 h-4 mr-2"
              />
              <span>{details.countryCode ? `+${details.countryCode}` : "+44"}</span>
              <BiChevronDown className="ml-1 text-black" />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 w-[200px] bg-white rounded-lg mt-1 shadow-lg z-10">
                {countries.map((country) => (
                  <button
                    key={country.code}
                    onClick={() => handleCountrySelect(country)}
                    className="flex items-center w-full px-3 py-2 hover:bg-gray-100"
                  >
                    <Flag
                      code={country.flag}
                      alt={country.name}
                      className="w-6 h-4 mr-2"
                    />
                    <span className="text-[14px]">
                      (+{country.code}) {country.name}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <input
            type="text"
            placeholder="1234567890"
            value={details.phoneNumber || ""}
            onChange={handlePhoneChange}
            className="flex-1 px-3 py-2 h-[50px] focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          />
        </div>
      </div>

      {/* OTP Field */}
      {details.isOTPVerified && (
        <div className="mt-2">
          <p className="text-xl text-white text-left mb-2">OTP</p>
          <input
            type="text"
            className="w-full px-4 py-3 mb-4 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-purple-800 focus:border-transparent"
            placeholder="Enter OTP"
          />
        </div>
      )}
    </div>
  );
};

export default FinalStep;
