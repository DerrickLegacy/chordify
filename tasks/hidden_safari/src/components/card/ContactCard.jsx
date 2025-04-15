
import React from "react";
import AnimatedCard from "./AnimatedCard";


export default function ContactCard() {
  const cards = [
    { id: 1, title: "Card 1", description: "This is the first card." },
    { id: 2, title: "Card 2", description: "This is the second card." },
    { id: 3, title: "Card 3", description: "This is the third card." },
  ];

  return (
    <div className="flex justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card) => (
          <AnimatedCard key={card.id} title={card.title} description={card.description} />
        ))}
      </div>
    </div>
  );
}
