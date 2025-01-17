import FrameComponent2 from "./FrameComponent2";
import PropTypes from "prop-types";

const Benefits = ({ className = "" }) => {
  return (
    <section
      className={`w-[1393px] flex flex-row items-start justify-end pt-0 px-[49px] pb-[82px] box-border max-w-full shrink-0 text-center text-29xl text-black font-instrument-sans mq800:pb-[53px] mq800:box-border mq1350:pl-6 mq1350:pr-6 mq1350:box-border ${className}`}
    >
      <div className="flex-1 flex flex-col items-start justify-start gap-[60px] max-w-full mq800:gap-[30px]">
        <div className="w-[1280.5px] flex flex-row items-start justify-center py-0 px-5 box-border max-w-full">
          <div className="w-[552px] flex flex-col items-start justify-start gap-[15px] max-w-full">
            <h1 className="m-0 relative text-inherit font-semibold font-[inherit] mq800:text-19xl mq450:text-10xl">
              Your Perfect Agent is Just a Click Away
            </h1>
            <div className="self-stretch flex flex-row items-start justify-start py-0 pl-4 pr-[15px] box-border max-w-full text-xl">
              <div className="flex-1 relative tracking-[0.03em] inline-block max-w-full mq450:text-base">
                Your one-stop platform for finding the right agent, tailored to
                your needs.
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-row items-start justify-center gap-[33px] max-w-full text-left text-5xl mq800:gap-4 mq1125:flex-wrap">
          <FrameComponent2
            frame1618873306="/frame-1618873306.svg"
            tailoredAgentSearch="Tailored Agent Search"
            findExpertBuyersAgentsSpeciali="Find expert buyer’s agents specialized in your needs and location."
          />
          <div className="flex-1 flex flex-row items-start justify-start gap-[33px] min-w-[557px] max-w-full mq800:flex-wrap mq800:min-w-full mq450:gap-4">
            <FrameComponent2
              frame1618873306="/frame-1618873308@2x.png"
              tailoredAgentSearch={`Negotiation & Closing Support`}
              tailoredAgentSearchAlignSelf="unset"
              findExpertBuyersAgentsSpeciali="Get expert guidance to secure the best deal and a smooth closing."
            />
            <div className="flex-1 flex flex-col items-start justify-start gap-8 min-w-[272px] max-w-full mq450:gap-4">
              <div className="w-[405px] h-[239px] rounded-xl bg-lavender-200 overflow-hidden shrink-0 flex flex-row items-start justify-start max-w-full">
                <div className="mt-[-6px] ml-[-21px] h-[251px] w-[448px] relative shrink-0 max-w-[111%]">
                  <img
                    className="absolute top-[0px] left-[0px] w-full h-full object-cover"
                    loading="lazy"
                    alt=""
                    src="/image-10@2x.png"
                  />
                  <div className="absolute top-[43px] left-[162px] bg-white w-[190px] h-[39px] z-[1]">
                    <div className="absolute top-[0px] left-[0px] bg-white w-full h-full hidden" />
                    <div className="absolute top-[20px] left-[43px] bg-beige border-gray-200 border-[1px] border-solid box-border w-2.5 h-3 z-[2]" />
                    <div className="absolute top-[9px] left-[62px] bg-beige border-gray-200 border-[1px] border-solid box-border w-2.5 h-[23px] z-[2]" />
                    <div className="absolute top-[0px] left-[81px] bg-gray-100 border-gray-200 border-[1px] border-solid box-border w-2.5 h-8 z-[2]" />
                    <div className="absolute top-[20px] left-[100px] bg-beige border-gray-200 border-[1px] border-solid box-border w-2.5 h-3 z-[2]" />
                    <div className="absolute top-[9px] left-[119px] bg-beige border-gray-200 border-[1px] border-solid box-border w-2.5 h-[23px] z-[2]" />
                    <div className="absolute top-[20px] left-[138px] bg-beige border-gray-200 border-[1px] border-solid box-border w-2.5 h-3 z-[2]" />
                  </div>
                </div>
              </div>
              <div className="self-stretch flex flex-col items-start justify-start gap-4 max-w-full">
                <div className="w-[369px] relative tracking-[0.03em] font-semibold inline-block max-w-full mq450:text-lgi">{`Market Insights & Advice`}</div>
                <div className="relative text-xl leading-[28px] mq450:text-base mq450:leading-[22px]">
                  Receive up-to-date market trends and advice from agents to
                  make informed decisions
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Benefits.propTypes = {
  className: PropTypes.string,
};

export default Benefits;
