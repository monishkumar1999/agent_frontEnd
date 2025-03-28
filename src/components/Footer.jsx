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
      className={`mr-[-21px] bg-lavender-100 flex flex-col items-start justify-start pt-[30px] pb-[30px] pl-[20px] pr-[20px] box-border relative gap-[40px] text-center text-sm text-black font-instrument-sans mq800:gap-[25px] mq800:pl-[20px] mq800:pt-[20px] mq800:pb-[30px] mq800:box-border mq450:gap-[15px] mq450:pl-5 mq450:box-border ${className} w-screen h-[20vh]`} // Reduced height to 20% of the viewport height
    >
      <img
        src="images/footerBg.png"
        alt="Background"
        className="absolute inset-0 w-full h-96 lg:h-56"
      />
      <div className="flex flex-row items-start justify-center flex-wrap content-start gap-[60px] max-w-full mq800:gap-[20px] mq450:gap-[10px]">
        <div className="w-[200px] flex flex-col items-start justify-start">
          <img
            className="w-[180px] h-[30px] relative"
            alt=""
            src={fIndMyAgent}
          />
        </div>

        {/* Categories, Reviews, Listings, Contact Us */}
        <div className="flex flex-col items-start justify-start gap-[12px] min-w-[120px] text-left">
          <div className="self-stretch relative tracking-[0.01em] font-athiban font-medium text-xs mq450:text-xs">
            Categories
          </div>
          <div className="relative tracking-[0.01em] font-athiban font-medium text-xs text-left mq450:text-xs">
            Reviews
          </div>
          <div className="relative tracking-[0.01em] font-athiban font-medium text-xs text-left inline-block min-w-[60px] mq450:text-xs">
            Listings
          </div>
          <div className="self-stretch relative tracking-[0.01em] font-athiban font-medium text-xs inline-block min-w-[80px] mq450:text-xs">
            Contact Us
          </div>
        </div>

        {/* About Us, Awards, Useful Sites, Privacy Policy */}
        <div className="flex flex-col items-start justify-start gap-[12px] min-w-[120px] text-left">
          <div className="self-stretch relative tracking-[0.01em] font-athiban font-medium text-xs mq450:text-xs">
            About Us
          </div>
          <div className="self-stretch relative tracking-[0.01em] font-athiban font-medium text-xs mq450:text-xs">
            Awards
          </div>
          <div className="self-stretch relative tracking-[0.01em] font-athiban font-medium text-xs mq450:text-xs">
            Useful Sites
          </div>
          <a
            className="[text-decoration:none] relative tracking-[0.12px] font-athiban font-medium text-[inherit] mq450:text-xs"
            style={privacyPolicyStyle}
          >
            Privacy Policy
          </a>
        </div>

        {/* Contact details */}
        <div className="flex-1 flex flex-col items-start justify-start gap-[12px] min-w-[180px] max-w-full text-left">
          <div className="relative tracking-[0.01em] font-athiban font-medium text-xs mq450:text-xs">
            27th Street of New Town, Digital Villa
          </div>
          <div className="relative tracking-[0.01em] font-athiban font-medium text-xs mq450:text-xs">
            010-020-0340
          </div>
          <div className="relative tracking-[0.01em] font-athiban font-medium text-xs mq450:text-xs">
            090-080-0760
          </div>
        </div>
      </div>

      {/* Footer copyright */}
      <div className="w-full flex justify-center items-center z-[1]">
        <p className="tracking-[0.01em] font-athiban text-xs text-center">
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
