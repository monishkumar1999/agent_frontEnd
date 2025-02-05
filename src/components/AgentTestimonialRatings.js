import { Star } from "lucide-react";
import PropTypes from "prop-types";

const AgentTestimonialRatings = ({ className = "" }) => {
  return (
    <div
      className={`flex flex-row items-start justify-start gap-2.5 ${className}`}
    >
      <Star fill="#8046F1" color="#8046F1" size={20} />
      <Star fill="#8046F1" color="#8046F1" size={20} />
      <Star fill="#8046F1" color="#8046F1" size={20} />
      <Star fill="#D8D8D8" color="#D8D8D8" size={20} />
      <Star fill="#D8D8D8" color="#D8D8D8" size={20} />
    </div>
  );
};

AgentTestimonialRatings.propTypes = {
  className: PropTypes.string,
};

export default AgentTestimonialRatings;
