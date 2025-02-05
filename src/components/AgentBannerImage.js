import PropTypes from "prop-types";

const AgentBannerImage = ({ className = "" }) => {
  return (
    <img
      className={`h-full w-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px] rounded-xl max-w-full overflow-hidden max-h-full object-cover ${className}`}
      alt=""
      src="/image@2x.png"
    />
  );
};

AgentBannerImage.propTypes = {
  className: PropTypes.string,
};

export default AgentBannerImage;
