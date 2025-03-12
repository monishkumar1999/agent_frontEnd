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
      <div className="max-w-7xl w-full flex flex-col lg:flex-row items-center justify-between relative">
        
        {/* Left Section */}
        <div className="lg:w-1/2 text-center lg:text-left ">
          <h1 className="text-4xl lg:text-4xl  font-bold leading-tight text-gray-900 absolute top-2">
          Buyer Agents Work for YOU, <br />
          Not the Seller,<br />
           
          </h1>
          <p className="mt-4 text-lg text-gray-600">
          Your Interests Come First!<br />
          Your one-stop platform for finding the right agent,
          tailored to your needs.
          </p>
            <div className="mt-6 flex justify-center lg:justify-start space-x-4">
            <button className= "bg-blueviolet text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-lg 800 transition">
             FindMY Agent
            </button>
            </div>
            <div className="mt-6 flex justify-center lg:justify-start space-x-6 text-gray-600">
            <span className="flex items-center bg-[#E26274]  p-3 rounded-md text-white"><CheckCircle size={20} className="mr-2 text-gray-700" /> Experienced Agents</span>
            <span className="flex items-center  bg-[#E26274] p-1 rounded-md text-white"><CheckCircle size={20} className="mr-2 text-gray-700" /> Trustfull Propertiy</span>
            <span className="flex items-center  bg-[#E26274] p-1 rounded-md text-white"><CheckCircle size={20} className="mr-2 text-gray-700" /> Secure Payment</span>
          </div>
        </div>
         {/* Right Section */}
         <div className="lg:w-1/2 flex justify-center relative mt-12 lg:mt-0">
          <motion.img 
            src="/images/a3.png" 
            alt="Agent" 
            className="w-[85%] max-w-lg rounded-lg "
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          />
          {/* Floating Elements */}
          <motion.div 
            className="absolute top-6 left-6 bg-white p-2  rounded-lg"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <img src="/images/home3.jpg" alt="h1" className="w-10 h-10"/>
          </motion.div>

          <motion.div 
            className="absolute bottom-6 right-6 bg-white p-2  rounded-lg"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <img src="/images/home4.jpg" alt="h2" className="w-10 h-10"/>
          </motion.div>
          {/* New Agents Widget */}
          <motion.div 
            className="absolute top-0 right-10 bg-green-500 text-white p-4 rounded-lg flex items-center shadow-lg"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="flex -space-x-2">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" className="w-8 h-8 rounded-full border-2 border-white" />
              <img src="https://randomuser.me/api/portraits/women/45.jpg" className="w-8 h-8 rounded-full border-2 border-white" />
              <img src="https://randomuser.me/api/portraits/men/65.jpg" className="w-8 h-8 rounded-full border-2 border-white" />
            </div>
            <span className="ml-3 text-sm">Our daily new Agents <br /> <span className="text-lg font-bold">2+</span></span>
          </motion.div>
          </div>
      </div>
    </div>
  );
};

export default HeroBanner;
