import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { MapPin, MoveRight, Star } from "lucide-react";

const AgentOneDetails = ({
  className = "",
  agentOneDetailsJustifyContent,
  agentOneRatingBackgroundImage,
  image,
  agentName,
  agentDesciptionShort,
  rating,
  location,
  jobrole
}) => {
  const agentOneDetailsStyle = useMemo(
    () => ({
      justifyContent: agentOneDetailsJustifyContent,
    }),
    [agentOneDetailsJustifyContent]
  );

  const agentOneRatingStyle = useMemo(
    () => ({
      backgroundImage: agentOneRatingBackgroundImage,
    }),
    [agentOneRatingBackgroundImage]
  );

  return (
    <div
      className={`flex flex-col sm:flex-row border border-gray-300 rounded-md shadow-lg items-start justify-start pt-3.5 px-4 pb-4 gap-6 sm:gap-8  sm:min-w-[408px]  text-left text-base font-instrument-sans ${className} w-screen`}
      style={agentOneDetailsStyle}
    >
      <AgentImageSection
        style={agentOneRatingStyle}
        rating={rating}
      />
      <AgentInfoSection 
        agentName={agentName}
        agentDesciptionShort={agentDesciptionShort}
        location={location}
        jobrole={jobrole}
      />
    </div>
  );
};

const AgentImageSection = ({ style, rating }) => (
  <div
    className="rounded-xl relative flex items-start justify-start pt-[150px] px-3 pb-3 bg-cover bg-no-repeat bg-top sm:w-[271px] sm:h-[271px] sm:min-w-[271px] sm:mb-0 mb-6"
    style={style}
  >
    <AgentRatingBadge rating={rating} />
  </div>
);

const AgentRatingBadge = ({ rating }) => (
  <div className="h-9 bg-transparent backdrop-blur-2xl shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-lg bg-blueviolet border-white border-[1px] border-solid flex items-center justify-start py-1.5 px-3 gap-2.5 z-[1] sm:absolute bottom-0 right-0">
    <Star fill="white" size={20} />
    <div className="relative font-medium">{rating}</div>
  </div>
);

const AgentInfoSection = ({ agentName, agentDesciptionShort, location, jobrole }) => (
  <div className="flex-1 flex flex-col items-start justify-start pt-3 px-0 pb-0 text-lg text-black">
    <div className="flex flex-col items-start gap-4">
      <AgentDetails agentName={agentName} location={location} jobrole={jobrole} />
      <AgentDescription agentDesciptionShort={agentDesciptionShort} />
    </div>
  </div>
);

const AgentDetails = ({ agentName, location, jobrole }) => (
  <div className="w-full flex flex-col items-start gap-3">
    <h2 className="text-[28px] sm:text-[32px] font-semibold">{agentName}</h2>
    <div className="text-[14px] sm:text-[16px] text-gray-600">{jobrole}</div>
    <div className="flex items-center gap-2.5">
      <MapPin size={20} />
      <div className="font-medium">{location}</div>
    </div>
  </div>
);

const AgentDescription = ({ agentDesciptionShort }) => {
  // Function to trim the description to 15 words
  const getTrimmedDescription = (description) => {
    const words = description.split(" ");
    return words.length > 15
      ? `${words.slice(0, 15).join(" ")}...`
      : description;
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="text-sm sm:text-base leading-[26px]">{getTrimmedDescription(agentDesciptionShort)}</div>
      <div className="flex items-center gap-2.5 text-blue-600">
        <div className="text-purple-600 font-medium">See Details</div>
        <MoveRight color="#5600FF" size={20} />
      </div>
    </div>
  );
};

AgentOneDetails.propTypes = {
  className: PropTypes.string,
  image: PropTypes.string,
  agentOneDetailsJustifyContent: PropTypes.string,
  agentOneRatingBackgroundImage: PropTypes.string,
  rating: PropTypes.string.isRequired,
  agentName: PropTypes.string.isRequired,
  agentDesciptionShort: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  jobrole: PropTypes.string,
};

AgentImageSection.propTypes = {
  style: PropTypes.object,
  rating: PropTypes.string.isRequired,
};

AgentRatingBadge.propTypes = {
  rating: PropTypes.string.isRequired,
};

AgentInfoSection.propTypes = {
  agentName: PropTypes.string.isRequired,
  agentDesciptionShort: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  jobrole: PropTypes.string,
};

AgentDetails.propTypes = {
  agentName: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  jobrole: PropTypes.string,
};

AgentDescription.propTypes = {
  agentDesciptionShort: PropTypes.string.isRequired,
};

export default AgentOneDetails;
