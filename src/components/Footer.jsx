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
    <footer
      className={`relative bg-lavender-100 text-black font-instrument-sans ${className}`}
    >
      {/* Background image */}
      

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        {/* Logo */}
        <div className="flex flex-col items-start space-y-2">
        <h1 className="font-bold text-purple-600 text-2xl font-noto">Buyers First</h1>
          <p className="text-xs text-gray-600">Helping you connect smarter.</p>
        </div>

        {/* Section 1 */}
        <div>
          <h4 className="text-sm font-semibold mb-3 font-mainfont">Explore</h4>
          <ul className="space-y-2">
            <li>Categories</li>
            <li>Reviews</li>
            <li>Listings</li>
            <li>Contact Us</li>
          </ul>
        </div>

        {/* Section 2 */}
        <div>
          <h4 className="text-sm font-semibold mb-3 font-mainfont">Company</h4>
          <ul className="space-y-2">
            <li>About Us</li>
            <li>Awards</li>
            <li>Useful Sites</li>
            <li>
              <a
                href="#"
                className="text-black hover:underline"
                style={privacyPolicyStyle}
              >
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Details */}
        <div>
          <h4 className="text-sm font-semibold mb-3">Contact</h4>
          <ul className="space-y-2">
            <li>27th Street of New Town, Digital Villa</li>
            <li>010-020-0340</li>
            <li>090-080-0760</li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="relative z-10 text-center text-xs py-4 border-t border-gray-300 bg-white/70 backdrop-blur">
        <p>
          © 2024 BuyersFirst, Ltd. All Rights Reserved.
        </p>
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
