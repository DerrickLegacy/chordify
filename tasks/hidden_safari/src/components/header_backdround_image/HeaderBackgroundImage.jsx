import React from "react";
import { FaTree } from "react-icons/fa";
import { GoClockFill, GoPeople } from "react-icons/go";

export default function HeaderBackgroundImage() {
  return (
    <div className=" backdrop-blur-sm bg-[url('/images/man_climb.jpg')] bg-cover bg-center bg-no-repeat min-h-[50vh] sm:min-h-[60vh] md:min-h-[10vh] lg:min-h-[97vh] w-full relative flex items-center grayscale-25 mb-11">
      <div className=" px-16 md:px-16 lg:px-24 py-10">
        <div>
        <div className="w-auto flex justify-center items-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl text-black font-bold text-center drop-shadow-lg">
            Experience Nature
          </h2>
        </div>

        <h4 className="text-black text-xl sm:text-2xl font-bold mt-4 text-center">
          India’s Largest Trekking Organization
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-6">
          {[
            { icon: <FaTree className="text-3xl text-amber-700 " />, value: "25,000+", label: "Participants" },
            { icon: <GoPeople className="text-3xl text-amber-700 " />, value: "68+", label: "Events" },
            { icon: <FaTree className="text-3xl text-amber-700 " />, value: "68+", label: "Events" },
            { icon: <GoClockFill className="text-3xl text-amber-700 " />, value: "11+", label: "Years" }
          ].map((item, index) => (
            <div key={index} className="flex items-center space-x-3">
              {item.icon}
              <div className="flex flex-col">
                <div className="text-lg md:text-xl text-amber-700  font-bold">{item.value}</div>
                <div className="text-amber-700  text-sm">{item.label}</div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
}
