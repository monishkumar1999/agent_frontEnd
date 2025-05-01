import PropTypes from "prop-types";

const BenefitCard = ({ icon, title, description }) => (
  <div className="w-72 bg-white bg-opacity-90 rounded-3xl shadow-xl p-4 flex flex-col items-center text-center transform hover:scale-105 hover:shadow-2xl transition-all duration-500 backdrop-blur-md border border-gray-100 hover:border-blue-500 hover:bg-gradient-to-br from-white to-blue-50">
    <img
      className="object-contain"
      loading="lazy"
      alt={title}
      src={icon}
    />
    <h2 className="text-2xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
      {title}
    </h2>
    <p className="text-gray-700 text-base leading-relaxed font-sans ">{description}</p>
  </div>
);

BenefitCard.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

const AgentBenefits = ({ className = "" }) => {
  const benefits = [
    {
      icon: "/images/ag1.png",
      title: "Tailored Agent Search",
      description: "Find expert buyer’s agents specialized in your needs and location.",
    },
    {
      icon: "/images/ag2.jpg",
      title: "Negotiation & Closing Support",
      description: "Get expert guidance to secure the best deal and a smooth closing.",
    },
    {
      icon: "/images/ag3.png",
      title: "Market Insights & Advice",
      description: "Receive up-to-date market trends and advice from agents to make informed decisions.",
    },
  ];

  return (
    <section
      className={`relative py-16 overflow-hidden bg-gradient-to-b from-gray-50 to-white ${className} px-6`}
    >
      {/* Background Effects */}
    
    
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-2xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-2  py-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-fade-in ">
            Your Perfect Agent is Just a Click Away
          </h1>
          <p className="text-gray-700 text-xl max-w-3xl mx-auto animate-fade-in delay-200 font-semibold font-sans">
            Your one-stop platform for finding the right agent, tailored to your needs.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 justify-centerpx-2 md:px-16">
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={index}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

AgentBenefits.propTypes = {
  className: PropTypes.string,
};

export default AgentBenefits;