import { motion } from "framer-motion";
import { FaSearchLocation, FaHandshake, FaChartLine } from "react-icons/fa";

const HeroBanner = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="bg-gray-100 px-4 pt-16 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between">
          {/* Left */}
          <div className="">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 font-mainfont ">
              Buyer Agents Work for You 
            </h1>

            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 font-mainfont leading-relaxed mt-3">
            Not the Seller
            </h1>
            <p className="mt-6 text-lg text-gray-600 font-medium font-mainfont">
            Australia’s #1 platform connecting home buyers with trusted, independent agents
            </p>
            {/* <div className="mt-6">
              <button className="bg-gradient-to-r from-blue-500 to-pink-500 text-white font-semibold py-2 px-6 rounded-xl shadow hover:opacity-80 transition">
                FindMY Agent
              </button>
            </div> */}
          </div>

          {/* Right */}
          <div className="mt-10 lg:mt-0 flex justify-center lg:justify-end lg:w-1/2">
            <motion.img
              src="/images/hero.png"
              alt="Agent"
              className="w-full max-w-md"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
            />
          </div>
        </div>
      </div>

      {/* Feature Cards Section */}
      <div className="relative z-10 -mt-20 mb-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center">
          <div className="bg-white rounded-xl shadow p-6">
            <FaSearchLocation className="mx-auto text-4xl text-pink-500 mb-4" />
            <h3 className="text-lg font-bold mb-2  font-mainfont">Tailored Agent Search</h3>
            <p className="text-gray-600 text-sm font-mainfont">Find expert buyer’s agents specialized in your needs and location.</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <FaHandshake className="mx-auto text-4xl text-blue-500 mb-4" />
            <h3 className="text-lg font-bold mb-2 font-mainfont">Negotiation & Closing Support</h3>
            <p className="text-gray-600 text-sm font-mainfont">Get expert guidance to secure the best deal and smooth closing.</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <FaChartLine className="mx-auto text-4xl text-green-500 mb-4" />
            <h3 className="text-lg font-bold mb-2 font-mainfont">Market Insights & Advice</h3>
            <p className="text-gray-600 text-sm font-mainfont">Receive up-to-date market trends and advice from agents to make informed decisions.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroBanner;
