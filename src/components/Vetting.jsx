import PropTypes from "prop-types";

const Vetting = ({ className = "", image, fIndMyAgent, image1, image2 }) => {
  return (
    <section
      className={`relative w-full h-[600px] overflow-hidden rounded-3xl ${className}`}
    >
      <img
        src="/images/middleBg.png"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="flex-1 rounded-15xl bg-lavender-100 overflow-hidden flex flex-row items-start justify-start pt-28 px-[63px] pb-[264px] box-border relative max-w-full mq800:pt-[73px] mq800:px-[31px] mq800:pb-[172px] mq800:box-border">
        <h1
          style={{ color: "#8046F1" }}
          className="m-0 w-[653px] relative text-[56px]  font-semibold font-[inherit] inline-block shrink-0 max-w-full mq800:text-26xl mq450:text-15xl"
        >
          Only with us
        </h1>
        <div className="w-[581px] flex flex-col items-start justify-start pt-[83px] px-0 pb-0 box-border max-w-full ml-[-652px] text-xl text-black">
          <div className="relative tracking-[0.03em] leading-[32px] mq450:text-base mq450:leading-[26px]">
            <span>{`Every agent on our platform is thoroughly vetted, bringing you `}</span>
            <span className="font-medium">expert guidance</span>
            <span>{` and `}</span>
            <span className="font-medium">personalized support</span>
            <span> for a smooth home-buying experience.</span>
          </div>
        </div>
        <div className="h-[1149.3px] w-[1424px] absolute !m-[0] bottom-[-651.3px] left-[-17px]">
          <img
            className="absolute top-[0px] left-[867px] rounded-xl w-[395px] h-[553px] object-cover"
            alt=""
            src={image}
          />
          <img
            className="absolute top-[0px] left-[80px] w-[199px] h-[30px]"
            alt=""
            src={fIndMyAgent}
          />
          <div className="absolute top-[595.51px] left-[-101px] rounded-[50%] bg-slateblue-100 w-[728px] h-[728px] [transform:_rotate(-40.5deg)] [transform-origin:0_0] z-[1]" />
          <img
            className="absolute top-[202px] left-[665px] rounded-xl w-[362px] h-[271px] object-cover z-[2]"
            alt=""
            src={image1}
          />
          <img
            className="absolute top-[26px] left-[1153px] rounded-1981xl w-[271px] h-[271px] object-cover z-[1]"
            alt=""
            src={image2}
          />
        </div>
      </div>
    </section>
  );
};

Vetting.propTypes = {
  className: PropTypes.string,
  image: PropTypes.string,
  fIndMyAgent: PropTypes.string,
  image1: PropTypes.string,
  image2: PropTypes.string,
};

export default Vetting;
