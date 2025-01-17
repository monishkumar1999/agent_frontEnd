import RegisterAndLoginBtn from "./RegisterAndLoginBtn";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const ContentBlock = ({ className = "" }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <div
      className={`flex-1 flex flex-col items-start justify-start relative gap-[42px] max-w-full text-left text-41xl text-black font-instrument-sans mq750:gap-[21px] ${className}`}
    >
      <div className="self-stretch flex flex-col items-start justify-start py-0 pl-0 pr-5 box-border gap-[15px] max-w-full">
        <h1 className="m-0 w-[483px] relative text-[60px] font-bold font-[inherit] inline-block max-w-full mq450:text-17xl mq750:text-29xl">
          More Listings, More Growth, Greater Success
        </h1>
        <div className="w-[456px] relative text-xl tracking-[0.03em] inline-block max-w-full mq450:text-base">
          Unlock new growth opportunities and elevate your business.
        </div>
      </div>
      <div className="flex flex-row items-center justify-start gap-2 text-base text-white">
        <RegisterAndLoginBtn
          frameDivBackgroundColor="#8046F1"
          register="Register"
          onClick={() => navigate("/register")} // Navigate to /login
        />
        <RegisterAndLoginBtn
          frameDivBackgroundColor="#fff"
          frameDivHeight="44px"
          frameDivBorder="1px solid #8046f1"
          register="Log In"
          registerColor="#8046f1"
          registerDisplay="inline-block"
          registerMinWidth="47px"
          onClick={() => navigate("/login")} 
        />
      </div>
      <img
        className="w-[669px] h-[550px] absolute !m-[0] top-[calc(50%_-_275px)] right-[-649px] z-[1]"
        loading="lazy"
        alt=""
        src="/group-10.svg"
      />
    </div>
  );
};

ContentBlock.propTypes = {
  className: PropTypes.string,
};

export default ContentBlock;
