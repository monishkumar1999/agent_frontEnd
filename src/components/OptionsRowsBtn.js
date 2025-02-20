import { useMemo } from "react";
import PropTypes from "prop-types";

const OptionsRowsBtn = ({
  className = "",
  negotiation,
  negotiationDisplay,
  negotiationMinWidth,
  serviceOptionsRowsHeight,
  serviceOptionsRowsFlex,
  serviceOptionsRowsMinWidth,
  serviceOptionsRowsMinHeight,
  negotiationFlex,
}) => {
  const negotiationStyle = useMemo(() => {
    return {
      display: negotiationDisplay,
      minWidth: negotiationMinWidth,
      flex: negotiationFlex,
    };
  }, [negotiationDisplay, negotiationMinWidth, negotiationFlex]);

  const serviceOptionsRowsStyle = useMemo(() => {
    return {
      height: serviceOptionsRowsHeight,
      flex: serviceOptionsRowsFlex,
      minWidth: serviceOptionsRowsMinWidth,
      minHeight: serviceOptionsRowsMinHeight,
    };
  }, [
    serviceOptionsRowsHeight,
    serviceOptionsRowsFlex,
    serviceOptionsRowsMinWidth,
    serviceOptionsRowsMinHeight,
  ]);

  return (
    <button
      className={`cursor-pointer border-[#AEAEAE] border-[1px] border-solid py-2 px-[18px] bg-white h-[42px] rounded-3xl box-border flex flex-row items-center justify-center hover:bg-gainsboro hover:border-gray-100 hover:border-[1px] hover:border-solid hover:box-border ${className}`}
      style={serviceOptionsRowsStyle}
    >
      <div
        className="relative text-lg tracking-[0.01em] font-medium font-instrument-sans text-black text-center"
        style={negotiationStyle}
      >
        {negotiation}
      </div>
    </button>
  );
};

OptionsRowsBtn.propTypes = {
  className: PropTypes.string,
  negotiation: PropTypes.string,

  /** Style props */
  negotiationDisplay: PropTypes.string,
  negotiationMinWidth: PropTypes.string,
  serviceOptionsRowsHeight: PropTypes.string,
  serviceOptionsRowsFlex: PropTypes.string,
  serviceOptionsRowsMinWidth: PropTypes.string,
  serviceOptionsRowsMinHeight: PropTypes.string,
  negotiationFlex: PropTypes.string,
};

export default OptionsRowsBtn;
