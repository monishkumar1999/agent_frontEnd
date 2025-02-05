import GroupComponent from "./GroupComponent";
import PropTypes from "prop-types";
// import FooterImg from "/footer-wave.svg";

const FormFooter = ({ className = "", label = "" }) => {
  return (
    <footer
      className={`bg-whitesmoke max-w-full overflow-hidden leading-[normal] tracking-[normal] ${className}`}
      id="Footer"
    >
      <img
        className="absolute top-[-121px] left-[-153px] w-[720.2px] h-[698.2px]"
        alt=""
        src={"/footer-wave.svg"}
      />
      <GroupComponent label={label} />
    </footer>
  );
};

FormFooter.propTypes = {
  className: PropTypes.string,
};

export default FormFooter;
