import PropTypes from "prop-types";

const FrameComponent = ({ className = "", image }) => {
  return (
    <section
      className={`flex flex-row items-start justify-start pt-0 pb-[82px] pl-px pr-0 box-border max-w-full shrink-0 text-left text-41xl text-white font-instrument-sans mq800:pb-[53px] mq800:box-border ${className}`}
    >
      <div className="h-[677px] w-[1407px] rounded-3xl bg-gainsboro-500 overflow-hidden shrink-0 flex flex-col items-start justify-start pt-[111px] px-[63px] pb-[357px] box-border relative gap-[67px] max-w-full mq800:gap-[33px] mq800:pt-[47px] mq800:pb-[151px] mq800:box-border mq450:gap-[17px] mq1350:h-auto mq1350:pt-[72px] mq1350:px-[31px] mq1350:pb-[232px] mq1350:box-border">
        <img
          className="w-full h-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px] max-w-full overflow-hidden max-h-full object-cover"
          alt=""
          src={image}
        />
        <div className="w-[632px] flex flex-col items-start justify-start gap-[15px] shrink-0 max-w-full">
          <h1 className="m-0 relative text-inherit font-bold font-[inherit] z-[1] mq800:text-29xl mq450:text-17xl">
            Find Top-Rated Buyer Agents Across the UK
          </h1>
          <div className="w-[521px] relative text-xl tracking-[0.03em] inline-block max-w-full z-[1] mq450:text-base">
            Your one-stop platform for finding the right agent, tailored to your
            needs.
          </div>
        </div>
        <div className="w-[1360px] flex flex-row items-start justify-start gap-[603px] shrink-0 max-w-[107%] text-base text-black mq800:gap-[151px] mq450:gap-[75px] mq1350:gap-[301px] mq1350:flex-wrap">
          <div className="rounded-31xl bg-white overflow-hidden flex flex-row items-start justify-start py-1 pl-4 pr-1 gap-[14.5px] shrink-0 z-[1]">
            <div className="flex flex-col items-start justify-start pt-3 px-0 pb-0">
              <div className="relative font-medium inline-block min-w-[89px]">
                New Village
              </div>
            </div>
            <div className="flex flex-col items-start justify-start pt-3 px-0 pb-0">
              <img
                className="w-5 h-5 relative"
                loading="lazy"
                alt=""
                src="/arrowdown01.svg"
              />
            </div>
            <button className="cursor-pointer [border:none] py-3 px-[23px] bg-blueviolet shadow-[0px_4px_9px_rgba(216,_198,_252,_0.32)] rounded-29xl flex flex-row items-start justify-start hover:bg-mediumslateblue">
              <div className="relative text-base font-semibold font-instrument-sans text-white text-left">
                Search
              </div>
            </button>
          </div>
          <div className="h-[734px] w-[728px] flex flex-col items-start justify-start pt-1.5 px-0 pb-0 box-border max-w-full shrink-0">
            <div className="self-stretch flex-1 relative rounded-[50%] bg-thistle shrink-0 z-[1]" />
          </div>
        </div>
      </div>
    </section>
  );
};

FrameComponent.propTypes = {
  className: PropTypes.string,
  image: PropTypes.string,
};

export default FrameComponent;
