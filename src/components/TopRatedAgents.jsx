import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Mousewheel } from "swiper/modules";

const agents = [
  {
    image: "/images/Agentpng.png",
    name: "Alex",
    description:
      "Alex is a seasoned real estate agent passionate about helping clients find their dream homes. With a keen eye for detail and a deep understanding of the market, he guides clients through home-buying, from property search to closing.",
    rating: "4.9 (202 Reviews)",
    location: "Manchester",
    jobrole: "Real Estate Market Advisor at Greenville",
  },
  {
    image: "/images/person2.jpg",
    name: "Sarah",
    description:
      "Sarah leverages the latest technology to provide a seamless home-buying experience. She uses virtual tours, advanced search tools, and social media to help clients find their perfect home.",
    rating: "4.9 (238 Reviews)",
    location: "Liverpool",
    jobrole: "Property Research Specialist at BuyerNest",
  },
  {
    image: "/images/person3.jpg",
    name: "David",
    description:
      "David is a local expert with an in-depth understanding of neighborhoods and communities. He helps clients find homes that match their lifestyles and preferences.",
    rating: "4.8 (241 Reviews)",
    location: "North Yorkshire",
    jobrole: "Advocate for Buyer’s Interests at NextStep Realty",
  },
  {
    image: "/images/person4.jpg",
    name: "Emily",
    description:
      "Emily specializes in helping first-time homebuyers navigate the complex process of purchasing a home. She provides expert advice on budgeting, financing, and negotiating.",
    rating: "4.9 (190 Reviews)",
    location: "Cornwall",
    jobrole: "Legal and Compliance Advisor at HavenHunters",
  },
];

const TopRatedAgents = ({ className = "" }) => {
  const [selectedAgentIndex, setSelectedAgentIndex] = useState(0);
  const selectedAgent = agents[selectedAgentIndex];

  return (
    <section
      className={`relative flex flex-col items-center pb-20 max-w-full text-gray-900 ${className}`}
      style={{
        background: "#F8F9FA",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <h1 className="text-4xl font-semibold text-gray-800 text-center mb-6">
        Meet Our <span className="text-blue-600">Top-Rated Agents</span>
      </h1>

      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl gap-10">
        <div className="w-full max-w-xs">
          <Swiper
            grabCursor={true}
            modules={[Mousewheel]}
            loop={true}
            mousewheel={{ invert: false }}
            onSlideChange={(swiper) => setSelectedAgentIndex(swiper.activeIndex)}
          >
            {agents.map((agent, index) => (
              <SwiperSlide key={index}>
                <div
                  className="w-64 h-64 bg-cover bg-center rounded-lg"
                  style={{
                    backgroundImage: `url('${agent.image}')`,
                    border: "1px solid #e5e7eb",
                    boxShadow: "none",
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="max-w-lg text-left p-6 bg-white border border-gray-200 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-900">{selectedAgent.name}</h2>
          <p className="text-sm text-gray-600 mt-1">{selectedAgent.jobrole}</p>
          <p className="text-sm font-light text-gray-500 mt-1">{selectedAgent.location}</p>

          <span className="mt-3 px-3 py-1 bg-blue-600 text-white text-xs rounded-md inline-block">
            ⭐ {selectedAgent.rating}
          </span>

          <p className="mt-4 text-gray-700 text-sm leading-relaxed">
            {selectedAgent.description}
          </p>
        </div>
      </div>
      
    </section>


  );
};

TopRatedAgents.propTypes = {
  className: PropTypes.string,
};

export default TopRatedAgents;
