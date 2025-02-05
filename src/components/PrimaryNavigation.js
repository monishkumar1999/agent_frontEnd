import PropTypes from "prop-types";

const PrimaryNavigation = ({ className = "", details }) => {
  return (
    <div
      className={`bg-[#F3EDFF] self-stretch flex flex-col items-end justify-start gap-[18px] shrink-0 max-w-full text-left text-lg text-black font-instrument-sans ${className}`}
    >
      <div className="self-stretch bg-lavender overflow-hidden flex flex-row items-start justify-end pt-[19px] px-[100px] pb-[18px] box-border max-w-full mq1410:pl-[27px] mq1410:pr-[27px] mq1410:box-border">
        <div className="w-[100%] flex flex-col items-start justify-start gap-8 max-w-full mq825:gap-4">
          <div className="self-stretch relative tracking-[0.03em] font-semibold">
            Property Details
          </div>
          <div className="self-stretch flex flex-row items-center justify-between flex-wrap content-center text-sm text-dimgray">
            <div className="flex flex-col items-start justify-start gap-3">
              <div className="relative font-medium">Property Type</div>
              <div className="relative font-semibold text-black inline-block min-w-[44px]">
                {details?.propertyType || "N/A"}
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
                {details?.bedroomCount || "N/A"}
              </div>
            </div>
            <img
              className="h-[49px] w-[1.5px] relative"
              loading="lazy"
              alt=""
              src="/vector-6.svg"
            />
            <div className="flex flex-col items-start justify-start gap-3">
              <div className="relative font-medium">Budget</div>
              <div className="relative font-semibold text-black">
                {details?.weeklyOrSaleValue || "N/A"}
              </div>
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
              <div className="relative font-semibold text-black">
                {details?.location || "N/A"}
              </div>
            </div>
            <img
              className="h-[49px] w-[1.5px] relative"
              loading="lazy"
              alt=""
              src="/vector-8.svg"
            />
            <div className="flex flex-col items-start justify-start gap-3">
              <div className="relative font-medium">When are you planning?</div>
              <div className="relative font-semibold text-black inline-block min-w-[84px]">
                {details?.selectedPlan || "N/A"}
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
              <div className="relative font-semibold text-black">
                {details?.selectedPurpose || "N/A"}
              </div>
            </div>
            <img
              className="h-[49px] w-[1.5px] relative"
              loading="lazy"
              alt=""
              src="/vector-6.svg"
            />
            <div className="flex flex-col items-start justify-start gap-3">
              <div className="relative font-medium">Way to Communicate?</div>
              <div className="relative font-semibold text-black">
                {details?.selectedUserCommunication || "N/A"}
              </div>
            </div>
            <img
              className="h-[49px] w-[1.5px] relative"
              alt=""
              src="/vector-7.svg"
            />
            <div className="flex flex-col items-start justify-start gap-3">
              <div className="relative font-medium">Mortgage Assistance?</div>
              <div className="relative font-semibold text-black inline-block min-w-[25px]">
                {details?.isLegalReady ? "Yes" : "No"}
              </div>
            </div>
            <img
              className="h-[49px] w-[1.5px] relative"
              alt=""
              src="/vector-8.svg"
            />
            <div className="min-w-[44px] flex flex-col items-start justify-start gap-3">
              <div className="min-w-[44px] relative font-medium inline-block">
                Negotiation and Closing?
              </div>
              <div className="self-stretch relative font-semibold text-black">
                {details?.isAssistance ? "Yes" : "No"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

PrimaryNavigation.propTypes = {
  className: PropTypes.string,
  details: PropTypes.object, // Define propTypes for details
};

export default PrimaryNavigation;
