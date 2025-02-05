import { useMemo } from "react";
import PropTypes from "prop-types";

const RegisterAndLoginBtn = ({
  className = "",
  frameDivBackgroundColor,
  frameDivHeight,
  frameDivBorder,
  register,
  registerColor,
  registerDisplay,
  registerMinWidth,
  onClick, // Allow custom onClick handler
}) => {
  const frameDivStyle = useMemo(() => {
    return {
      backgroundColor: frameDivBackgroundColor,
      height: frameDivHeight,
      border: frameDivBorder,
      cursor: "pointer", // Add cursor pointer style here
    };
  }, [frameDivBackgroundColor, frameDivHeight, frameDivBorder]);

  const registerStyle = useMemo(() => {
    return {
      color: registerColor,
      display: registerDisplay,
      minWidth: registerMinWidth,
    };
  }, [registerColor, registerDisplay, registerMinWidth]);

  return (
    <div
      className={`rounded-3xl bg-blueviolet flex flex-row items-center justify-center py-3 px-7 text-left text-base text-white font-instrument-sans ${className}`}
      style={frameDivStyle}
      onClick={onClick} // Attach the onClick handler
    >
      <div className="relative font-semibold" style={registerStyle}>
        {register}
      </div>
    </div>
  );
};

RegisterAndLoginBtn.propTypes = {
  className: PropTypes.string,
  register: PropTypes.string,

  /** Style props */
  frameDivBackgroundColor: PropTypes.string,
  frameDivHeight: PropTypes.string,
  frameDivBorder: PropTypes.string,
  registerColor: PropTypes.string,
  registerDisplay: PropTypes.string,
  registerMinWidth: PropTypes.string,

  /** Custom onClick handler */
  onClick: PropTypes.func,
};

export default RegisterAndLoginBtn;
