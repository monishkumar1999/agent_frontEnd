import PropTypes from "prop-types";

const BenefitCard = ({ icon, title, description }) => (
  <div className="w-[300px] flex flex-col items-start justify-center gap-8 max-w-full mq450:gap-4 shadow-xl rounded-md">
    <img className="w-screen h-full" loading="lazy" alt={title} src={icon} />
    <div className="flex flex-col items-start gap-4 p-5">
      <h2 className=" font-semibold">
        {title}
      </h2>
      <p className="">
        {description}
      </p>
    </div>
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
      icon: "/images/usersearch01.png",
      title: "Tailored Agent Search",
      description:
        "Find expert buyer’s agents specialized in your needs and location.",
    },
    {
      icon: "/images/mentoring.png",
      title: "Negotiation & Closing Support",
      description:
        "Get expert guidance to secure the best deal and a smooth closing.",
    },
    {
      icon: "/images/home09.png",
      title: "Market Insights & Advice",
      description:
        "Receive up-to-date market trends and advice from agents to make informed decisions.",
    },
  ];

  return (
    <section
      className={`self-stretch flex flex-row items-start justify-end pt-0 pb-[82px] pl-[73px] pr-[72px] box-border max-w-full shrink-0 text-center text-29xl text-black font-instrument-sans mq800:pb-[53px] mq800:box-border mq1350:pl-9 mq1350:pr-9 mq1350:box-border ${className}`}
    >
      <div className="flex-1 flex flex-col items-center justify-start gap-[60px] max-w-full mq800:gap-[30px]">
        {/* Header Section */}
        <div className="w-[632px] flex flex-col items-center justify-center px-[39px] gap-[15px] max-w-full">
          <h1 className="font-thiban font-bold text-yellow-500 text-2xl w-screen">
            Your Perfect Agent is Just a Click Away
          </h1>
          <p className="">
            Your one-stop platform for finding the right agent, tailored to your
            needs.
          </p>
        </div>

        {/* Benefits Section */}
        <div className="flex flex-wrap gap-10">
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
