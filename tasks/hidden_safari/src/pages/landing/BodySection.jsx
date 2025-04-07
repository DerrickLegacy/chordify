import React, { useState, useEffect, useRef } from "react";
import Testimonials from "../../components/testimonials/Testimonials";
import Activities from "../../components/activities/Activities";
import HighlightedEvents from "../../components/highlightedEvents/HighlightedEvents";
import Videos from "../../components/videos/Videos";
import my_activities from "../../assets/activities";
import my_camps from "../../assets/camps";

export default function BodySection() {
  const boxRef = useRef(null); // Create reference
  const [camps, setCamps] = useState(my_camps);
  const [activities, setActivities] = useState(my_activities);

 

  return (
    <>
      <HighlightedEvents camps={camps} />
      <Activities activities={activities} />
      <Videos />
      <Testimonials />
    </>
  );
}
