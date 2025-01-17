import { useMemo } from "react";
import PropTypes from "prop-types";

const Footer = ({
  className = "",
  fIndMyAgent,
  privacyPolicyTextDecoration,
  copyrightIcon,
}) => {
  const privacyPolicyStyle = useMemo(() => {
    return {
      textDecoration: privacyPolicyTextDecoration,
    };
  }, [privacyPolicyTextDecoration]);

  return (
    <footer
      className={`mr-[-21px]  bg-lavender-100 flex flex-col items-start justify-start pt-[70px] pb-[151px] pl-[85px] pr-[5px] box-border relative gap-[102px]  text-center text-xl text-black font-instrument-sans mq800:gap-[51px] mq800:pl-[42px] mq800:pt-[45px] mq800:pb-[98px] mq800:box-border mq450:gap-[25px] mq450:pl-5 mq450:box-border ${className} w-screen`}
    >
      <img
        src="images/footerBg.png"
        alt="Background"
        className="absolute inset-0 w-full h-full "
      />
      <div className="flex flex-row items-start justify-center flex-wrap content-start gap-[121px] max-w-full mq800:gap-[30px] mq450:gap-[15px] mq1350:gap-[60px]">
        <div className="w-[304px] flex flex-col items-start justify-start">
          <img
            className="w-[252px] h-[38px] relative"
            alt=""
            src={fIndMyAgent}
          />
        </div>
        <div className="flex-1 flex flex-row items-start justify-start gap-[119px] min-w-[230px] max-w-full mq450:gap-[59px] mq450:flex-wrap">
          <div className="flex flex-col items-start justify-start gap-[22px]">
            <div className="self-stretch relative tracking-[0.01em] font-medium mq450:text-base">
              Categories
            </div>
            <div className="relative tracking-[0.01em] font-medium text-left mq450:text-base">
              Reviews
            </div>
            <div className="relative tracking-[0.01em] font-medium text-left inline-block min-w-[76px] mq450:text-base">
              Listings
            </div>
            <div className="self-stretch relative tracking-[0.01em] font-medium inline-block min-w-[107px] mq450:text-base">
              Contact Us
            </div>
          </div>
          <div className="flex-1 flex flex-col items-start justify-start gap-[22px] min-w-[84px] text-left">
            <div className="self-stretch relative tracking-[0.01em] font-medium mq450:text-base">
              About Us
            </div>
            <div className="self-stretch relative tracking-[0.01em] font-medium mq450:text-base">
              Awards
            </div>
            <div className="self-stretch relative tracking-[0.01em] font-medium mq450:text-base">
              Useful Sites
            </div>
            <a
              className="[text-decoration:none] relative tracking-[0.12px] font-medium text-[inherit] mq450:text-base"
              style={privacyPolicyStyle}
            >
              Privacy Policy
            </a>
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
      <div class="w-full flex justify-center items-center z-[1]">
        <p class="tracking-[0.01em] text-center">
          Copyright © 2024 FindMyAgent., Ltd. All Rights Reserved. FindMyAgent
        </p>
      </div>

      {/* <div className="self-stretch flex flex-row  justify-end max-w-full text-sm">
        <div className="h-[46px] w-[1279px] flex flex-col  justify-start gap-[29px] max-w-full">
          <img
            className="self-stretch relative max-w-full overflow-hidden max-h-full"
            loading="lazy"
            alt=""
            src={copyrightIcon}
          />
          <div className=" flex flex-row  justify-start  box-border max-w-full shrink-0 mq800:pl-[81px] mq800:pr-[81px] mq800:box-border mq450:pl-5 mq450:pr-5 mq450:box-border mq1125:pl-[163px] mq1125:pr-[162px] mq1125:box-border">
            <div className="flex-1 relative tracking-[0.01em]">
              Copyright © 2024 FindMyAgent., Ltd. All Rights Reserved.
              FindMyAgent
            </div>
          </div>
        </div>
      </div> */}
      {/* <div className="w-[728px] h-[728px] absolute !m-[0] right-[-291px] bottom-[-668.51px] rounded-[50%] bg-slateblue-200 [transform:_rotate(-40.5deg)] [transform-origin:0_0] opacity-[0.2] z-[1]" />
      <div className="w-[728px] h-[728px] absolute !m-[0] bottom-[-687.51px] left-[-410px] rounded-[50%] bg-slateblue-200 [transform:_rotate(-40.5deg)] [transform-origin:0_0] opacity-[0.2] z-[1]" /> */}
    </footer>
  );
};

Footer.propTypes = {
  className: PropTypes.string,
  fIndMyAgent: PropTypes.string,
  copyrightIcon: PropTypes.string,

  /** Style props */
  privacyPolicyTextDecoration: PropTypes.string,
};

export default Footer;
