import React from "react";

export default function Card({ cardName, trekname, image_address }) {
  return (
    <div className="w-full sm:min-w-[350px] sm:max-w-[300px] rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
      <img
        src={image_address}
        alt={cardName}
        className="w-full h-48 sm:h-64 md:h-72 object-cover transition-transform duration-300 hover:scale-105"
      />

      <div className="px-4 py-4 min-h-[150px] sm:min-h-[200px]">
        <h4 className="font-bold text-lg sm:text-xl text-center mb-2">{cardName}</h4>
        <h4 className="text-gray-700 text-center text-lg sm:text-xl font-semibold">{trekname}</h4>
      </div>
    </div>
  );
}
