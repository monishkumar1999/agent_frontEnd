import { useMemo } from "react";
import PropTypes from "prop-types";

const FrameComponent3 = ({
  className = "",
  frameDivJustifyContent,
  frameDivBackgroundImage,
  image,
}) => {
  const frameDivStyle = useMemo(() => {
    return {
      justifyContent: frameDivJustifyContent,
    };
  }, [frameDivJustifyContent]);

  const frameDiv1Style = useMemo(() => {
    return {
      backgroundImage: frameDivBackgroundImage,
    };
  }, [frameDivBackgroundImage]);

  return (
    <div
      className={`flex-1 rounded-3xl bg-white border-gainsboro-300 border-[2px] border-solid box-border overflow-hidden flex flex-row items-start justify-start pt-3.5 px-3.5 pb-3 gap-[27px] min-w-[408px] max-w-full text-left text-base text-white font-instrument-sans mq800:flex-wrap mq800:min-w-full ${className}`}
      style={frameDivStyle}
    >
      <div
        className="rounded-xl flex flex-row items-start justify-start pt-[223px] px-3 pb-3 box-border bg-cover bg-no-repeat bg-[top] min-w-[271px] mq800:flex-1"
        style={frameDiv1Style}
      >
        <img
          className="h-[271px] w-[271px] relative rounded-xl object-cover hidden"
          alt=""
          src={image}
        />
        <div className="h-9 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-lg bg-blueviolet border-white border-[1px] border-solid box-border flex flex-row items-start justify-start py-1.5 px-[9px] gap-2.5 z-[1]">
          <img
            className="h-5 w-5 relative"
            loading="lazy"
            alt=""
            src="/star.svg"
          />
          <div className="relative font-medium">4.5 (212 Reviews)</div>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-start justify-start pt-3 px-0 pb-0 box-border min-w-[194px] text-lg text-black">
        <div className="self-stretch flex flex-col items-start justify-start gap-[26px]">
          <div className="w-[258px] flex flex-col items-start justify-start gap-3">
            <h2 className="m-0 self-stretch relative text-13xl tracking-[0.03em] font-semibold font-[inherit] mq800:text-7xl mq450:text-lgi">
              Bala Kumar
            </h2>
            <div className="self-stretch relative font-medium">
              Sales manager at Greenville
            </div>
            <div className="flex flex-row items-center justify-start gap-2.5">
              <img
                className="h-[22px] w-[22px] relative"
                loading="lazy"
                alt=""
                src="/location01.svg"
              />
              <div className="relative font-medium">Central Park</div>
            </div>
          </div>
          <div className="self-stretch flex flex-col items-start justify-start gap-3">
            <div className="relative leading-[26px]">
              Dive into the world of real estate with a trusted ally by your
              side – the Buyer Agent! This profile is...
            </div>
            <div className="flex flex-row items-center justify-start gap-2.5 text-blue">
              <div className="relative font-medium inline-block min-w-[95px]">
                See Details
              </div>
              <img
                className="h-[22px] w-[22px] relative object-contain"
                loading="lazy"
                alt=""
                src="/arrowleft02.svg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

FrameComponent3.propTypes = {
  className: PropTypes.string,
  image: PropTypes.string,

  /** Style props */
  frameDivJustifyContent: PropTypes.string,
  frameDivBackgroundImage: PropTypes.string,
};

export default FrameComponent3;
