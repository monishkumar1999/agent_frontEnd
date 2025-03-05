import { motion } from "framer-motion";
import { PlayCircle, CheckCircle } from "lucide-react";
const HeroBanner = ({ scrollToAgents }) => {
  return (
    // <div className="relative bg-cover bg-center h-screen md:h-[88vh] rounded-3xl overflow-hidden">
      
    //   {/* Background Image */}
    //   <img
    //     className="absolute inset-0 w-full h-full object-cover"
    //     src="/images/banner2.jpg"
    //     alt="Hero Banner Background"
    //   />
    //   {/* Overlay for dull effect */}
    //   <div className="absolute inset-0 bg-black bg-opacity-50"></div>
    //   {/* Content */}
    //   <div className="relative z-10 flex flex-col justify-center h-full text-white px-6 sm:px-10 lg:px-20 text-center md:text-left max-w-screen-lg mx-auto">
    //     {/* Heading */}
    //     <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
    //       Buyer Agents Work for YOU,
    //       <br className="hidden md:block" /> Not the Seller
    //       <br className="hidden md:block" /> Your Interests Come First!
    //     </h1>
    //     {/* Description */}
    //     <p className="mb-8 md:mb-10 text-base sm:text-lg md:text-xl leading-relaxed">
    //       Your one-stop platform for finding the right agent,
    //       <br className="hidden md:block" /> tailored to your needs.
    //     </p>
    //     {/* Button */}
    //     <div className="flex justify-center md:justify-start">
    //       <button
    //         onClick={scrollToAgents}
    //         className="w-[80%] sm:w-[50%] md:w-auto bg-purple-600 text-white py-3 px-8 rounded-full text-lg font-medium shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-transform transform hover:scale-105"
    //       >
    //         Find Agents
    //       </button>
    //     </div>
    //   </div>
    // </div>
    <div className="min-h-screen flex items-center justify-center bg-white px-6 lg:px-20">
      <div className="max-w-7xl w-full flex flex-col lg:flex-row items-center justify-between">
        
        {/* Left Section */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight text-gray-900">
          Buyer Agents Work for YOU, <br />
          Not the Seller,<br />
           
          </h1>
          <p className="mt-4 text-lg text-gray-600">
          Your Interests Come First!<br />
          Your one-stop platform for finding the right agent,
          tailored to your needs.
          </p>
            <div className="mt-6 flex justify-center lg:justify-start space-x-4">
            <button className= "bg-blueviolet text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-lg  bg-blueviolet 800 transition">
             FindMY Agent
            </button>
            <span className="text-4xl lg:text-6xl font-bold leading-tight text-gray-900">
                <motion.span 
                className="absolute -bottom-1 left-0 w-full h-3  bg-blueviolet"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1 }}
              />
            </span>
            </div>
            <div className="mt-6 flex justify-center lg:justify-start space-x-6 text-gray-600">
            <span className="flex items-center"><CheckCircle size={20} className="mr-2 text-gray-700" /> Learn with experts</span>
            <span className="flex items-center"><CheckCircle size={20} className="mr-2 text-gray-700" /> Get certificate</span>
            <span className="flex items-center"><CheckCircle size={20} className="mr-2 text-gray-700" /> Get membership</span>
          </div>
        </div>
         {/* Right Section */}
         <div className="lg:w-1/2 flex justify-center relative mt-12 lg:mt-0">
          <motion.img 
            src="public/images/sale.png" 
            alt="Agent" 
            className="w-[85%] max-w-lg rounded-lg shadow-lg"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          />
          </div>
      </div>
    </div>
  );
};

export default HeroBanner;
