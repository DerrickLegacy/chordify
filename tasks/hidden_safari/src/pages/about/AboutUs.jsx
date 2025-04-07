import React from "react";
import { useInView } from "react-intersection-observer";

const AnimatedCard = ({ title, description }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={`bg-white p-6 rounded-lg shadow-lg w-64 text-center transition-all duration-700 ease-in-out
                  ${inView ? "animate-fade animate-slide-up opacity-100" : "opacity-0 translate-y-10"}`}
    >
      <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
      <p className="text-gray-600 mt-2">{description}</p>
    </div>
  );
};

export default function AboutUs() {
  const cards = [
    { id: 1, title: "Card 1", description: "This is the first card." },
    { id: 2, title: "Card 2", description: "This is the second card." },
    { id: 3, title: "Card 3", description: "This is the third card." },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card) => (
          <AnimatedCard key={card.id} title={card.title} description={card.description} />
        ))}
      </div>
    </div>
  );
}
