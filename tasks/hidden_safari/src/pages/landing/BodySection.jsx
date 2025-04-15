import React, { useState, useEffect, useRef } from "react";
import Testimonials from "../../components/testimonials/Testimonials";
import Activities from "../../components/activities/Activities";
import HighlightedEvents from "../../components/highlightedEvents/HighlightedEvents";
import Videos from "../../components/videos/Videos";
import my_activities from "../../assets/activities";
import my_camps from "../../assets/camps";
import useAxiosGetFetch from "../../components/api_methods/events/useAxiosGetFetch";

export default function BodySection() {
  const boxRef = useRef(null);
  const [camps, setCamps] = useState(my_camps);
  const [activities, setActivities] = useState(my_activities);

  const snowTrekUrl =
    "http://54.210.95.246:3005/api/v1/events/snow-treks-events";
  const summerEventUrl =
    "http://54.210.95.246:3005/api/v1/events/summer-events";
  const epicAdventureUrl =
    "http://54.210.95.246:3005/api/v1/events/epic-adventure-events";
  const specialEventsUrl =
    "http://54.210.95.246:3005/api/v1/events/special-events";

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

  console.log("Trek Response:", my_activities); // Check the actual structure

  const isLoading = trekLoading || summerEventLoading || adventureLoading;
  const hasError = trekError || summerEventError || adventureError;

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
      <HighlightedEvents camps={camps} />

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

      <Videos />
      <Testimonials />
    </div>
  );
}
