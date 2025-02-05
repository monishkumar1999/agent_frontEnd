import { useMemo } from "react";
import PropTypes from "prop-types";
import { MoveRight, Star } from "lucide-react";
import { Link } from "react-router-dom";

const AgentProfileDetails = ({
  className = "",
  agentStarReviewsBackgroundImage,
  image,
  agentId,
  name,
  agencyName,
  location,
  role,
  aboutAgency,
  reviews = { rating: 4.5, count: 212 },
  details,
  agentDetails
}) => {
  const agentStarReviewsStyle = useMemo(() => {
    return {
      backgroundImage: agentStarReviewsBackgroundImage,
    };
  }, [agentStarReviewsBackgroundImage]);

  return (
    <Link
      to={{
        pathname: `/BuyerAgentDetailsPageInfo`,
      }}
      state={{
        details,
        agentDetails,
      }}
      className="block w-full"
    >
      <div
        className={`self-stretch bg-white border-gainsboro border-b-[2px] border-solid overflow-hidden flex flex-row items-start justify-start pt-3.5 px-3.5 pb-3 gap-[27px] shrink-0 text-left text-base text-white font-instrument-sans mq825:flex-wrap cursor-pointer transition-all duration-300 hover:shadow-lg ${className}`}
      >
        <div
          className="rounded-xl flex flex-row items-start justify-start pt-[223px] px-3 pb-3 box-border bg-cover bg-no-repeat bg-[top] min-w-[271px] mq825:flex-1"
          style={agentStarReviewsStyle}
        >
          <img
            className="h-[271px] w-[271px] relative rounded-xl object-cover hidden"
            alt={`${name}'s profile`}
            src={image}
          />
          <div className="h-9 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-lg bg-blueviolet border-white border-[1px] border-solid box-border flex flex-row items-start justify-start py-1.5 px-[9px] gap-2.5 z-[1]">
            <Star fill="white" size={20} />
            <div className="relative font-medium">
              {reviews.rating} ({reviews.count} Reviews)
            </div>
          </div>
        </div>
        <div className="w-[70%] flex flex-col items-start justify-start pt-3 px-0 pb-0 box-border text-lg text-black mq825:flex-1">
          <div className="self-stretch flex flex-col items-start justify-start gap-[26px]">
            <div className="w-[100%] flex flex-col items-start justify-start gap-3">
              <h2 className="m-0 self-stretch relative text-13xl tracking-[0.03em] font-semibold font-[inherit] mq450:text-lgi mq825:text-7xl">
                {name}
              </h2>
              <div className="self-stretch relative font-medium">{role} at {agencyName} </div>
              <div className="flex flex-row items-center justify-start gap-2.5">
                <img
                  className="h-[22px] w-[22px] relative"
                  loading="lazy"
                  alt="Location icon"
                  src="/location01.svg"
                />
                <div className="relative font-medium">{location}</div>
              </div>
            </div>
            <div className="self-stretch flex flex-col items-start justify-start gap-3">
              <div className="relative leading-[26px]">
                {aboutAgency?.slice(0, 100)}...
              </div>
              <div className="flex flex-row items-center justify-start gap-2.5 text-blue">
                <div className="relative font-medium text-[14px] inline-block min-w-[95px] text-[#5600FF]">
                  See Details
                </div>
                <MoveRight color="#5600FF" size={20} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

AgentProfileDetails.propTypes = {
  className: PropTypes.string,
  image: PropTypes.string,
  agentId: PropTypes.string.isRequired,
  agentStarReviewsBackgroundImage: PropTypes.string,
  name: PropTypes.string.isRequired,
  agencyName: PropTypes.string,
  location: PropTypes.string,
  role: PropTypes.string,
  aboutAgency: PropTypes.string,
  reviews: PropTypes.shape({
    rating: PropTypes.number,
    count: PropTypes.number,
  }),
  details: PropTypes.object.isRequired,
  agentDetails: PropTypes.object.isRequired,
};

export default AgentProfileDetails;
