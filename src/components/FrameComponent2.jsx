import { useMemo } from "react";
import PropTypes from "prop-types";

const FrameComponent2 = ({
  className = "",
  frame1618873306,
  tailoredAgentSearch,
  tailoredAgentSearchAlignSelf,
  findExpertBuyersAgentsSpeciali,
}) => {
  const tailoredAgentSearchStyle = useMemo(() => {
    return {
      alignSelf: tailoredAgentSearchAlignSelf,
    };
  }, [tailoredAgentSearchAlignSelf]);

  return (
    <div
      className={`flex flex-col items-start justify-start gap-8 max-w-full text-left text-5xl text-black font-instrument-sans mq800:min-w-full mq450:gap-4 mq1125:flex-1 ${className}`}
    >
      <img
        className="self-stretch h-[239px] relative rounded-xl max-w-full overflow-hidden shrink-0"
        loading="lazy"
        alt=""
        src={frame1618873306}
      />
      <div className="w-[368px] flex flex-col items-start justify-start gap-4 max-w-full">
        <div
          className="self-stretch relative tracking-[0.03em] font-semibold mq450:text-lgi"
          style={tailoredAgentSearchStyle}
        >
          {tailoredAgentSearch}
        </div>
        <div className="relative text-xl leading-[28px] mq450:text-base mq450:leading-[22px]">
          {findExpertBuyersAgentsSpeciali}
        </div>
      </div>
    </div>
  );
};

FrameComponent2.propTypes = {
  className: PropTypes.string,
  frame1618873306: PropTypes.string,
  tailoredAgentSearch: PropTypes.string,
  findExpertBuyersAgentsSpeciali: PropTypes.string,

  /** Style props */
  tailoredAgentSearchAlignSelf: PropTypes.string,
};

export default FrameComponent2;
