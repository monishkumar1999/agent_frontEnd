import React from "react";
import PropTypes from "prop-types";

const SuccessPage = ({ className = "", message, buttons }) => {
  return (
    <footer
      className={`bg-whitesmoke min-h-screen flex items-center justify-center overflow-hidden leading-[normal] tracking-[normal] ${className}`}
      id="Footer"
    >
      <img
        className="absolute top-[-265px] left-[-19px] w-[720.2px] h-[698.2px]"
        alt=""
        src={"/footer-wave.svg"}
      />
      <div className="flex flex-col items-center gap-4 relative">
        <div
          className={`[backdrop-filter:blur(86px)] rounded-10xl bg-gray1 border-base-white border-[5px] border-solid box-border w-[336px] flex flex-col items-end justify-start pt-[22px] px-[30px] pb-11 gap-[65px] max-w-full z-[1] ${className}`}
        >
          <div className="w-[344px] h-[500px] relative [backdrop-filter:blur(86px)] rounded-10xl bg-gray1 border-base-white border-[5px] border-solid box-border hidden max-w-full" />
          <div className="w-[241px] flex flex-row items-start justify-end py-0 px-[22px] box-border z-[unset]">
            <div className="flex-1 flex flex-col items-start justify-start z-[unset]">
              <div className="flex flex-row items-start justify-start py-0 px-2.5 z-[unset]">
                <img
                  className="h-[140px] w-[140px] relative z-[1]"
                  loading="lazy"
                  alt=""
                  src={"/images/checkmark-circle-03.png"}
                />
              </div>
              <div className=" flex flex-col items-start justify-start gap-[18px] z-[unset]">
                <div className=" flex flex-row  py-0 pl-[37px]  ">
                  <h3 className="m-0 h-[30px] relative text-[20px] font-semibold   z-[1]  ">
                    {message}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Buttons moved outside the card */}
        <div className="flex flex-col gap-3 w-[386px] max-w-full">
          {buttons.map((button, index) => (
            <button
              key={index}
              onClick={button.onClick}
              className={`w-full py-1.5 px-4 rounded-3xl transition-colors font-semibold text-base shadow-[0_1px_2px_rgba(16,24,40,0.05)] ${
                button.variant === "outline"
                  ? "border border-[#7F56D9] border-[2px]  text-[#7F56D9] hover:bg-[#6941C6] hover:text-white"
                  : "bg-[#7F56D9] text-white hover:bg-[#6941C6]"
              }`}
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
};

SuccessPage.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string.isRequired,
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
      variant: PropTypes.oneOf(["default", "outline"]),
    })
  ).isRequired,
};

export default SuccessPage;
