import React from "react";
import img from "./object"; // Ensure this is an array of agent objects
import { AiFillStar } from "react-icons/ai";
import Approved from "../pages/Approved";
const SwipperCard = ({ className = "" }) => {
  return (
    <section className={`w-full flex flex-col items-center py-10 ${className}`}>
       <h1 className="text-2xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-2  py-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-fade-in ">
       Meet Our Top-Rated Agents
          </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 px-4 max-w-6xl w-full">
        {img.map((agent, index) => (
          <div
            key={index}
            className="flex items-center bg-white rounded-xl shadow-md p-4 w-full max-w-lg hover:shadow-lg transition font-sans"
          >

            
            {/* Image */}
            <img
              src={agent.image}
              alt={agent.name}
              className="w-36 h-36 rounded-lg object-cover mr-4"
            />

            {/* Info */}
            <div className="flex flex-col justify-between h-full w-full">
              {/* Name and Rating */}
              <div className="flex justify-between items-start">
                <h2 className="text-lg font-bold text-gray-900 font-sans">{agent.name}</h2>
                <div className="flex items-center text-yellow-500 text-sm font-semibold">
                 
                <AiFillStar className="ml-1 text-base" />
                  {agent.rating}
                </div>
              </div>

              {/* Role and Location */}
              {/* <p className="text-sm text-gray-500 mt-1">{agent.jobrole} at {agent.location}</p> */}
              <p className="text-sm text-gray-700 mt-2 line-clamp-2 font-sans">{agent.description}</p>
              {/* Description */}
              {/* <p className="text-sm text-gray-700 mt-2 line-clamp-2">{agent.description}</p> */}

              {/* Role Tag + Icons */}
              <div className="flex justify-between items-center mt-3">
                <span className="text-purple-600 text-sm font-semibold">{agent.location}</span>
               
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};

export default SwipperCard;
