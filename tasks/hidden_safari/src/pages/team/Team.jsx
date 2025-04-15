import React from "react";
import { Outlet } from "react-router-dom";
import ProfileCard from "../../components/card/ProfileCard";
import { useInView } from "react-intersection-observer";
import SectionHeader from "../../components/section_header/SectionHeader";

export default function Team() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const teamMembers = [
    {
      id: 1,
      name: "William Henry",
      title: "Project Leader",
      status: "Available",
      image: "hiker.jpg", // or path to image if available
    },
    {
      id: 2,
      name: "Sarah Johnson",
      title: "Customer Support",
      status: "Available",
      image: "wick.jpg",
    },
  ];
  const teamPageDetails = {
    mainText: "Team",
    minorText: "Meet Our",
    description:
      "Meet the dedicated professionals who make your adventures possible.",
  }

  return (
    <>
      <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          
          <SectionHeader
            mainText={teamPageDetails.mainText}
            minorText={teamPageDetails.minorText}
            description={teamPageDetails.description}
          
          />
          <div
            ref={ref}
            className={`grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto ${
              inView
                ? "animate-fade animate-slide-up opacity-100"
                : "opacity-0 translate-y-10"
            }`}
          >
            {teamMembers.map((member) => (
              <ProfileCard key={member.id} profile={member} />
            ))}
          </div>
        </div>
      </section>
      <Outlet />
    </>
  );
}
