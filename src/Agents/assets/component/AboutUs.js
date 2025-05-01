import React from "react";

const AboutUs = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100 p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-2xl w-full text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">About Us</h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          We are dedicated to connecting agents with potential buyers, making property transactions 
          seamless, efficient, and transparent. Our mission is to empower real estate professionals 
          with modern tools and trusted networks to close deals faster and better.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
