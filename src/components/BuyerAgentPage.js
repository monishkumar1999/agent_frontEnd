import { useMemo } from "react";
import PropTypes from "prop-types";

const BuyerAgentPage = ({
  className = "",
  fIndMyAgent,
  budgetTextDecoration,
  eMailTextDecoration,
}) => {
  const budgetStyle = useMemo(() => {
    return {
      textDecoration: budgetTextDecoration,
    };
  }, [budgetTextDecoration]);

  const eMailStyle = useMemo(() => {
    return {
      textDecoration: eMailTextDecoration,
    };
  }, [eMailTextDecoration]);

  return (
    <section
      className={`bg-[#F3EDFF] self-stretch flex flex-col items-end justify-start gap-[18px] max-w-full shrink-0 text-left text-lg text-black font-instrument-sans ${className}`}
    >
      <div className="self-stretch bg-lavender overflow-hidden flex flex-row items-start justify-end pt-[19px] px-[55px] pb-[18px] box-border max-w-full mq1410:pl-[27px] mq1410:pr-[27px] mq1410:box-border">
        <div className="w-[1304px] flex flex-col items-start justify-start gap-8 max-w-full mq825:gap-4">
          <div className="self-stretch relative tracking-[0.03em] font-semibold">
            Property Details
          </div>
          <div className="self-stretch flex flex-row items-center justify-between flex-wrap content-center text-sm text-dimgray-100">
            <div className="flex flex-col items-start justify-start gap-3">
              <div className="relative font-medium">Property Type</div>
              <div className="relative font-semibold text-black inline-block min-w-[44px]">
                House
              </div>
            </div>
            <img
              className="h-[49px] w-[1.5px] relative"
              loading="lazy"
              alt=""
              src="/vector-5.svg"
            />
            <div className="flex flex-col items-start justify-start py-0 px-0 gap-3 text-base">
              <div className="relative font-medium">Rooms</div>
              <div className="relative text-sm font-semibold text-black inline-block min-w-[7px]">
                1
              </div>
            </div>
            <img
              className="h-[49px] w-[1.5px] relative"
              loading="lazy"
              alt=""
              src="/vector-6.svg"
            />
            <div className="flex flex-col items-start justify-start gap-3">
              <div className="relative font-medium" style={budgetStyle}>
                Budget
              </div>
              <div className="relative font-semibold text-black">$200k</div>
            </div>
            <img
              className="h-[49px] w-[1.5px] relative"
              loading="lazy"
              alt=""
              src="/vector-7.svg"
            />
            <div className="flex flex-col items-start justify-start gap-3">
              <div className="relative font-medium inline-block min-w-[19px]">
                Location
              </div>
              <div className="relative font-semibold text-black">New York</div>
            </div>
            <img
              className="h-[49px] w-[1.5px] relative"
              loading="lazy"
              alt=""
              src="/vector-8.svg"
            />
            <div className="flex flex-col items-start justify-start gap-3">
              <div className="relative font-medium">When are you planing</div>
              <div className="relative font-semibold text-black inline-block min-w-[84px]">
                Immediately
              </div>
            </div>
            <img
              className="h-[49px] w-[1.5px] relative"
              loading="lazy"
              alt=""
              src="/vector-5.svg"
            />
            <div className="flex flex-col items-start justify-start py-0 pl-0 pr-0.5 gap-3">
              <div className="relative font-medium">Your Purpose</div>
              <div className="relative font-semibold text-black">Living</div>
            </div>
            <img
              className="h-[49px] w-[1.5px] relative"
              loading="lazy"
              alt=""
              src="/vector-6.svg"
            />
            <div className="flex flex-col items-start justify-start gap-3">
              <div className="relative font-medium">Way to communicate</div>
              <div
                className="relative font-semibold text-black"
                style={eMailStyle}
              >
                E-mail
              </div>
            </div>
            <img
              className="h-[49px] w-[1.5px] relative"
              loading="lazy"
              alt=""
              src="/vector-7.svg"
            />
            <div className="flex flex-col items-start justify-start gap-3">
              <div className="relative font-medium">Mortgage assistance?</div>
              <div className="relative font-semibold text-black inline-block min-w-[25px]">
                Yes
              </div>
            </div>
            <img
              className="h-[49px] w-[1.5px] relative"
              alt=""
              src="/vector-8.svg"
            />
            <div className="min-w-[109px] flex flex-col items-start justify-start gap-3">
              <div className="min-w-[109px] relative font-medium inline-block">
                Negotiation and Closing?
              </div>
              <div className="self-stretch relative font-semibold text-black">
                Yes
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

BuyerAgentPage.propTypes = {
  className: PropTypes.string,
  fIndMyAgent: PropTypes.string,

  /** Style props */
  budgetTextDecoration: PropTypes.string,
  eMailTextDecoration: PropTypes.string,
};

export default BuyerAgentPage;
