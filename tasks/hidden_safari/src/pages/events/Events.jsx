import { useState } from "react";
import { useInView } from "react-intersection-observer";
import EventsCard from "../../components/card/EventsCard";
import SectionHeader from "../../components/section_header/SectionHeader";

export default function Events() {
  const [showAll, setShowAll] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const events = [
    {
      id: 1,
      name: "Whole Of South Africa",
      images: ["madagascar_beach.jpg", "cape_town.jpg"],
      price: 2000,
      date: "Jan 2025",
      duration: "7 days",
      nights: "9 nights",
      rating: 4.8,
      reviews: 124,
      tag: "Popular",
    },
    {
      id: 2,
      name: "Mountain Rwenzori Expedition",
      images: ["mountain_rwenzori.jpg", "kilimanjaro.jpg"],
      price: 1500,
      date: "Mar 2025",
      duration: "5 days",
      nights: "4 nights",
      rating: 4.9,
      reviews: 87,
      tag: "Adventure",
    },
    {
      id: 3,
      name: "Kampala City Tour",
      images: ["kampala_entebbe.jpg", "madagascar_beach.jpg"],
      price: 800,
      date: "Apr 2025",
      duration: "3 days",
      nights: "2 nights",
      rating: 4.7,
      reviews: 203,
      tag: "Cultural",
    },
    {
      id: 4,
      name: "Mountain Climbing Adventure",
      images: [
        "kampala_entebbe.jpg",
        "man_climb.jpg",
        "help_climb.jpg",
        "hiker.jpg",
      ],
      price: 800,
      date: "Apr 2025",
      duration: "3 days",
      nights: "2 nights",
      rating: 4.2,
      reviews: 22,
      tag: "Adventure",
    },
  ];

  const handleShowAllEvents = () => {
    setShowAll(!showAll);
  };

  const displayedEvents = showAll ? events : events.slice(0, 3);

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          mainText={"Events"}
          minorText={"Upcoming"}
          description={
            "Discover breathtaking experiences tailored for adventure seekers"
          }
        />

        <div
          ref={ref}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${
            inView
              ? "animate-fade animate-slide-up opacity-100"
              : "opacity-0 translate-y-10"
          }`}
        >
          {displayedEvents.map((event) => (
            <EventsCard key={event.id} event={event} />
          ))}
        </div>

        {events.length > 3 && (
          <div className="text-center mt-12">
            <button
              className="px-6 py-3 border border-[#f84d32] text-[#e27160] rounded-full font-medium hover:bg-[#f84d32] hover:text-white transition-colors"
              onClick={handleShowAllEvents}
            >
              {showAll ? "Show Less" : "View All Adventures"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}