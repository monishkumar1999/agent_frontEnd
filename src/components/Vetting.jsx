import PropTypes from "prop-types";

const Vetting = ({ className = "", image1 }) => {
  return (
    <section
      className={`relative w-full h-[600px] overflow-hidden rounded-3xl ${className}`}
    >
      <div className="relative w-full flex flex-col lg:flex-row items-center justify-between px-6 lg:px-16 py-20">
        {/* Left Section - Testimonial Cards and Agents */}
        <div className="relative flex flex-col items-center lg:items-start">
        
        {/* First Testimonial Card */}
        <div className="bg-white p-6 rounded-2xl shadow-lg w-80 relative z-10">
          <div className="flex flex-col items-center">
            <img
              src={image1} // Replace with actual image prop
              alt="Carolyn Ortiz"
              className="w-16 h-16 rounded-full border-2 border-gray-300"
            />
          </div>
          <p className="text-gray-600 text-center mt-4">
            <span className="text-2xl font-serif">“</span> Moonlight newspaper up its enjoyment agreeable depending. Timed voice share led him to widen noisy young. At weddings believed laughing. <span className="text-2xl font-serif">”</span>
          </p>
          <h3 className="text-center font-bold mt-2">Carolyn Ortiz</h3>
          {/* Star Ratings */}
          <div className="flex justify-center mt-2">
            <span className="text-yellow-400 text-lg">★★★★★</span>
          </div>
        </div>

        {/* Agents Card (Smaller & Higher) */}
        <div className="bg-white shadow-md rounded-lg p-3 w-64 absolute -top-10 left-80">
          <h3 className="font-semibold text-gray-900 mb-3 text-sm">
            100+ Verified Mentors
          </h3>
          <div className="space-y-2">
            {[{
              img: "https://via.placeholder.com/40",
              name: "Lori Stevens",
              role: "Tutor of physics"
            }, {
              img: "https://via.placeholder.com/40",
              name: "Billy Vasquez",
              role: "Tutor of chemistry"
            }, {
              img: "https://via.placeholder.com/40",
              name: "Larry Lawson",
              role: "Tutor of technology"
            }].map((agent, index) => (
              <div key={index} className="flex items-center space-x-3">
                <img src={agent.img} alt={agent.name} className="w-8 h-8 rounded-full" />
                <div>
                  <h4 className="text-xs font-semibold text-gray-800">{agent.name}</h4>
                  <p className="text-xs text-gray-500">{agent.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Second Testimonial Card (Below Agents) */}
        <div className="bg-white p-6 rounded-2xl shadow-lg w-80 mt-6 relative z-0 absolute- left-60">
          <div className="flex flex-col items-center">
            <img
              src={Image} // Replace with another image prop
              alt="Jonathan"
              className="w-16 h-16 rounded-full border-2 border-gray-300"
            />
          </div>
          <p className="text-gray-600 text-center mt-4">
            <span className="text-2xl font-serif">“</span> At weddings believed laughing although the Moonlight newspaper up its enjoyment agreeable. <span className="text-2xl font-serif">”</span>
          </p>
          <h3 className="text-center font-bold mt-2">Jonathan</h3>
        </div>        
            {/* Right Section - Title and Description */}
            <div className="lg:w-1/3 flex flex-col items-start">
              <h1 className="text-3xl md:text-3xl font-semibold text-gray-900">
                Some valuable feedback from our students
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                Supposing so be resolving breakfast am or perfectly. It drew a hill from me. Valley by oh twenty direct me so. Departure defective arranging rapturous did believe him all had supported. Family months lasted simple set nature vulgar him. Picture for attempt joy excited ten carried manners talking how.
              </p>
            </div>
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