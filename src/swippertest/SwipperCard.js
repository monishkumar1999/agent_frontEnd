import React, { useState, useRef } from "react";
import img from "./object"; // Import agent images
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";

const SwipperCard = ({ className = "" }) => {
  const [selectedAgentIndex, setSelectedAgentIndex] = useState(0); // ✅ Track selected agent index
  const swiperRef = useRef(null); // ✅ Store Swiper instance

  // ✅ Function to update agent details on swipe
  const handleSlideChange = (swiper) => {
    setSelectedAgentIndex(swiper.activeIndex); // ✅ Sync details with active Swiper slide
  };

  // ✅ Function to update agent details on image click (Does NOT move Swiper)
  const handleAgentClick = (index) => {
    setSelectedAgentIndex(index);
  };

  return (
    <section className={`relative flex flex-col items-center pb-20 w-full text-gray-900 ${className}`}>
      <h1 className="text-4xl  font-semibold text-gray-800 text-center mb-8">
        Meet Our <span className=" text-blue-600">Top-Rated Agents</span>
      </h1>

      {/* Main Container (Centered) */}
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl gap-14 md:gap-20">
        
        {/* Left Side - Swipable Agent Image (Larger & Centered) */}
        <div className="w-80 h-80 md:w-96 md:h-96 flex-shrink-0 flex items-center justify-center">
          <Swiper
            className="swiper w-full h-full"
            modules={[EffectCards]}
            effect="cards"
            grabCursor={true}
            speed={500}
            loop={false} // ✅ No looping, just 4 images
            slidesPerView={1} // ✅ Show one image at a time
            onSwiper={(swiper) => (swiperRef.current = swiper)} // ✅ Store Swiper instance
            onSlideChange={handleSlideChange} // ✅ Sync agent details on swipe
          >
            {img.map((agent, index) => (
              <SwiperSlide
                key={index}
                className="swiper-slide flex items-center justify-center rounded-full"
                onClick={() => handleAgentClick(index)} // ✅ Clicking image updates only details
              >
                <img
                  src={agent.image}
                  alt={agent.name}
                  className="w-full h-full object-cover rounded-xl shadow-xl cursor-pointer"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Right Side - Agent Details (Perfectly Aligned) */}
        <div className="flex-1 p-8 border border-gray-300 rounded-lg shadow-lg max-w-lg text-center md:text-left">
          <h2 className="text-3xl  font-bold text-gray-900">{img[selectedAgentIndex].name}</h2>
          <p className="text-lg  text-gray-700 mt-2 font-semibold">{img[selectedAgentIndex].jobrole}</p>
          <p className="text-md  font-medium text-gray-500 mt-1">{img[selectedAgentIndex].location}</p>

          <span className="mt-5 px-5 py-2 bg-blue-600 text-white text-md rounded-md inline-block shadow-md">
            ⭐ {img[selectedAgentIndex].rating}
          </span>

          <p className="mt-6  text-gray-700 text-lg leading-relaxed">
            {img[selectedAgentIndex].description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SwipperCard;
