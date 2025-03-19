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
      <div className="relative w-full flex flex-col lg:flex-row items-center justify-center bg-lavender-100 rounded-3xl overflow-hidden px-6 lg:px-16 py-20">
      {/* Left Section - Title & Text */}
      <div className="lg:w-1/2 text-center lg:text-left">
        <h1 className="text-3xl md:text-5xl font-semibold font-athiban text-purple-700">
          Only with us
        </h1>
        <p className="mt-6 text-lg md:text-xl text-black leading-relaxed font-athiban">
          Every agent on our platform is thoroughly vetted, bringing you{" "}
          <span className="font-semibold">expert guidance</span> and{" "}
          <span className="font-semibold">personalized support</span> for a smooth home-buying experience.
        </p>
      </div>

      {/* Right Section - Images & Background Elements */}
      <div className="relative w-full lg:w-1/2 flex flex-col items-center lg:items-end mt-10 lg:mt-0">
        {/* Floating Images */}
        <img
          className="w-40 md:w-52 lg:w-72 object-cover rounded-xl"
          alt="FindMyAgent"
          src={fIndMyAgent}
        />
        <img
          className="w-64 md:w-80 lg:w-96 object-cover rounded-xl mt-6"
          alt="Main Image"
          src={image}
        />
        <img
          className="absolute top-10 right-0 w-24 md:w-32 lg:w-48 object-cover rounded-full"
          alt="Supporting Image"
          src={image2}
        />
        <img
          className="absolute bottom-10 left-0 w-44 md:w-56 lg:w-80 object-cover rounded-xl"
          alt="Secondary Image"
          src={image1}
        />

        {/* Decorative Circle */}
        <div className="absolute -bottom-20 -left-20 w-80 h-80 lg:w-96 lg:h-96 bg-slateblue-200 rounded-full opacity-50 -z-10"></div>
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
