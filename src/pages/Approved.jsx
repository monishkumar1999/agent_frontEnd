import React from 'react';
import Marquee from 'react-fast-marquee';
import { FaStar, FaStarHalfAlt, FaQuoteLeft } from 'react-icons/fa';

function Approved() {
  const reviews = [
    {
      name: 'Sophie T.',
      review: 'Helped me buy my first home with ease!',
      image: 'https://randomuser.me/api/portraits/women/1.jpg',
      rating: 5,
    },
    {
      name: 'Liam D.',
      review: 'Excellent customer service and quick process.',
      image: 'https://randomuser.me/api/portraits/men/2.jpg',
      rating: 4.5,
    },
    {
      name: 'Ava R.',
      review: 'Very professional agents, loved the experience!',
      image: 'https://randomuser.me/api/portraits/women/3.jpg',
      rating: 5,
    },
    {
      name: 'Noah K.',
      review: 'Highly recommend for real estate in Australia.',
      image: 'https://randomuser.me/api/portraits/men/4.jpg',
      rating: 4.5,
    },
  ];

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;

    return (
      <div className="flex gap-[2px]">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={i} className="text-yellow-400 text-sm" />
        ))}
        {halfStar && <FaStarHalfAlt className="text-yellow-400 text-sm" />}
      </div>
    );
  };

  return (
    <section className="w-full py-8 m-4">
      <Marquee gradient={false} speed={40} pauseOnHover={true} className="gap-10">
        {reviews.map((r, index) => (
          <div
            key={index}
            className="flex items-start gap-6 bg-white rounded-3xl px-8 py-6  hover:shadow-2xl transition-shadow duration-300 mx-4 min-w-[350px] max-w-[500px]"
          >
            <img
              src={r.image}
              alt={r.name}
              className="h-16 w-16 rounded-full object-cover border-2 border-blue-200"
            />
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <span className="text-lg font-semibold text-gray-800">{r.name}</span>
                {renderStars(r.rating)}
              </div>
              <p className="text-base text-gray-600 leading-snug flex items-start gap-2">
                <FaQuoteLeft className="text-blue-400 mt-0.5" />
                {r.review}
              </p>
            </div>
          </div>
        ))}
      </Marquee>
    </section>
  );
}

export default Approved;
