import React, { useRef, useState } from "react";
import Card from "../../components/card/Card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useScrollVisibility } from "../../components/hooks/useScrollVisibility";

export default function Activities({
  activities,
  activityDescription,
  activityTitile,
  toggleBackgroundColor = false,
}) {
  const scrollRefs = useRef([]);
  const { ref: boxRef, style: visibilityStyle } = useScrollVisibility({
    fadeStart: 0.2,
    fadeEnd: 0.8,
    minScale: 0.75,
    transitionDuration: 700,
  });

  const visibilityData = activities.map(() =>
    useScrollVisibility({
      fadeStart: 0.2,
      fadeEnd: 0.8,
      minScale: 0.75,
      transitionDuration: 700,
    })
  );

  const scroll = (direction, index) => {
    const scrollRef = scrollRefs.current[index];
    if (scrollRef?.current) {
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
    <section className={`py-16 ${toggleBackgroundColor ? "bg-[#fce9e6]" : ""}`}>
      <div className="px-6 md:px-12 mx-auto max-w-[85%]">
        <div ref={boxRef} style={visibilityStyle} className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-[#c0392b]">
            {activityTitile}
          </h2>
          <h3 className="text-xl md:text-2xl text-gray-700 mt-2 max-w-3xl mx-auto">
            {activityDescription}
          </h3>

          <div className="relative mt-10">
            <button
              onClick={() => scroll("left", 0)}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-white hover:bg-gray-100 border border-gray-300 rounded-full shadow-md transition"
            >
              <ChevronLeft size={24} className="text-gray-700" />
            </button>

            <div
              ref={(el) => (scrollRefs.current[0] = { current: el })}
              className="overflow-x-auto hide-scroll-bar scroll-smooth"
            >
              <div className="flex gap-6 px-8 min-w-max justify-center my-7">
                {activities.map((data, i) => (
                  <div
                    key={i}
                    className="min-w-[260px] hover:-translate-y-4 transition-transform"
                  >
                    <Card
                      trekname={data.heading}
                      image_address={data.bannerImages1}
                      cardName={data.heading}
                    />
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => scroll("right", 0)}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-white hover:bg-gray-100 border border-gray-300 rounded-full shadow-md transition"
            >
              <ChevronRight size={24} className="text-gray-700" />
            </button>
          </div>
          <div className="inline-flex items-center justify-center w-full">
            <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded-sm md:my-10 dark:bg-gray-700" />
          </div>
        </div>
      </div>
    </section>
  );
}
