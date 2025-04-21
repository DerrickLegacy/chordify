import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import ProfileCard from "../../components/card/ProfileCard";
import { useInView } from "react-intersection-observer";
import SectionHeader from "../../components/section_header/SectionHeader";
import useAxiosGetFetch from "../../components/api_methods/events/useAxiosGetFetch";
import { API_URL } from "../../config/url";
import toast, { Toaster } from "react-hot-toast";

export default function Team() {
  const [showCount, setShowCount] = useState(6);
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.1 });

  const teamUrl = API_URL.TEAM;

  const {
    response: teamResponses,
    loading: teamLoading,
    error: teamError,
  } = useAxiosGetFetch(teamUrl);

  useEffect(() => {
    if (teamResponses?.length) {
      setTimeout(() => {
        window.dispatchEvent(new Event("scroll"));
      }, 100);
    }
  }, [teamResponses]);

  useEffect(() => {
    if (teamLoading) {
      toast.loading("Loading team members...", { id: "team-loading" });
    } else if (teamError) {
      toast.error("Failed to load team data", { id: "team-loading" });
    } else if (teamResponses) {
      toast.success("Team loaded successfully", {
        id: "team-loading",
        duration: 2000,
      });
    }

    return () => {
      toast.dismiss("team-loading");
    };
  }, [teamLoading, teamError, teamResponses]);

  const transformTeamData = (apiData) => {
    if (!apiData) return [];
    return apiData.map((member) => ({
      id: member.id,
      name: member.name,
      title: member.designation,
      status: "Available",
      image: member.profileImage,
    }));
  };

  const teamMembers = transformTeamData(teamResponses);
  const displayedMembers = teamMembers?.slice(0, showCount) || [];
  const canShowMore = showCount < (teamMembers?.length || 0);
  const canShowLess = showCount > 6;

  const teamPageDetails = {
    mainText: "Team",
    minorText: "Meet Our",
    description:
      "Meet the dedicated professionals who make your adventures possible.",
  };

  const handleViewMore = () => {
    if (showCount === 6) setShowCount(12);
    else setShowCount(teamMembers?.length || 0);
  };

  const handleViewLess = () => {
    if (showCount === (teamMembers?.length || 0)) setShowCount(12);
    else setShowCount(6);
  };

  if (teamLoading) {
    return (
      <div className="text-center py-20">
        <Toaster
          position="top-center"
          toastOptions={{
            className: "",
            duration: 5000,
            style: {
              background: "#363636",
              color: "#fff",
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: "green",
                secondary: "black",
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: "red",
                secondary: "white",
              },
            },
          }}
        />
      </div>
    );
  }

  if (teamError) {
    return (
      <div className="text-center py-20 text-red-500">
        <Toaster
          position="top-center"
          toastOptions={{
            className: "",
            duration: 5000,
            style: {
              background: "#363636",
              color: "#fff",
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: "red",
                secondary: "white",
              },
            },
          }}
        />
        Error loading team data. Please try again later.
      </div>
    );
  }

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: "green",
              secondary: "black",
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: "red",
              secondary: "white",
            },
          },
        }}
      />
      
      <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            mainText={teamPageDetails.mainText}
            minorText={teamPageDetails.minorText}
            description={teamPageDetails.description}
          />

          {/* Attach observer to wrapper */}
          <div ref={ref}>
            <div
              className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto transition-all duration-700 ease-in-out ${
                inView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              {displayedMembers.map((member) => (
                <ProfileCard key={member.id} profile={member} />
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-12">
            {canShowMore && (
              <button
                onClick={handleViewMore}
                className="px-6 py-3 border border-[#f84d32] text-[#e27160] rounded-full font-medium hover:bg-[#f84d32] hover:text-white transition-colors"
              >
                {showCount === 6
                  ? "View More Team Members"
                  : showCount === 12
                  ? "View All Team Members"
                  : ""}
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