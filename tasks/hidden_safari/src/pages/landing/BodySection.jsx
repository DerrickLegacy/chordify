import React, { useState, useEffect, useRef } from "react";
import Testimonials from "../../components/testimonials/Testimonials";
import Activities from "../../components/activities/Activities";
import HighlightedEvents from "../../components/highlightedEvents/HighlightedEvents";
import Videos from "../../components/videos/Videos";
import my_camps from "../../assets/camps";
import useAxiosGetFetch from "../../components/api_methods/events/useAxiosGetFetch";

export default function BodySection() {
  const [camps, setCamps] = useState(my_camps);

  const snowTrekUrl =
    "http://54.210.95.246:3005/api/v1/events/snow-treks-events";
  const summerEventUrl =
    "http://54.210.95.246:3005/api/v1/events/summer-events";
  const epicAdventureUrl =
    "http://54.210.95.246:3005/api/v1/events/epic-adventure-events";
  const specialEventsUrl =
    "http://54.210.95.246:3005/api/v1/events/special-events";

  const monsoonTrekingUrl =
    "http://54.210.95.246:3005/api/v1/events/monsoon-events";

  const highlightedEventUrl =
    "http://54.210.95.246:3005/api/v1/events/highlighted-events";

    
  const {
    response: trekResponse,
    loading: trekLoading,
    error: trekError,
  } = useAxiosGetFetch(snowTrekUrl);

  const {
    response: summerEventResponse,
    loading: summerEventLoading,
    error: summerEventError,
  } = useAxiosGetFetch(summerEventUrl);

  const {
    response: adventureResponse,
    loading: adventureLoading,
    error: adventureError,
  } = useAxiosGetFetch(epicAdventureUrl);

  const {
    response: specialEventsUrlResponse,
    loading: specialEventsUrlLoading,
    error: specialEventsUrlError,
  } = useAxiosGetFetch(specialEventsUrl);

  const {
    response: monsoonWindUrlResponse,
    loading: monsoonWindUrlLoading,
    error: monsoonWindUrlError,
  } = useAxiosGetFetch(monsoonTrekingUrl);

  const {
    response: highlightedEvenUrlResponse,
    loading: highlightedEvenUrlLoading,
    error: highlightedEvenUrlError,
  } = useAxiosGetFetch(highlightedEventUrl);


  const isLoading =
    trekLoading ||
    summerEventLoading ||
    adventureLoading ||
    specialEventsUrlLoading ||
    monsoonWindUrlLoading||highlightedEvenUrlLoading;

  const hasError =
    trekError ||
    summerEventError ||
    adventureError ||
    specialEventsUrlError ||
    monsoonWindUrlError||highlightedEvenUrlError;

  if (isLoading)
    return <div className="text-center py-20">Loading events...</div>;
  if (hasError)
    return (
      <div className="text-center py-20 text-red-500">
        Error loading data. Please try again later.
      </div>
    );

  return (

    <div className="space-y-16 md:space-y-1">
      <HighlightedEvents highlightedEvents={highlightedEvenUrlResponse} camps={camps} />

      {trekResponse &&
        Array.isArray(trekResponse) &&
        trekResponse.length > 0 && (
          <Activities
            activities={trekResponse}
            activityTitile="Snow Treks"
            activityDescription="Explore our exciting range of mountain treks"
          />
        )}

{summerEventResponse &&
        Array.isArray(summerEventResponse) &&
        summerEventResponse.length > 0 && (
          <Activities
            activities={summerEventResponse}
            activityTitile="Summer Events"
            activityDescription="Join our exciting range of summer activities"
            toggleBackgroundColor={false}
          />
        )}

      {adventureResponse &&
        Array.isArray(adventureResponse) &&
        adventureResponse.length > 0 && (
          <Activities
            activities={adventureResponse}
            activityTitile="Adventures"
            activityDescription="Experience thrilling adventure activities"
          />
        )}

      {specialEventsUrlResponse &&
        Array.isArray(specialEventsUrlResponse) &&
        specialEventsUrlResponse.length > 0 && (
          <Activities
            activities={specialEventsUrlResponse}
            activityTitile="Special Events"
            activityDescription="Join us for unique, limited-time gatherings that celebrate remarkable occasions"
          />
        )}

      {monsoonWindUrlResponse &&
        Array.isArray(monsoonWindUrlResponse) &&
        monsoonWindUrlResponse.length > 0 && (
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
