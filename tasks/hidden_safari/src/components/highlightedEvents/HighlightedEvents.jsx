import React, { useRef } from "react";
import RecommendedCamp from "../../components/camps/RecommendedCamp";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useScrollVisibility } from "../hooks/useScrollVisibility";

export default function HighlightedEvents({ camps }) {
  const scrollRef = useRef(null);
  const { ref: boxRef, style: visibilityStyle } = useScrollVisibility({
    fadeStart: 0.2,
    fadeEnd: 0.8,
    minScale: 0.75,
    transitionDuration: 700,
  });

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.7;
      scrollRef.current.scrollTo({
        left:
          direction === "left"
            ? scrollLeft - scrollAmount
            : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      ref={boxRef}
      style={visibilityStyle}
      className="relative py-16 px-6 md:px-12 mx-auto max-w-7xl text-center"
    >
      {/* Header */}
      <h2 className="text-4xl md:text-5xl font-bold text-[#c0392b]">
        Highlighted Events
      </h2>
      <p className="text-xl md:text-2xl text-gray-700 mt-2 max-w-3xl mx-auto">
        Recommended camps by our Instructors
      </p>

      {/* Scrollable Cards */}
      <div className="relative mt-10">
        {/* Left Scroll Button */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition"
        >
          <ChevronLeft size={30} />
        </button>

        {/* Card Container */}
        <div
          ref={scrollRef}
          className="overflow-x-auto hide-scroll-bar scroll-smooth"
        >
          <div className="flex gap-6 px-10 min-w-max justify-center">
            {camps.map((data, index) => (
              <div
                key={index}
                className="inline-block animate-fade-up transform transition-transform duration-300 hover:scale-95"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: "both",
                  opacity: visibilityStyle.opacity,
                }}
              >
                <RecommendedCamp campName={data.name} image={data.image} />
              </div>
            ))}
          </div>
        </div>

        {/* Right Scroll Button */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition"
        >
          <ChevronRight size={30} />
        </button>
      </div>
    </section>
  );
}
