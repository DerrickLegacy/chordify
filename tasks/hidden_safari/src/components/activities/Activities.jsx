import React, { useRef } from "react";
import Card from "../../components/card/Card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useScrollVisibility } from "../../components/hooks/useScrollVisibility";

export default function Activities({ activities }) {
  const scrollRefs = useRef([]);
  scrollRefs.current = activities.map(
    (_, i) => scrollRefs.current[i] ?? React.createRef()
  );

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
    <section className="bg-[#fce9e6] py-16">
      <div className="px-6 md:px-12 mx-auto max-w-[85%]">
        {activities.map((activity, index) => {
          const { ref: boxRef, style: visibilityStyle } = visibilityData[index];

          return (
            <div
              key={index}
              ref={boxRef}
              style={visibilityStyle}
              className="text-center"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-[#c0392b]">
                {activity.type}
              </h2>
              <h3 className="text-xl md:text-2xl text-gray-700 mt-2 max-w-3xl mx-auto">
                {activity.description}
              </h3>

              <div className="relative mt-10">
                <button
                  onClick={() => scroll("left", index)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-white hover:bg-gray-100 border border-gray-300 rounded-full shadow-md transition"
                >
                  <ChevronLeft size={24} className="text-gray-700" />
                </button>

                <div
                  ref={scrollRefs.current[index]}
                  className="overflow-x-auto hide-scroll-bar scroll-smooth"
                >
                  <div className="flex gap-6 px-8 min-w-max justify-center">
                    {activity.data.map((data, i) => (
                      <div key={i} className="min-w-[260px] hover:pt-8 ">
                        <Card
                          trekname={data.trekname}
                          image_address={data.image_address}
                          cardName={data.name}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => scroll("right", index)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-white hover:bg-gray-100 border border-gray-300 rounded-full shadow-md transition"
                >
                  <ChevronRight size={24} className="text-gray-700" />
                </button>
              </div>
              <div className="inline-flex items-center justify-center w-full">
                <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded-sm md:my-10 dark:bg-gray-700" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
