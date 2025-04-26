import { useMemo } from "react";
import PropTypes from "prop-types";

const Footer = ({
  className = "",
  fIndMyAgent,
  privacyPolicyTextDecoration,
}) => {
  const privacyPolicyStyle = useMemo(() => {
    return { textDecoration: privacyPolicyTextDecoration };
  }, [privacyPolicyTextDecoration]);

  return (
    <footer
      className={`bg-gradient-to-r from-gray-50 to-gray-200 text-gray-800 py-6 px-4 backdrop-blur-lg shadow-md ${className}`}
    >
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
        {/* Logo & Address */}
        <div className="flex flex-col space-y-1">
          <img
            className="w-32 h-auto mb-2"
            alt="FindMyAgent"
            src={fIndMyAgent}
          />
          <p className="opacity-80">27th Street of New Town, Digital Villa</p>
          <p className="opacity-80">Phone: 010-020-0340 / 090-080-0760</p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col space-y-1">
          <h6 className="text-lg font-semibold text-gray-900">Quick Links</h6>
          {["Categories", "Reviews", "Listings", "Contact Us"].map((link) => (
            <a
              key={link}
              href="#"
              className="relative w-max transition-all duration-300 hover:underline hover:text-violet-700"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Company & Privacy */}
        <div className="flex flex-col space-y-1">
          <h6 className="text-lg font-semibold text-gray-900">Company</h6>
          {["About Us", "Awards", "Useful Sites"].map((link) => (
            <a
              key={link}
              href="#"
              className="relative w-max transition-all duration-300 hover:underline hover:text-violet-700"
            >
              {link}
            </a>
          ))}
          <a
            href="#"
            className="relative w-max transition-all duration-300 hover:underline hover:text-violet-700"
            style={privacyPolicyStyle}
          >
            Privacy Policy
          </a>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-300 mt-4 pt-2 text-center text-xs text-gray-600">
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
