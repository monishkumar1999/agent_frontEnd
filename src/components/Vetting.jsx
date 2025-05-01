import PropTypes from "prop-types";

const Vetting = ({ className = "", image1 }) => {
  return (
    <section className={`relative w-full min-h-[700px] overflow-hidden py-20 px-8  rounded-3xl ${className}`}>
      
      {/* Blurred Circle Background */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[900px] h-[900px] opacity-20 blur-3xl rounded-full z-0"></div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto">
        
        {/* LEFT: Testimonial Cards */}
        <div className="flex flex-col gap-8 items-center lg:items-start relative">
          
          {/* Top Testimonial */}
          <div className="bg-white bg-opacity-80 backdrop-blur-md p-6 rounded-2xl shadow-lg w-80">
            <div className="flex flex-col items-center">
              <img src={image1} alt="Carolyn Ortiz" className="w-16 h-16 rounded-full border-4 border-yellow-300 shadow-md" />
            </div>
            <p className="text-gray-700 text-center mt-4 italic">
              <span className="text-2xl font-serif">“</span> Moonlight newspaper up its enjoyment agreeable depending. Timed voice share led him to widen noisy young. <span className="text-2xl font-serif">”</span>
            </p>
            <h3 className="text-center font-bold mt-4 text-gray-900">Carolyn Ortiz</h3>
            {/* Star Rating */}
            <div className="flex justify-center mt-2 text-yellow-400 text-xl">
              ★★★★★
            </div>
          </div>

          {/* Verified Mentors Box */}
          <div className="absolute -top-10 left-72 bg-white bg-opacity-90 backdrop-blur-md p-5 rounded-xl shadow-lg w-64">
            <h4 className="font-semibold text-gray-800 mb-4 text-sm">100+ Verified Mentors</h4>
            <div className="space-y-4">
              {[
                { img: "/images/person3.jpg", name: "Lori Stevens", role: "Tutor of Physics" },
                { img: "/images/person4.jpg", name: "Billy Vasquez", role: "Tutor of Chemistry" },
                { img: "/images/person2.jpg", name: "Larry Lawson", role: "Tutor of Technology" },
              ].map((agent, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <img src={agent.img} alt={agent.name} className="w-10 h-10 rounded-full" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{agent.name}</p>
                    <p className="text-xs text-gray-500">{agent.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Testimonial */}
          <div className="bg-white bg-opacity-80 backdrop-blur-md p-6 rounded-2xl shadow-lg w-80 mt-20">
            <div className="flex flex-col items-center">
              <img src="/images/Agentpng.png" alt="Jonathan" className="w-16 h-16 rounded-full border-4 border-blue-300 shadow-md" />
            </div>
            <p className="text-gray-700 text-center mt-4 italic">
              <span className="text-2xl font-serif">“</span> At weddings believed laughing although the Moonlight newspaper up its enjoyment agreeable. <span className="text-2xl font-serif">”</span>
            </p>
            <h3 className="text-center font-bold mt-4 text-gray-900">Jonathan</h3>
          </div>

        </div>

        {/* RIGHT: Title + Description */}
        <div className="lg:w-2/5 flex flex-col items-start mt-12 lg:mt-0 text-left">
          <h1 className="text-4xl font-extrabold text-gray-900 leading-snug">
            Hear From Our Happy Clients
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            Supposing so be resolving breakfast am or perfectly. It drew a hill from me. Departure defective arranging rapturous did believe him all had supported. Picture for attempt joy excited ten carried manners talking how.
          </p>
          <button className="mt-8 px-6 py-3 bg-gradient-to-r from-blue-500 to-pink-500 text-white font-bold rounded-full hover:bg-yellow-500 transition-all">
            Join Our Community
          </button>
        </div>

      </div>

    </section>
  );
};

Vetting.propTypes = {
  className: PropTypes.string,
  image1: PropTypes.string,
};

export default Vetting;
