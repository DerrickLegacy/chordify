import React from "react";
import { FaBusSimple, FaTents } from "react-icons/fa6";
import { GiKnifeFork, GiMountainClimbing } from "react-icons/gi";
import { BiSolidFirstAid } from "react-icons/bi";

export default function RecommendedCamp({ campName, image }) {
  return (
    <div className="relative bg-white shadow-lg rounded-2xl overflow-hidden w-80 md:w-96 max-w-full">
      <div className="relative min-h-[400px] w-full flex flex-col justify-end md:p-10">
        <img
          src={image}
          alt={campName}
          className="absolute inset-0 w-full h-full object-cover grayscale-25 hover:grayscale-75"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative flex flex-col items-center text-white">
          <h2 className="text-2xl md:text-4xl font-bold text-center italic mt-0.5">
            {campName}
          </h2>
          <div className="grid grid-cols-5 gap-4 mt-20 text-xl md:text-2xl mb-0.5">
            <FaBusSimple className="hover:text-amber-300" />
            <GiKnifeFork className="hover:text-amber-300" />
            <FaTents className="hover:text-amber-300" />
            <GiMountainClimbing className="hover:text-amber-300" />
            <BiSolidFirstAid className="hover:text-amber-300" />
          </div>
        </div>
      </div>
    </div>
  );
}
