import AgentTestimonialRatings from "./AgentTestimonialRatings";
import PropTypes from "prop-types";

const AgentTestimonialItems = ({
  className = "",
  image,
  agentName,
  diveIntoTheWorldOfRealEstate,
}) => {
  return (
    <div
      className={`self-stretch flex flex-row items-start justify-start flex-wrap content-start gap-3 max-w-full text-left text-lg text-black font-instrument-sans ${className}`}
    >
      <img
        className="h-[46px] w-[46px] relative rounded-[50%] object-cover"
        alt=""
        src={image}
      />
      <div className="text-[#454444] flex-1 flex flex-col items-start justify-start gap-3 min-w-[443px] max-w-full mq825:min-w-full">
        <div className="self-stretch relative leading-[26px] font-medium">
          {agentName}
        </div>
        <AgentTestimonialRatings />
        <div className="w-[556px] relative leading-[26px] text-darkslategray inline-block max-w-full">
          {diveIntoTheWorldOfRealEstate}
        </div>
      </div>
    </div>
  );
};

AgentTestimonialItems.propTypes = {
  className: PropTypes.string,
  image: PropTypes.string,
  agentName: PropTypes.string,
  diveIntoTheWorldOfRealEstate: PropTypes.string,
};

export default AgentTestimonialItems;
