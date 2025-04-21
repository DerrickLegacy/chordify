import { useInView } from "react-intersection-observer";
import EventsCard from "../../components/card/EventsCard";

export default function AnimatedEventCategory({ categoryName, events, showAll }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <div key={categoryName} className="mb-12" ref={ref}>
      <h2 className="text-2xl text-[#e27160] font-bold mb-6 capitalize">
        {categoryName.replace(/([A-Z])/g, ' $1').trim()}
      </h2>
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700 ${
          inView ? "animate-fade animate-slide-up opacity-100" : "opacity-0 translate-y-10"
        }`}
      >
        {(showAll ? events : events.slice(0, 3)).map((event) => (
          <EventsCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
