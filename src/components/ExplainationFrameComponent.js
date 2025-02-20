import { useMemo } from "react";
import PropTypes from "prop-types";

const FrameComponent = ({
  className = "",
  benefitIcons,
  benefitHeadingsPadding,
  highlyQualifiedLeads,
  highlyQualifiedLeadsDisplay,
  weConnectThousandsOfHomeowners,
  weConnectThousandsWidth,
  weConnectThousandsDisplay,
}) => {
  const benefitHeadingsStyle = useMemo(() => {
    return {
      padding: benefitHeadingsPadding,
    };
  }, [benefitHeadingsPadding]);

  const highlyQualifiedLeadsStyle = useMemo(() => {
    return {
      display: highlyQualifiedLeadsDisplay,
    };
  }, [highlyQualifiedLeadsDisplay]);

  const weConnectThousandsStyle = useMemo(() => {
    return {
      width: weConnectThousandsWidth,
      display: weConnectThousandsDisplay,
    };
  }, [weConnectThousandsWidth, weConnectThousandsDisplay]);

  return (
    <div
      className={`flex-1 flex flex-col items-start justify-start gap-[21px] min-w-[304px] max-w-full text-left text-xl text-black font-instrument-sans ${className}`}
    >
      <img
        className="self-stretch h-[239px] relative rounded-xl max-w-full overflow-hidden shrink-0 object-cover"
        loading="lazy"
        alt=""
        src={benefitIcons}
      />
      <div
        className="w-[368px] flex flex-col items-start justify-start gap-3 max-w-full"
        style={benefitHeadingsStyle}
      >
        <div
          className="relative tracking-[0.03em] font-semibold mq450:text-base"
          style={highlyQualifiedLeadsStyle}
        >
          {highlyQualifiedLeads}
        </div>
        <div
          className="relative text-base leading-[24px]"
          style={weConnectThousandsStyle}
        >
          {weConnectThousandsOfHomeowners}
        </div>
      </div>
    </div>
  );
};

FrameComponent.propTypes = {
  className: PropTypes.string,
  benefitIcons: PropTypes.string,
  highlyQualifiedLeads: PropTypes.string,
  weConnectThousandsOfHomeowners: PropTypes.string,

  /** Style props */
  benefitHeadingsPadding: PropTypes.string,
  highlyQualifiedLeadsDisplay: PropTypes.string,
  weConnectThousandsWidth: PropTypes.string,
  weConnectThousandsDisplay: PropTypes.string,
};

export default FrameComponent;
