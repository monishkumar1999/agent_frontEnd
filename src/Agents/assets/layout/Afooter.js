import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Afooter = () => {
  return (
    <footer className="bg-blue-100 text-gray-800 py-4 text-xs">
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-center md:text-left">
        {/* Logo and About */}
        <div>
          <h2 className="text-lg font-bold">BuyersFirst
          </h2>
          <p className="mt-1 text-gray-600">
            Connecting buyers with trusted agents in the AUS markets.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-sm font-semibold mb-2">Quick Links</h3>
          <ul className="text-gray-600 space-y-1">
            <li>
              <a href="/about" className="hover:text-gray-900">About Us</a>
            </li>
            <li>
              <a href="/agents" className="hover:text-gray-900">Find an Agent</a>
            </li>
            <li>
              <a href="/contact" className="hover:text-gray-900">Contact</a>
            </li>
            <li>
              <a href="/faq" className="hover:text-gray-900">FAQs</a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-sm font-semibold mb-2">Contact Us</h3>
          <p className="text-gray-600">support@findmyagent.com</p>
          <p className="text-gray-600">+44 1234 567890</p>
          <p className="text-gray-600">London, UK & Sydney, AUS</p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-sm font-semibold mb-2">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-3">
            <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
              <FaFacebook />
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
              <FaTwitter />
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
              <FaLinkedin />
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-300 mt-4 pt-2 text-center text-gray-600 text-xs">
        &copy; {new Date().getFullYear()} FindMyAgent. All rights reserved.
      </div>
    </footer>
  );
};

export default Afooter;
