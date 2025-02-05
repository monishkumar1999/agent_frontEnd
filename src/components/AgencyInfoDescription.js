import { useMemo } from "react";
import PropTypes from "prop-types";

const AgencyInfoDescription = ({
  className = "",
  agencyDescriptionWidth,
  agencyDescriptionAlignSelf,
  aboutGreenValley,
  diveIntoTheWidth,
  agentDetails,
  description
}) => {
  const agencyDescriptionStyle = useMemo(() => {
    return {
      width: agencyDescriptionWidth,
      alignSelf: agencyDescriptionAlignSelf,
    };
  }, [agencyDescriptionWidth, agencyDescriptionAlignSelf]);

  const diveIntoTheStyle = useMemo(() => {
    return {
      width: diveIntoTheWidth,
    };
  }, [diveIntoTheWidth]);

  return (
    <div
      className={`w-[654px] flex flex-col items-start justify-start gap-3 max-w-full text-left text-lg text-black font-instrument-sans ${className}`}
      style={agencyDescriptionStyle}
    >
      <div className="self-stretch relative leading-[26px] font-medium">
        About {aboutGreenValley}
      </div>
      <div
        className="w-[640px] relative leading-[26px] text-[#454444] inline-block max-w-full"
        style={diveIntoTheStyle}
      >
        {description}
      </div>
    </div>
  );
};

AgencyInfoDescription.propTypes = {
  className: PropTypes.string,
  aboutGreenValley: PropTypes.string,
  description: PropTypes.string,
  /** Style props */
  agencyDescriptionWidth: PropTypes.string,
  agencyDescriptionAlignSelf: PropTypes.string,
  diveIntoTheWidth: PropTypes.string,
  agentDetails: PropTypes.object,
};

export default AgencyInfoDescription;
