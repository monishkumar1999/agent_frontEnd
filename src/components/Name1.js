import { useMemo } from "react";
import PropTypes from "prop-types";
import { Star } from "lucide-react";

const Name1 = ({
  className = "",
  nameWidth,
  nameFlex,
  centralParkDisplay,
  centralParkMinWidth,
  reviewsDisplay,
  reviewsMinWidth,
  agentDetails,
}) => {
  const nameStyle = useMemo(() => {
    return {
      width: nameWidth,
      flex: nameFlex,
    };
  }, [nameWidth, nameFlex]);

  const centralParkStyle = useMemo(() => {
    return {
      display: centralParkDisplay,
      minWidth: centralParkMinWidth,
    };
  }, [centralParkDisplay, centralParkMinWidth]);

  const reviewsStyle = useMemo(() => {
    return {
      display: reviewsDisplay,
      minWidth: reviewsMinWidth,
    };
  }, [reviewsDisplay, reviewsMinWidth]);

  return (
    <div
      className={`w-[305px] flex flex-col items-start justify-start gap-3 text-left text-lg text-black font-instrument-sans ${className}`}
      style={nameStyle}
    >
      <h1 className="m-0 self-stretch relative text-[32px] tracking-[0.03em] font-semibold font-[inherit] mq825:text-7xl mq450:text-lgi">
      {agentDetails.firstName} {agentDetails.lastName}
      </h1>
      <div className="self-stretch relative font-medium">
      {agentDetails.role.join(", ")} at {agentDetails.agencyName}
      </div>
      <div className="flex flex-row items-start justify-start gap-[15px]">
        <div className="flex flex-row items-center justify-start gap-2.5">
          <img
            className="h-[22px] w-[22px] relative"
            loading="lazy"
            alt=""
            src="/location01.svg"
          />
          <div
            className="relative font-medium inline-block min-w-[105px]"
            style={centralParkStyle}
          >
            {agentDetails.officeAddress}
          </div>
        </div>
        <div className="flex flex-row items-start justify-start gap-2.5  ml-10 text-base text-blueviolet">
          <Star fill="#8046F1" size={20} />
          <div
            className="relative font-medium inline-block min-w-[185px]"
            style={reviewsStyle}
          >
            4.5 (212 Reviews)
          </div>
        </div>
      </div>
    </div>
  );
};

Name1.propTypes = {
  className: PropTypes.string,

  /** Style props */
  nameWidth: PropTypes.string,
  nameFlex: PropTypes.string,
  centralParkDisplay: PropTypes.string,
  centralParkMinWidth: PropTypes.string,
  reviewsDisplay: PropTypes.string,
  reviewsMinWidth: PropTypes.string,
};

export default Name1;
