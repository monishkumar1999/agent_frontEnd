import { useMemo } from "react";
import PropTypes from "prop-types";

const Footer = ({
  className = "",
  fIndMyAgent,
  privacyPolicyTextDecoration,
}) => {
  const privacyPolicyStyle = useMemo(() => {
    return {
      textDecoration: privacyPolicyTextDecoration,
    };
  }, [privacyPolicyTextDecoration]);

  return (
    <footer className={`bg-gray-200 text-gray-700 p-6 ${className}`}>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* Logo & Address */}
        <div className="flex flex-col items-start text-sm">
          <img
            className="w-32 h-auto mb-2"
            alt="FindMyAgent"
            src={fIndMyAgent}
          />
          <p>27th Street of New Town, Digital Villa</p>
          <p>Phone: 010-020-0340 / 090-080-0760</p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col text-sm">
          <h6 className="text-base font-semibold text-gray-800 mb-2">
            Quick Links
          </h6>
          <a href="#" className="hover:underline">
            Categories
          </a>
          <a href="#" className="hover:underline">
            Reviews
          </a>
          <a href="#" className="hover:underline">
            Listings
          </a>
          <a href="#" className="hover:underline">
            Contact Us
          </a>
        </div>

        {/* Company & Privacy */}
        <div className="flex flex-col text-sm">
          <h6 className="text-base font-semibold text-gray-800 mb-2">
            Company
          </h6>
          <a href="#" className="hover:underline">
            About Us
          </a>
          <a href="#" className="hover:underline">
            Awards
          </a>
          <a href="#" className="hover:underline">
            Useful Sites
          </a>
          <a href="#" className="hover:underline" style={privacyPolicyStyle}>
            Privacy Policy
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-400 mt-4 pt-2 text-center text-xs">
        <p>© 2024 FindMyAgent, Ltd. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  className: PropTypes.string,
  fIndMyAgent: PropTypes.string,
  privacyPolicyTextDecoration: PropTypes.string,
};

export default Footer;
