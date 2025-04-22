import React from "react";

import Carousel from "../../components/carousel/Carousel";
import { FaStar, FaRegCalendarAlt, FaClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function EventsCard({ event }) {
  const navigate = useNavigate();
  
  // Generate random values
  const randomRating = (Math.random() * 1 + 4).toFixed(1); // Random between 4.0 and 5.0
  const randomPrice = Math.floor(Math.random() * 2000) + 1000; // Random between 1000 and 3000
  const randomReviews = Math.floor(Math.random() * 200) + 50; // Random between 50 and 250

  return (
    <article
      key={event.id}
      className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-3.5 group flex flex-col"
    >
      <div className="h-72 relative">
        <Carousel images={event.images} />
        {event.tag && (
          <div className="absolute top-4 right-4 z-10 bg-[#e27160] text-white px-3 py-1 rounded-full text-xs font-bold">
            {event.tag}
          </div>
        )}
      </div>
    
      <div className="p-6 flex flex-col flex-grow justify-between">
        <div className="flex-grow">
          <div className="flex justify-between items-start mb-3">
            <h2 className="text-xl font-bold text-gray-800 group-hover:text-[#e27160] transition-colors">
              {event.name}
            </h2>
            <div className="flex items-center bg-gray-100 px-2 py-1 rounded">
              <FaStar className="text-yellow-400 mr-1" />
              <span className="text-sm font-semibold">{randomRating}</span>
            </div>
          </div>
    
          <div className="flex items-center text-gray-500 text-sm mb-4 space-x-4">
            <span className="flex items-center">
              <FaClock className="mr-1" />
              {event.duration}
            </span>
            <span className="flex items-center">
              <FaRegCalendarAlt className="mr-1" />
              {event.nights}
            </span>
          </div>
    
          <div className="flex justify-between items-center mt-6">
            <div>
              <div className="text-2xl font-bold text-[#e27160]">
                ${randomPrice}
                <span className="text-gray-500 text-sm ml-1">/person</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-gray-700 font-semibold">{event.date}</div>
              <div className="text-gray-400 text-xs">{randomReviews} reviews</div>
            </div>
          </div>
        </div>
        <button 
          onClick={() => navigate(`/event-details/${event.id}`)} 
          className="mt-6 w-full bg-gradient-to-r from-[#f84d32] to-orange-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center"
        >
          More
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </button>
      </div>
    </article>
  );
}