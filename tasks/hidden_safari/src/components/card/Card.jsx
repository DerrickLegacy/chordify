import React from "react";

export default function Card({ cardName, trekname, image_address }) {
  return (
    <div className="max-w-80 min-w-80  rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl hover:placeholder-amber-100 transition-shadow duration-300">
      <img 
        src={`/images/${image_address}`} 
        alt={cardName} 
        className="w-full h-[400px] object-cover transition-transform duration-300 hover:scale-100  grayscale-25"
      />

      <div className="px-6 py-4">
        <h4 className="font-bold text-4xl text-center mb-2">{cardName}</h4>
        <h4 className="text-gray-700 text-center text-2xl font-bold">{trekname}</h4>
      </div>
    </div>
  );
}
