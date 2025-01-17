import React, { useState, useEffect } from "react";

const HeaderComponent = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 flex items-center justify-between py-4 px-16 bg-white transition-shadow duration-300 ${
        isScrolled ? "shadow-md" : ""
      }`}
    >
      <div className="flex items-center">
        <a href="/">
          <img
            src="/images/findmyagent.svg"
            alt="FindMyAgent Logo"
            className="w-[150px] h-[40px]"
          />
        </a>
      </div>
      {/* <nav className="flex space-x-8">
        <a
          href="/#"
          className="text-gray-800 hover:text-gray-600 font-instrument-sans transition-colors duration-200"
        >
          Listing
        </a>
        <a
          href="/#"
          className="text-gray-800 hover:text-gray-600 font-instrument-sans transition-colors duration-200"
        >
          Categories
        </a>
        <a
          href="/#"
          className="text-gray-800 hover:text-gray-600 font-instrument-sans transition-colors duration-200"
        >
          About
        </a>
        <a
          href="/#"
          className="text-gray-800 hover:text-gray-600 font-instrument-sans transition-colors duration-200"
        >
          Contact Us
        </a>
      </nav> */}
      <a
        href="/HowItWorks"
        className="bg-[#8046F1] text-white hover:bg-purple-700 rounded-full px-4 py-2 font-instrument-sans transition-colors duration-200"
      >
        Become An Agent
      </a>
    </header>
  );
};

export default HeaderComponent;
