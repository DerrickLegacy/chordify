import React,{useRef} from "react";
import { useScrollVisibility } from "../hooks/useScrollVisibility";

export default function Testimonials() {
  const { ref: boxRef, style: visibilityStyle } = useScrollVisibility({
    fadeStart: 0.2,
    fadeEnd: 0.8,
    minScale: 0.75,
    transitionDuration: 900,
    animationDirection: 'right' 
  });  
  return (
    <section
    ref={boxRef}
    style={visibilityStyle}
    className="bg-[#fff8f7] py-16">
      <div className="px-6 md:px-12 mx-auto max-w-7xl">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-[#c0392b]">
            Why People ❤️ Invincible
          </h2>
          <h3 className="text-xl md:text-2xl text-gray-800 mt-2">
            Experience the best with us
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-6">
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className="flex items-center bg-[#eed8d5] hover:bg-[#f7e9e7] transition-colors p-5 rounded-xl shadow-md"
              >
                <img
                  src="/images/person_avatar.png"
                  alt="Jonathan Reinink"
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover mr-5 border-2 border-white"
                />
                <div>
                  <p className="text-lg md:text-xl font-semibold text-gray-900">
                    Jonathan Reinink
                  </p>
                  <p className="text-sm md:text-base text-gray-600">
                    Sales Manager, ABC
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col justify-center space-y-4">
            <strong className="text-2xl md:text-3xl text-yellow-600">⭐⭐⭐⭐⭐</strong>
            <p className="text-lg md:text-xl leading-relaxed text-gray-800">
              This trekking organization is excellent. Their costs are minimal
              due to their NGO's non-profit efforts. You can have the experience
              of trekking at the lowest cost with basic amenities and the best
              available trek leaders.
            </p>
            <p className="text-lg md:text-xl leading-relaxed text-gray-800">
              The best part is the food they provide during the trek. Their cooks
              are the best I have experienced so far with different organizations.
              The food they serve is healthy and balanced.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
