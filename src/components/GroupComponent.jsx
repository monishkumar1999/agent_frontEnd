import PropTypes from "prop-types";

const GroupComponent = ({ className = "", label = "" }) => {
  return (
    <div
      className={`absolute top-[248px] left-[243px] [backdrop-filter:blur(86px)] rounded-10xl bg-gray1 border-base-white border-[5px] border-solid box-border w-[386px] flex flex-col items-end justify-start pt-[22px] px-[30px] pb-11 gap-[65px] max-w-full z-[1] ${className}`}
    >
      <div className="w-[386px] h-[500px] relative [backdrop-filter:blur(86px)] rounded-10xl bg-gray1 border-base-white border-[5px] border-solid box-border hidden max-w-full" />
      <div className="w-[289px] flex flex-row items-start justify-end py-0 px-[22px] box-border z-[unset]">
        <div className="flex-1 flex flex-col items-start justify-start z-[unset]">
          <div className="flex flex-row items-start justify-start py-0 px-2.5 z-[unset]">
            <img
              className="h-[210px] w-[210px] relative z-[1]"
              loading="lazy"
              alt=""
              src={"/group-33758.svg"}
            />
          </div>
          <div className="self-stretch flex flex-col items-start justify-start gap-[18px] z-[unset]">
            <div className="justify-center self-stretch flex flex-row items-start justify-start py-0 pl-[37px] pr-9 z-[unset]">
              <h3 className=" m-0 h-[30px] relative text-inherit font-semibold font-[inherit] inline-block z-[1] mq450:text-lgi">
                {label}
              </h3>
            </div>
            <div className="self-stretch h-6 relative rounded-29xl [background:linear-gradient(90.07deg,_rgba(217,_184,_151,_0.24),_rgba(217,_159,_151,_0.16))] z-[1]" />
          </div>
        </div>
      </div>
      <div className="w-[312px] h-[74px] relative [backdrop-filter:blur(86px)] rounded-mid bg-base-white border-seashell border-[4px] border-solid box-border z-[1]" />
    </div>
  );
};

GroupComponent.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string, // Prop for the label
};

export default GroupComponent;
