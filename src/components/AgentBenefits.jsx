// import PropTypes from "prop-types";

// const BenefitCard = ({ icon, title, description }) => (
//   <div className="w-[300px] flex flex-col items-start justify-center gap-8 max-w-full mq450:gap-4 shadow-xl rounded-md">
//     <img className="w-screen h-full" loading="lazy" alt={title} src={icon} />
//     <div className="flex flex-col items-start gap-4 p-5">
//       <h2 className=" font-semibold">
//         {title}
//       </h2>
//       <p className="">
//         {description}
//       </p>
//     </div>
//   </div>
// );

// BenefitCard.propTypes = {
//   icon: PropTypes.string.isRequired,
//   title: PropTypes.string.isRequired,
//   description: PropTypes.string.isRequired,
// };

// const AgentBenefits = ({ className = "" }) => {
//   const benefits = [
//     {
//       icon: "/images/usersearch01.png",
//       title: "Tailored Agent Search",
//       description:
//         "Find expert buyer’s agents specialized in your needs and location.",
//     },
//     {
//       icon: "/images/mentoring.png",
//       title: "Negotiation & Closing Support",
//       description:
//         "Get expert guidance to secure the best deal and a smooth closing.",
//     },
//     {
//       icon: "/images/home09.png",
//       title: "Market Insights & Advice",
//       description:
//         "Receive up-to-date market trends and advice from agents to make informed decisions.",
//     },
//   ];

//   return (
//     <section
//       className={`self-stretch flex flex-row items-start justify-end pt-0 pb-[82px] pl-[73px] pr-[72px] box-border max-w-full shrink-0 text-center text-29xl text-black font-instrument-sans mq800:pb-[53px] mq800:box-border mq1350:pl-9 mq1350:pr-9 mq1350:box-border ${className}`}
//     >
//       <div className="flex-1 flex flex-col items-center justify-start gap-[60px] max-w-full mq800:gap-[30px]">
//         {/* Header Section */}
//         <div className="w-[632px] flex flex-col items-center justify-center px-[39px] gap-[15px] max-w-full">
//           <h1 className="font-athiban font-bold text-yellow-500 text-2xl w-screen">
//             Your Perfect Agent is Just a Click Away
//           </h1>
//           <p className="font-athiban">
//             Your one-stop platform for finding the right agent, tailored to your
//             needs.
//           </p>
//         </div>

//         {/* Benefits Section */}
//         <div className="flex flex-wrap gap-10">
//           {benefits.map((benefit, index) => (
//             <BenefitCard
//               key={index}
//               icon={benefit.icon}
//               title={benefit.title}
//               description={benefit.description}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// AgentBenefits.propTypes = {
//   className: PropTypes.string,
// };

// export default AgentBenefits;

import PropTypes from "prop-types";
import Tilt from "react-parallax-tilt";

const BenefitCard = ({ icon, title, description, bgColor }) => (
  <Tilt
    tiltMaxAngleX={15}
    tiltMaxAngleY={15}
    glareEnable={true}
    glareMaxOpacity={0.4}
    glareColor="#ffffff"
    glarePosition="top"
    className="relative w-[320px] h-[280px] flex flex-col items-center justify-center shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105"
  >
    {/* Background Color */}
    <div className={`p-5 rounded-lg ${bgColor}`}>
      {/* Shine Effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-white opacity-10 pointer-events-none"></div>
      {/* Image */}
      <img className="w-full h-25 object-cover" loading="lazy" alt={title} src={icon} />
      <h2 className="font-semibold text-white text-lg">{title}</h2>
      <p className="text-white opacity-90">{description}</p>
    </div>
  </Tilt>
);

BenefitCard.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
};

const AgentBenefits = ({ className = "font-athiban" }) => {
  const benefits = [
    {
      icon: "/images/c2.jpg",
      title: "Tailored Agent Search",
      description: "Find expert buyer’s agents specialized in your needs and location.",
      bgColor: "bg-blueviolet",
    },
    {
      icon: "/images/c1.jpg",
      title: "Negotiation & Closing Support",
      description: "Get expert guidance to secure the best deal and a smooth closing.",
      bgColor: "bg-blueviolet",
    },
    {
      icon: "/images/c3.jpg",
      title: "Market Insights & Advice",
      description: "Receive up-to-date market trends and advice from agents to make informed decisions.",
      bgColor: "bg-blueviolet",
    },
  ];

  return (
    <section className={`flex flex-col items-center justify-start gap-10 p-10 ${className}`}>
      {/* Header Section */}
      <div className="w-full text-center max-w-lg">
        <h1 className="font-athiban font-bold text-yellow-500 text-2xl">
          Your Perfect Agent is Just a Click Away
        </h1>
        <p className="font-athiban text-gray-700">Find the right agent tailored to your needs.</p>
      </div>

      {/* Benefits Section */}
      <div className="flex flex-wrap justify-center gap-6">
        {benefits.map((benefit, index) => (
          <BenefitCard
            key={index}
            icon={benefit.icon}
            title={benefit.title}
            description={benefit.description}
            bgColor={benefit.bgColor}
          />
        ))}
      </div>
    </section>
  );
};

AgentBenefits.propTypes = {
  className: PropTypes.string,
};

export default AgentBenefits;
