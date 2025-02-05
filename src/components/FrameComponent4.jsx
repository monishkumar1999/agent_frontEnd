import PropTypes from "prop-types";

const FrameComponent4 = ({ className = "" }) => {
  return (
    <section
      className={`self-stretch flex flex-row items-start justify-center pt-0 pb-[82px] pl-[21px] pr-5 box-border max-w-full shrink-0 text-center text-29xl text-black font-instrument-sans mq800:pb-[34px] mq800:box-border mq1125:pb-[53px] mq1125:box-border ${className}`}
    >
      <div className="w-[1087px] flex flex-col items-start justify-start gap-[50px] max-w-full mq800:gap-[25px]">
        <div className="self-stretch flex flex-row items-start justify-center py-0 px-5 box-border max-w-full">
          <div className="w-[607px] flex flex-col items-start justify-start gap-[15px] max-w-full">
            <h1 className="m-0 relative text-inherit font-semibold font-[inherit] mq800:text-19xl mq450:text-10xl">
              Explore Our Network of Top Buyer’s Agents
            </h1>
            <div className="relative text-xl tracking-[0.01em] mq450:text-base">
              Get all the details you need to compare agents side by side, so
              you're confident before your first conversation.
            </div>
          </div>
        </div>
        <div className="self-stretch rounded-xl bg-blueviolet border-gainsboro-400 border-[1px] border-solid box-border overflow-hidden flex flex-col items-end justify-start pt-2 px-[9px] pb-[31px] gap-[42px] max-w-full text-lg text-dimgray mq800:gap-[21px]">
          <div className="self-stretch shadow-[0px_4px_54px_rgba(0,_0,_0,_0.02)] rounded-xl bg-white border-gainsboro-200 border-[1px] border-solid box-border overflow-hidden flex flex-col items-end justify-start py-[29px] pl-[292px] pr-[291px] gap-[13px] max-w-full mq800:pl-[73px] mq800:pr-[72px] mq800:box-border mq450:pl-5 mq450:pr-5 mq450:box-border mq1125:pl-[146px] mq1125:pr-[145px] mq1125:box-border">
            <div className="w-[448px] h-[52px] flex flex-row items-start justify-start gap-20 max-w-full mq450:gap-10">
              <div className="rounded-45xl bg-blue border-white border-[2.5px] border-solid overflow-hidden flex flex-row items-start justify-start py-3.5 pl-[15px] pr-3.5 shrink-0 z-[1] text-xl text-white">
                <div className="relative font-semibold inline-block min-w-[23px] mq450:text-base">
                  01
                </div>
              </div>
              <div className="h-[52px] w-[52px] flex flex-row items-start justify-start relative">
                <img
                  className="h-[2.5px] w-[425px] absolute !m-[0] right-[-264px] bottom-[23.5px]"
                  alt=""
                  src="/vector-3-1.svg"
                />
                <div className="flex-1 rounded-45xl bg-white border-gainsboro-300 border-[2.5px] border-solid overflow-hidden flex flex-row items-start justify-start py-[15px] pl-[15px] pr-3.5 z-[1]">
                  <div className="relative font-medium">02</div>
                </div>
              </div>
              <div className="rounded-45xl bg-white border-gainsboro-300 border-[2.5px] border-solid overflow-hidden flex flex-row items-start justify-start py-[15px] pl-[15px] pr-[13px] shrink-0 z-[1]">
                <div className="relative font-medium inline-block min-w-[24px]">
                  03
                </div>
              </div>
              <div className="rounded-45xl bg-white border-gainsboro-300 border-[2.5px] border-solid overflow-hidden flex flex-row items-start justify-start py-[15px] pl-[15px] pr-[13px] shrink-0 z-[1]">
                <div className="relative font-medium">04</div>
              </div>
            </div>
            <div className="self-stretch flex flex-row items-start justify-between gap-5 text-base mq800:flex-wrap">
              <div className="relative tracking-[0.01em] font-medium text-blue inline-block min-w-[120px]">
                About Property
              </div>
              <div className="flex flex-col items-start justify-start py-0 pl-0 pr-3.5">
                <div className="self-stretch relative tracking-[0.01em] font-medium">
                  Location
                </div>
              </div>
              <div className="flex flex-col items-start justify-start py-0 pl-0 pr-7">
                <div className="self-stretch relative tracking-[0.01em] font-medium">
                  Your Needs
                </div>
              </div>
              <div className="relative tracking-[0.01em] font-medium inline-block min-w-[47px]">
                Finish
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-row items-start justify-center py-0 pl-6 pr-5 box-border max-w-full text-left text-white">
            <div className="w-[695px] flex flex-col items-start justify-start gap-11 max-w-full mq800:gap-[22px]">
              <div className="self-stretch flex flex-col items-center justify-start gap-6">
                <i className="self-stretch relative tracking-[0.01em] font-semibold">
                  What type of property are you looking to buy?
                </i>
                <div className="self-stretch flex flex-row items-center justify-start flex-wrap content-center gap-3 text-center">
                  <button className="cursor-pointer [border:none] py-2.5 px-[19px] bg-white rounded-21xl flex flex-row items-center justify-center gap-2.5 hover:bg-gainsboro-100">
                    <img
                      className="h-5 w-5 relative"
                      alt=""
                      src="/checkmarkcircle01.svg"
                    />
                    <div className="flex-1 relative text-lg tracking-[0.01em] font-medium font-instrument-sans text-blue text-center">
                      House
                    </div>
                  </button>
                  <button className="cursor-pointer border-gainsboro-600 border-[1.5px] border-solid py-2 px-[18px] bg-blueviolet h-[42px] rounded-21xl box-border flex flex-row items-center justify-center hover:bg-mediumslateblue hover:border-silver hover:border-[1.5px] hover:border-solid hover:box-border">
                    <div className="relative text-lg tracking-[0.01em] font-medium font-instrument-sans text-white text-center">
                      Unit
                    </div>
                  </button>
                  <button className="cursor-pointer border-gainsboro-600 border-[1.5px] border-solid py-2 px-[18px] bg-blueviolet h-[42px] rounded-21xl box-border flex flex-row items-center justify-center hover:bg-mediumslateblue hover:border-silver hover:border-[1.5px] hover:border-solid hover:box-border">
                    <div className="relative text-lg tracking-[0.01em] font-medium font-instrument-sans text-white text-center">
                      Land
                    </div>
                  </button>
                  <button className="cursor-pointer border-gainsboro-600 border-[1.5px] border-solid py-2 px-[18px] bg-blueviolet flex-1 rounded-21xl box-border flex flex-row items-center justify-center min-w-[88px] min-h-[42px] hover:bg-mediumslateblue hover:border-silver hover:border-[1.5px] hover:border-solid hover:box-border">
                    <div className="relative text-lg tracking-[0.01em] font-medium font-instrument-sans text-white text-center inline-block min-w-[96px]">
                      Apartment
                    </div>
                  </button>
                  <button className="cursor-pointer border-gainsboro-600 border-[1.5px] border-solid py-2 px-[18px] bg-blueviolet flex-1 rounded-21xl box-border flex flex-row items-center justify-center min-w-[90px] min-h-[42px] hover:bg-mediumslateblue hover:border-silver hover:border-[1.5px] hover:border-solid hover:box-border">
                    <div className="relative text-lg tracking-[0.01em] font-medium font-instrument-sans text-white text-center inline-block min-w-[100px]">
                      Townhouse
                    </div>
                  </button>
                  <div className="h-[42px] rounded-21xl bg-blueviolet border-gainsboro-600 border-[1.5px] border-solid box-border flex flex-row items-center justify-center py-2 px-[18px]">
                    <div className="relative tracking-[0.01em] font-medium">
                      Villa
                    </div>
                  </div>
                </div>
              </div>
              <div className="self-stretch flex flex-col items-start justify-start gap-6">
                <i className="self-stretch relative tracking-[0.01em] font-semibold">
                  How many bedrooms are you looking for?
                </i>
                <div className="flex flex-row items-center justify-start py-0 pl-0 pr-[421px] gap-3 text-center mq800:flex-wrap mq800:pr-[210px] mq800:box-border mq450:pr-5 mq450:box-border">
                  <div className="rounded-21xl bg-white flex flex-row items-center justify-center py-2.5 px-[19px] gap-2.5 text-blue">
                    <img
                      className="h-5 w-5 relative"
                      alt=""
                      src="/checkmarkcircle01.svg"
                    />
                    <div className="relative tracking-[0.01em] font-medium">
                      1
                    </div>
                  </div>
                  <div className="rounded-21xl bg-blueviolet border-gainsboro-600 border-[1.5px] border-solid flex flex-row items-center justify-center py-2 px-[18px]">
                    <div className="relative tracking-[0.01em] font-medium">
                      2
                    </div>
                  </div>
                  <div className="rounded-21xl bg-blueviolet border-gainsboro-600 border-[1.5px] border-solid flex flex-row items-center justify-center py-2 px-[18px]">
                    <div className="relative tracking-[0.01em] font-medium">
                      3
                    </div>
                  </div>
                  <button className="cursor-pointer border-gainsboro-600 border-[1.5px] border-solid py-2 px-[18px] bg-blueviolet rounded-21xl flex flex-row items-center justify-center hover:bg-mediumslateblue hover:border-silver hover:border-[1.5px] hover:border-solid hover:box-border">
                    <div className="relative text-lg tracking-[0.01em] font-medium font-instrument-sans text-white text-center">
                      4+
                    </div>
                  </button>
                </div>
              </div>
              <div className="self-stretch flex flex-col items-start justify-start gap-6">
                <i className="self-stretch relative tracking-[0.01em] font-semibold">
                  What's your ideal price range for the property?
                </i>
                <div className="self-stretch flex flex-col items-start justify-start gap-3 text-center text-blue">
                  <div className="self-stretch flex flex-row items-center justify-start py-0 px-0 gap-3 mq1125:flex-wrap">
                    <div className="w-[212px] rounded-21xl bg-white flex flex-row items-center justify-center py-2.5 px-[19px] box-border gap-2.5 shrink-0">
                      <img
                        className="h-5 w-5 relative"
                        alt=""
                        src="/checkmarkcircle01.svg"
                      />
                      <div className="flex-1 relative tracking-[0.01em] font-medium">
                        Less than $200k
                      </div>
                    </div>
                    <button className="cursor-pointer border-gainsboro-600 border-[1.5px] border-solid py-2 px-[18px] bg-blueviolet h-[42px] rounded-21xl box-border flex flex-row items-center justify-center hover:bg-mediumslateblue hover:border-silver hover:border-[1.5px] hover:border-solid hover:box-border">
                      <div className="flex-1 relative text-lg tracking-[0.01em] font-medium font-instrument-sans text-white text-center inline-block min-w-[120px]">
                        $200k - 400k
                      </div>
                    </button>
                    <button className="cursor-pointer border-gainsboro-600 border-[1.5px] border-solid py-2 px-[18px] bg-blueviolet h-[42px] rounded-21xl box-border flex flex-row items-center justify-center hover:bg-mediumslateblue hover:border-silver hover:border-[1.5px] hover:border-solid hover:box-border">
                      <div className="flex-1 relative text-lg tracking-[0.01em] font-medium font-instrument-sans text-white text-center inline-block min-w-[120px]">
                        $200k - 400k
                      </div>
                    </button>
                    <button className="cursor-pointer border-gainsboro-600 border-[1.5px] border-solid py-2 px-[18px] bg-blueviolet h-[42px] rounded-21xl box-border flex flex-row items-center justify-center hover:bg-mediumslateblue hover:border-silver hover:border-[1.5px] hover:border-solid hover:box-border">
                      <div className="flex-1 relative text-lg tracking-[0.01em] font-medium font-instrument-sans text-white text-center inline-block min-w-[120px]">
                        $200k - 400k
                      </div>
                    </button>
                  </div>
                  <div className="self-stretch flex flex-row items-center justify-start flex-wrap content-center py-0 pl-0 pr-[23px] gap-3">
                    <button className="cursor-pointer border-gainsboro-600 border-[1.5px] border-solid py-2 px-[18px] bg-blueviolet flex-1 rounded-21xl box-border flex flex-row items-center justify-center min-w-[120px] max-w-[159px] min-h-[42px] hover:bg-mediumslateblue hover:border-silver hover:border-[1.5px] hover:border-solid hover:box-border">
                      <div className="flex-1 relative text-lg tracking-[0.01em] font-medium font-instrument-sans text-white text-center">
                        $200k - 400k
                      </div>
                    </button>
                    <button className="cursor-pointer border-gainsboro-600 border-[1.5px] border-solid py-2 px-[18px] bg-blueviolet flex-1 rounded-21xl box-border flex flex-row items-center justify-center min-w-[120px] max-w-[159px] min-h-[42px] hover:bg-mediumslateblue hover:border-silver hover:border-[1.5px] hover:border-solid hover:box-border">
                      <div className="flex-1 relative text-lg tracking-[0.01em] font-medium font-instrument-sans text-white text-center">
                        $200k - 400k
                      </div>
                    </button>
                    <button className="cursor-pointer border-gainsboro-600 border-[1.5px] border-solid py-2 px-[18px] bg-blueviolet flex-1 rounded-21xl box-border flex flex-row items-center justify-center min-w-[120px] max-w-[159px] min-h-[42px] hover:bg-mediumslateblue hover:border-silver hover:border-[1.5px] hover:border-solid hover:box-border">
                      <div className="flex-1 relative text-lg tracking-[0.01em] font-medium font-instrument-sans text-white text-center">
                        $200k - 400k
                      </div>
                    </button>
                    <button className="cursor-pointer border-gainsboro-600 border-[1.5px] border-solid py-2 px-[18px] bg-blueviolet flex-1 rounded-21xl box-border flex flex-row items-center justify-center min-w-[120px] max-w-[159px] min-h-[42px] hover:bg-mediumslateblue hover:border-silver hover:border-[1.5px] hover:border-solid hover:box-border">
                      <div className="flex-1 relative text-lg tracking-[0.01em] font-medium font-instrument-sans text-white text-center">
                        $200k - 400k
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-start justify-end py-0 px-[161px] box-border max-w-full mq800:pl-10 mq800:pr-10 mq800:box-border mq1125:pl-20 mq1125:pr-20 mq1125:box-border">
            <button className="cursor-pointer [border:none] py-3 px-[325px] bg-white rounded-29xl flex flex-row items-start justify-center box-border gap-2.5 max-w-full mq450:pl-5 mq450:pr-5 mq450:box-border">
              <div className="flex flex-col items-start justify-start pt-px px-0 pb-0">
                <div className="relative text-base font-semibold font-instrument-sans text-blueviolet text-left">
                  Next
                </div>
              </div>
              <img
                className="h-[22px] w-[22px] relative object-contain"
                alt=""
                src="/arrowleft02-4.svg"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

FrameComponent4.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent4;
