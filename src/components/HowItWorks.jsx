import React from "react";
import { Search, Users, Handshake } from "lucide-react";

function HowItWorks({ className = "", image }) {
  return (
    <section
      className={`relative w-full h-[600px] overflow-hidden rounded-3xl ${className}`}
    >
      <img
        src={image}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white">
        <h1 className="text-5xl font-bold mb-12">How does it work?</h1>
        <div className="flex justify-between items-center w-full max-w-4xl mb-12 relative">
          <Step
            icon={<Search size={48} />}
            text="Search by you property info"
          />
          <Step icon={<Users size={48} />} text="Compare your local agents" />
          <Step
            icon={<Handshake size={48} />}
            text="Connect with agents you choose"
          />
          <div
            className="w-[90%] absolute top-[35%] left-[37px] right-0 h-0.5 bg-white"
            style={{ transform: "translateY(-50%)" }}
          />
        </div>
        {/* <button className=" bg-white text-purple-600 font-semibold py-3 px-6 rounded-full hover:bg-gray-100 transition-colors">
          Get Started
        </button> */}
      </div>
    </section>
  );
}

function Step({ icon, text }) {
  return (
    <div className="flex flex-col items-center z-10">
      <div className="bg-white rounded-full p-6 mb-4">
        <div className="text-black">{icon}</div>
      </div>
      <p className="text-center max-w-[150px]">{text}</p>
    </div>
  );
}

export default HowItWorks;
