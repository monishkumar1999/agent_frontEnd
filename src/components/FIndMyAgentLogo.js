import PropTypes from "prop-types";

const FIndMyAgentLogo = ({ className = "" }) => {
  return (
    <a href="/">
    <img
      className={`self-stretch h-[22.4px] relative max-w-full overflow-hidden shrink-0 ${className}`}
      loading="lazy"
      alt=""
      src="/findmyagent.svg"
    />
    </a>
  );
};

FIndMyAgentLogo.propTypes = {
  className: PropTypes.string,
};

export default FIndMyAgentLogo;
