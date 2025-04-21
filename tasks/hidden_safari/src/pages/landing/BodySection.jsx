import React, { useState, useEffect } from "react";
import Testimonials from "../../components/testimonials/Testimonials";
import Activities from "../../components/activities/Activities";
import HighlightedEvents from "../../components/highlightedEvents/HighlightedEvents";
import Videos from "../../components/videos/Videos";
import my_camps from "../../assets/camps";
import useAxiosGetFetch from "../../components/api_methods/events/useAxiosGetFetch";
import { toast, Toaster } from "react-hot-toast";
import { API_URL } from "../../config/url";

export default function BodySection() {
  const [camps, setCamps] = useState(my_camps);

  // URLs
  const snowTrekUrl = API_URL.SNOW_TREK;
  const summerEventUrl = API_URL.SUMMER_EVENT;
  const epicAdventureUrl = API_URL.EPIC_ADVENTURE;
  const specialEventsUrl = API_URL.SPECIAL_EVENTS;
  const monsoonTrekingUrl = API_URL.MONSOON_TREKKING;
  const highlightedEventUrl = API_URL.HIGHLIGHTED_EVENTS;

  // Fetching data with hooks
  const { response: trekResponse, loading: trekLoading, error: trekError } = useAxiosGetFetch(snowTrekUrl);
  const { response: summerEventResponse, loading: summerEventLoading, error: summerEventError } = useAxiosGetFetch(summerEventUrl);
  const { response: adventureResponse, loading: adventureLoading, error: adventureError } = useAxiosGetFetch(epicAdventureUrl);
  const { response: specialEventsUrlResponse, loading: specialEventsUrlLoading, error: specialEventsUrlError } = useAxiosGetFetch(specialEventsUrl);
  const { response: monsoonWindUrlResponse, loading: monsoonWindUrlLoading, error: monsoonWindUrlError } = useAxiosGetFetch(monsoonTrekingUrl);
  const { response: highlightedEvenUrlResponse, loading: highlightedEvenUrlLoading, error: highlightedEvenUrlError } = useAxiosGetFetch(highlightedEventUrl);

  const isLoading = trekLoading || summerEventLoading || adventureLoading || specialEventsUrlLoading || monsoonWindUrlLoading || highlightedEvenUrlLoading;
  const hasError = trekError || summerEventError || adventureError || specialEventsUrlError || monsoonWindUrlError || highlightedEvenUrlError;

  useEffect(() => {
    if (isLoading) {
      toast.loading("Waiting...");
    } else if (hasError) {
      toast.error("Error loading data. Please try again later.");
    } else {
      toast.dismiss();
    }
  }, [isLoading, hasError]); 

  if (isLoading)
    return (
      <div className="text-center py-20">
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#363636",
              color: "#fff",
              borderRadius: "8px",
            },
            success: {
              style: {
                background: "#4caf50",
              },
            },
            error: {
              style: {
                background: "#f44336",
              },
            },
          }}
        />
      </div>
    );

  if (hasError)
    return (
      <div className="text-center py-20 text-red-500">
        Error loading data. Please try again later.
      </div>
    );

  return (
    <div className="space-y-16 md:space-y-1">
      <HighlightedEvents highlightedEvents={highlightedEvenUrlResponse} camps={camps} />
      {trekResponse && Array.isArray(trekResponse) && trekResponse.length > 0 && (
        <Activities
          activities={trekResponse}
          activityTitile="Snow Treks"
          activityDescription="Explore our exciting range of mountain treks"
        />
      )}
      {summerEventResponse && Array.isArray(summerEventResponse) && summerEventResponse.length > 0 && (
        <Activities
          activities={summerEventResponse}
          activityTitile="Summer Events"
          activityDescription="Join our exciting range of summer activities"
          toggleBackgroundColor={false}
        />
      )}
      {adventureResponse && Array.isArray(adventureResponse) && adventureResponse.length > 0 && (
        <Activities
          activities={adventureResponse}
          activityTitile="Adventures"
          activityDescription="Experience thrilling adventure activities"
        />
      )}
      {specialEventsUrlResponse && Array.isArray(specialEventsUrlResponse) && specialEventsUrlResponse.length > 0 && (
        <Activities
          activities={specialEventsUrlResponse}
          activityTitile="Special Events"
          activityDescription="Join us for unique, limited-time gatherings that celebrate remarkable occasions"
        />
      )}
      {monsoonWindUrlResponse && Array.isArray(monsoonWindUrlResponse) && monsoonWindUrlResponse.length > 0 && (
        <Activities
          activities={monsoonWindUrlResponse}
          activityTitile="Monsoon Treks"
          activityDescription="Join us for unique, limited-time gatherings that celebrate remarkable occasions"
        />
      )}
      <Videos />
      <Testimonials />
    </div>
  );
}
