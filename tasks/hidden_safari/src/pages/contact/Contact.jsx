import React from "react";
import AnimatedCard from "../../components/card/AnimatedCard";
import SectionHeader from "../../components/section_header/SectionHeader";

export default function Contact() {
  const cards = [
    {
      id: 1,
      title: "Get In Touch",
      description:
        "Have questions about our adventures? Our team is ready to help you plan your perfect trip.",
    },
    {
      id: 2,
      title: "Support",
      description:
        "Need assistance with an existing booking? Contact our support team for quick help.",
    },
  ];

  const pageDetails = {
    mainText: "Us",
    minorText: "Contact",
    description:
      "We're here to help you with any questions about your adventure. Reach out to us anytime!",
  };
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto ">
        <SectionHeader
          mainText={pageDetails.mainText}
          minorText={pageDetails.minorText}
          description={pageDetails.description}
        />

        <div className="grid grid-cols-2 md:grid-cols-2 gap-8 sm:max-h-7 max-w-6xl mx-auto">
          {cards.map((card) => (
            <AnimatedCard
              key={card.id}
              title={card.title}
              description={card.description}
              className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
