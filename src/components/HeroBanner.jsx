const HeroBanner = ({ scrollToAgents }) => {
  return (
    <div className="relative bg-cover bg-center h-screen md:h-[88vh] rounded-3xl overflow-hidden">
      {/* Background Image */}
      <img
        className="absolute inset-0 w-full h-full object-cover"
        src="/images/banner2.jpg"
        alt="Hero Banner Background"
      />
      {/* Overlay for dull effect */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center h-full text-white px-6 sm:px-10 lg:px-20 text-center md:text-left max-w-screen-lg mx-auto">
        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Buyer Agents Work for YOU,
          <br className="hidden md:block" /> Not the Seller
          <br className="hidden md:block" /> Your Interests Come First!
        </h1>
        {/* Description */}
        <p className="mb-8 md:mb-10 text-base sm:text-lg md:text-xl leading-relaxed">
          Your one-stop platform for finding the right agent,
          <br className="hidden md:block" /> tailored to your needs.
        </p>
        {/* Button */}
        <div className="flex justify-center md:justify-start">
          <button
            onClick={scrollToAgents}
            className="w-[80%] sm:w-[50%] md:w-auto bg-purple-600 text-white py-3 px-8 rounded-full text-lg font-medium shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-transform transform hover:scale-105"
          >
            Find Agents
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
