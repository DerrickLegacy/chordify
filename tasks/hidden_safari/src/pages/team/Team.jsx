import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import ProfileCard from "../../components/card/ProfileCard";
import { useInView } from "react-intersection-observer";
import SectionHeader from "../../components/section_header/SectionHeader";
import useAxiosGetFetch from "../../components/api_methods/events/useAxiosGetFetch";

export default function Team() {
  const [showCount, setShowCount] = useState(6); // Start with 6 cards
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const teamUrl = "http://54.210.95.246:3005/api/v1/team";

  const {
    response: teamResponses,
    loading: teamLoading,
    error: teamError,
  } = useAxiosGetFetch(teamUrl);

  const isLoading = teamLoading;
  const hasError = teamError;

  if (isLoading)
    return <div className="text-center py-20">Loading team members...</div>;
  if (hasError)
    return (
      <div className="text-center py-20 text-red-500">
        Error loading team data. Please try again later.
      </div>
    );

  const transformTeamData = (apiData) => {
    if (!apiData) return [];
    
    return apiData.map(member => ({
      id: member.id,
      name: member.name,
      title: member.designation,
      status: "Available",
      image: member.profileImage
    }));
  };

  const teamMembers = teamResponses ? transformTeamData(teamResponses) : [];
  const displayedMembers = teamMembers.slice(0, showCount);
  const canShowMore = showCount < teamMembers.length;
  const canShowLess = showCount > 6; 

  const teamPageDetails = {
    mainText: "Team",
    minorText: "Meet Our",
    description: "Meet the dedicated professionals who make your adventures possible.",
  };

  const handleViewMore = () => {
    if (showCount === 6) {
      setShowCount(12);
    } else {
      setShowCount(teamMembers.length); 
    }
  };

  const handleViewLess = () => {
    if (showCount === teamMembers.length) {
      setShowCount(12); 
    } else {
      setShowCount(6); 
    }
  };

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
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto ${
              inView
                ? "animate-fade animate-slide-up opacity-100"
                : "opacity-0 translate-y-10"
            }`}
          >
            {displayedMembers.map((member) => (
              <ProfileCard key={member.id} profile={member} />
            ))}
          </div>

          <div className="flex justify-center gap-4 mt-12">
            {canShowMore && (
              <button
                onClick={handleViewMore}
                className="px-6 py-3 border border-[#f84d32] text-[#e27160] rounded-full font-medium hover:bg-[#f84d32] hover:text-white transition-colors"
              >
                {showCount === 6 ? "View More Team Members" : 
                 showCount === 12 ? "View All Team Members" : ""}
              </button>
            )}
            {canShowLess && (
              <button
                onClick={handleViewLess}
                className="px-6 py-3 border border-gray-300 text-gray-600 rounded-full font-medium hover:bg-gray-100 transition-colors"
              >
                View Less
              </button>
            )}
          </div>
        </div>
      </section>
      <Outlet />
    </>
  );
}