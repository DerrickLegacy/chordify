import React from "react";
import { FaTree } from "react-icons/fa";
import { GoClockFill, GoPeople } from "react-icons/go";

export default function HeaderBackgroundImage() {
  return (
    <div
      className="relative min-h-[50vh] sm:min-h-[60vh] md:min-h-[10vh] lg:min-h-[97vh] w-full flex items-center mb-11 grayscale-25 
      bg-[url('/images/man_climb.jpg')] bg-cover bg-center bg-no-repeat backdrop-blur-lg
      before:absolute before:inset-0 before:bg-gradient-to-r before:from-black/70 before:to-transparent before:z-0 z-10"
    >
      <div className="relative z-10 px-8 md:px-16 lg:px-24 md:py-10 py-57">
        <div className="w-full flex justify-start items-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl text-white font-bold text-left drop-shadow-lg">
            Experience Nature
          </h2>
        </div>

        <h4 className="text-white text-xl sm:text-2xl font-bold mt-4 text-left drop-shadow-md">
          India’s Largest Trekking Organization
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-6 text-left">
          {[
            {
              icon: <FaTree className="text-3xl text-white" />,
              value: "25,000+",
              label: "Participants",
            },
            {
              icon: <GoPeople className="text-3xl text-white" />,
              value: "68+",
              label: "Events",
            },
            {
              icon: <FaTree className="text-3xl text-white" />,
              value: "68+",
              label: "Events",
            },
            {
              icon: <GoClockFill className="text-3xl text-white" />,
              value: "11+",
              label: "Years",
            },
          ].map((item, index) => (
            <div key={index} className="flex items-center space-x-3">
              {item.icon}
              <div className="flex flex-col">
                <div className="text-lg md:text-xl text-white font-bold">
                  {item.value}
                </div>
                <div className="text-white text-sm">{item.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
