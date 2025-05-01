import NavLink from "./NavLink";
import PropTypes from "prop-types";

const PageNavigation = ({ className = "" }) => {
  return (
    <footer
      className={`ml-[-52px] w-[1449px] bg-lavender flex flex-col items-start justify-start pt-[70px] pb-[151px] pl-[85px] pr-[5px] box-border relative gap-[102px] max-w-[108%] text-center text-xl text-black font-instrument-sans mq450:gap-[25px] mq450:pl-5 mq450:box-border mq750:gap-[51px] mq750:pl-[42px] mq750:pt-[45px] mq750:pb-[98px] mq750:box-border ${className}`}
    >
      <div className="flex flex-row items-start justify-start flex-wrap content-start gap-[121px] max-w-full mq450:gap-[15px] mq750:gap-[30px] mq1275:gap-[60px]">
        <div className="w-[304px] flex flex-col items-start justify-start">
          <img
            className="w-[252px] h-[38px] relative"
            alt=""
            src="/findmyagent-1.svg"
          />
        </div>
        <div className="flex-1 flex flex-row items-start justify-start gap-[119px] min-w-[230px] max-w-full mq450:gap-[59px] mq450:flex-wrap">
          <div className="flex flex-col items-start justify-start gap-[22px]">
            <NavLink
              listing="Categories"
              listingMinWidth="unset"
              listingDisplay="unset"
              listingTextDecoration="unset"
              listingFontSize="20px"
              listingTextAlign="center"
              listingAlignSelf="stretch"
            />
            <NavLink
              listing="Reviews"
              listingMinWidth="unset"
              listingDisplay="unset"
              listingTextDecoration="unset"
              listingFontSize="20px"
              listingTextAlign="left"
              listingAlignSelf="unset"
            />
            <NavLink
              listing="Listings"
              listingMinWidth="76px"
              listingDisplay="inline-block"
              listingTextDecoration="unset"
              listingFontSize="20px"
              listingTextAlign="left"
              listingAlignSelf="unset"
            />
            <NavLink
              listing="Contact Us"
              listingMinWidth="107px"
              listingDisplay="inline-block"
              listingTextDecoration="unset"
              listingFontSize="20px"
              listingTextAlign="center"
              listingAlignSelf="stretch"
            />
          </div>
          <div className="flex-1 flex flex-col items-start justify-start gap-[22px] min-w-[84px] text-left">
            <NavLink
              listing="About Us"
              listingMinWidth="unset"
              listingDisplay="unset"
              listingTextDecoration="unset"
              listingFontSize="20px"
              listingTextAlign="left"
              listingAlignSelf="stretch"
            />
            <NavLink
              listing="Awards"
              listingMinWidth="unset"
              listingDisplay="unset"
              listingTextDecoration="unset"
              listingFontSize="20px"
              listingTextAlign="left"
              listingAlignSelf="stretch"
            />
            <NavLink
              listing="Useful Sites"
              listingMinWidth="unset"
              listingDisplay="unset"
              listingTextDecoration="unset"
              listingFontSize="20px"
              listingTextAlign="left"
              listingAlignSelf="stretch"
            />
            <NavLink
              listing="Privacy Policy"
              listingMinWidth="unset"
              listingDisplay="unset"
              listingTextDecoration="unset"
              listingFontSize="20px"
              listingTextAlign="left"
              listingAlignSelf="unset"
            />
          </div>
        </div>
        <div className="flex-1 flex flex-col items-start justify-start gap-[22px] min-w-[226px] max-w-full text-left">
          <div className="relative tracking-[0.01em] font-medium mq450:text-base">
            27th Street of New Town, Digital Villa
          </div>
          <div className="relative tracking-[0.01em] font-medium mq450:text-base">
            010-020-0340
          </div>
          <div className="relative tracking-[0.01em] font-medium mq450:text-base">
            090-080-0760
          </div>
        </div>
      </div>
      <div className="self-stretch flex flex-row items-start justify-end max-w-full text-sm">
        <div className="h-[46px] w-[1279px] flex flex-col items-start justify-start gap-[29px] max-w-full">
          <img
            className="self-stretch relative max-w-full overflow-hidden max-h-full"
            loading="lazy"
            alt=""
            src="/vector-4.svg"
          />
          <div className="w-[1121px] flex flex-row items-start justify-start py-0 pl-[326px] pr-[325px] box-border max-w-full shrink-0 mq450:pl-5 mq450:pr-5 mq450:box-border mq750:pl-[81px] mq750:pr-[81px] mq750:box-border mq1275:pl-[163px] mq1275:pr-[162px] mq1275:box-border">
            <div className="flex-1 relative tracking-[0.01em]">
              Copyright © 2024 BuyersFirst
              ., Ltd. All Rights Reserved.
              BuyersFirst

            </div>
          </div>
        </div>
      </div>
      <div className="w-[728px] h-[728px] absolute !m-[0] right-[-291px] bottom-[-668.51px] rounded-[50%] bg-slateblue [transform:_rotate(-40.5deg)] [transform-origin:0_0] opacity-[0.2] z-[1]" />
      <div className="w-[728px] h-[728px] absolute !m-[0] bottom-[-687.51px] left-[-410px] rounded-[50%] bg-slateblue [transform:_rotate(-40.5deg)] [transform-origin:0_0] opacity-[0.2] z-[1]" />
    </footer>
  );
};

PageNavigation.propTypes = {
  className: PropTypes.string,
};

export default PageNavigation;
