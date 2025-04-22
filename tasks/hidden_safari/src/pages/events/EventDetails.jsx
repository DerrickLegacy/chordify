import React, { useState, useEffect, useMemo } from "react";
import {
  FaTree,
  FaUtensils,
  FaHotel,
  FaFirstAid,
  FaHiking,
} from "react-icons/fa";
import { IoMdPeople } from "react-icons/io";
import { GiPathDistance } from "react-icons/gi";
import { MdAccessibility, MdDirectionsWalk } from "react-icons/md";
import { useParams } from "react-router-dom";
import { API_URL } from "../../config/url";
import toast, { Toaster } from "react-hot-toast";
import useAxiosGetFetch from "../../components/api_methods/events/useAxiosGetFetch";
import { SlLocationPin } from "react-icons/sl";

export default function EventDetails() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { eventID } = useParams();

  const allEventUrl = API_URL.AN_EVENT(eventID);
  const {
    response: apiResponse,
    loading: eventIsLoading,
    error: eventError,
  } = useAxiosGetFetch(allEventUrl);

  const isLoading = eventIsLoading;
  const hasError = eventError;

  useEffect(() => {
    if (isLoading) {
      toast.loading("Loading events...", { id: "events-loading" });
    } else if (hasError) {
      toast.error("Failed to load events", { id: "events-loading" });
    } else if (apiResponse) {
      toast.success("Events loaded successfully", {
        id: "events-loading",
        duration: 2000,
      });
    }

    return () => {
      toast.dismiss("events-loading");
    };
  }, [isLoading, hasError, apiResponse]);

  const images = apiResponse
    ? [
        apiResponse.bannerImages1,
        apiResponse.bannerImages2,
        apiResponse.bannerImages3,
      ]
    : ["/images/summer-logo_54199-1862.avif", "/images/hiker.jpg"];

  const minicards = [
    {
      icon: <MdDirectionsWalk className="text-2xl text-[#e27160]" />,
      value: "Duration",
      label: apiResponse
        ? `${apiResponse.numberOfDays} Days/${
            apiResponse.numberOfDays - 1
          } Nights`
        : "5 Days/5 Nights",
    },
    {
      icon: <IoMdPeople className="text-2xl text-[#e27160]" />,
      value: "Difficulty",
      label: "Easy To Moderate",
    },
    {
      icon: <MdAccessibility className="text-2xl text-[#e27160]" />,
      value: "Age Group",
      label: "15-30 Years",
    },
    {
      icon: <GiPathDistance className="text-2xl text-[#e27160]" />,
      value: "Max Altitude",
      label: apiResponse?.heading?.includes("Kilimanjaro")
        ? "19,341 Ft"
        : "16,355 Ft",
    },
  ];

  const includesItems = [
    { icon: <FaUtensils className="text-[#e27160]" />, text: "Food" },
    { icon: <FaHotel className="text-[#e27160]" />, text: "Accomodation" },
    { icon: <FaHiking className="text-[#e27160]" />, text: "Travelling" },
    { icon: <FaFirstAid className="text-[#e27160]" />, text: "First Aid" },
    { icon: <FaTree className="text-[#e27160]" />, text: "Accessories" },
    { icon: <IoMdPeople className="text-[#e27160]" />, text: "Instructor" },
  ];

  const extractMonths = () => {
    if (!apiResponse?.calendarDates) return ["April", "May", "June"];
    const dateRange = apiResponse.calendarDates.split(" - ");
    const startMonth = new Date(dateRange[0]).toLocaleString("default", {
      month: "long",
    });
    const endMonth = new Date(dateRange[1]).toLocaleString("default", {
      month: "long",
    });
    return [startMonth, endMonth];
  };

  const scheduleData = useMemo(() => {
    if (!apiResponse?.schedule) return [];
    return apiResponse.schedule.map((dayPlan) => {
      const randomSeed = dayPlan.day;
      const randomElevation1 = 5000 + ((randomSeed * 823) % 10000);
      const randomElevation2 =
        randomElevation1 + 500 + ((randomSeed * 421) % 2000);
      const randomDistance = 5 + ((randomSeed * 123) % 10);
      const randomTimeHours1 = 2 + ((randomSeed * 57) % 3);
      const randomTimeHours2 = randomTimeHours1 + 1 + ((randomSeed * 29) % 2);

      return {
        ...dayPlan,
        elevation: `${randomElevation1.toLocaleString()}ft to ${randomElevation2.toLocaleString()}ft`,
        distance: `${randomDistance} km`,
        hikingTime: `${randomTimeHours1}-${randomTimeHours2} hours`,
        habitat: "Rain Forest",
      };
    });
  }, [apiResponse?.schedule]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      <div className="relative w-full bg-amber-400" data-carousel="static">
        <Toaster />
        <div className="relative h-56 overflow-hidden rounded-lg md:h-[70vh]">
          {images.map((src, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                idx === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={src}
                className="w-full h-full object-cover"
                alt={`Slide ${idx + 1}`}
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  e.target.src = "/images/default-banner.jpg";
                }}
              />
            </div>
          ))}
        </div>

        <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`w-3 h-3 rounded-full ${
                i === currentIndex ? "bg-white" : "bg-white/50"
              }`}
              aria-current={i === currentIndex}
              aria-label={`Slide ${i + 1}`}
              onClick={() => setCurrentIndex(i)}
            ></button>
          ))}
        </div>
      </div>

      <div className="w-[90%] mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {minicards.map((item, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:bg-[#f8f1f0]"
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <div>
                      <div className="text-sm font-medium text-gray-500">
                        {item.value}
                      </div>
                      <div className="font-semibold">{item.label}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">About</h3>
              <p className="text-gray-700">
                {apiResponse?.about ||
                  "Mount Kilimanjaro, the highest peak in Africa, stands tall at 5,895 meters (19,341 feet) above sea level. Located in Tanzania, this iconic free-standing mountain is a dream destination for adventurers and nature enthusiasts."}
              </p>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg h-fit sticky top-4">
            <div className="flex justify-between items-center mb-6">
              <span className="text-3xl font-bold">
                #7,999 <span className="text-lg font-normal">/ person</span>
              </span>
            </div>

            <h4 className="font-semibold mb-4">Includes</h4>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {includesItems.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  {item.icon}
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            <div className="text-center mb-6 font-bold">99 × 30</div>

            <button className="w-full bg-[#e27160] hover:bg-[#f39182] text-white font-bold py-3 px-4 rounded-lg transition-colors">
              Book Now
            </button>
          </div>
        </div>
      </div>

      <div className="relative w-full bg-[#f8f1f0] p-6">
        <div className="w-[90%] mx-auto p-6">
          <h2 className="text-2xl font-bold text-[#e27160] mb-6">Dates</h2>

          <div className="mb-2">
            {extractMonths().map((month) => (
              <span
                key={month}
                className="text-center w-fit px-3 m-2 rounded-lg bg-white border border-[#e27160]/20 hover:bg-[#e27160]/10 cursor-pointer transition-colors"
              >
                <span className="font-medium text-[#e27160]">{month}</span>
              </span>
            ))}
          </div>

          <div className="mb-8 pt-3">
            {["20", "23", "27", "29"].map((day) => (
              <span
                key={day}
                className="text-center py-4 px-4 m-2 rounded-lg bg-[#e27160] text-white font-bold hover:bg-[#e27160]/90 cursor-pointer transition-colors"
              >
                {day}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="w-[90%] mx-auto p-4 md:p-6">
        <h2 className="text-2xl font-bold text-[#e27160] mb-6">Schedule</h2>

        {scheduleData.map((day, index) => (
          <div key={index} className="mb-8 md:mb-12">
            <div className="flex items-start gap-2 mb-4">
              <div className="w-2 h-2 mt-2 rounded-full bg-[#e27160]"></div>
              <h3 className="text-lg font-bold">Day {day.day}</h3>
            </div>

            <div className="border-l-2 border-[#e27160] pl-4 md:pl-6 ml-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-4">
                <div>
                  <p className="font-medium text-sm md:text-base">
                    Elevation (ft):{" "}
                    <span className="font-normal">{day.elevation}</span>
                  </p>
                  <p className="font-medium text-sm md:text-base">
                    Distance:{" "}
                    <span className="font-normal">{day.distance}</span>
                  </p>

                  <p className="font-medium text-sm md:text-base">
                    Hiking Time:{" "}
                    <span className="font-normal">{day.hikingTime}</span>
                  </p>
                  <p className="font-medium text-sm md:text-base">
                    Habitat: <span className="font-normal">{day.habitat}</span>
                  </p>
                </div>
              </div>

              <p className="text-gray-700 mb-6 text-sm md:text-base">
                We'll depart Moshi for Londorossi Gate, taking about 4 hours.
                Here you will complete the entry formalities. Then you'll drive
                to the Lemosho trailhead (another hour to reach the trailhead).
                Upon arrival at the trailhead, we'll eat lunch, and then
                commence through the undisturbed forest which winds to the first
                campsite.
              </p>

              <p className="text-gray-700 mb-4 font-medium text-sm md:text-base">
                {day.plan}
              </p>

              <div
                className="bg-gray-100 rounded-lg overflow-hidden w-full md:w-1/2"
                style={{ height: "clamp(300px, 40vh, 468px)" }}
              >
                <img
                  src={day.bannerImage}
                  className="w-full h-full object-cover"
                  alt={`Day ${day.day} activity`}
                  onError={(e) => {
                    e.target.src = "/images/default-schedule.jpg";
                  }}
                />
              </div>
            </div>
          </div>
        ))}
        <div className="mb-8 md:mb-12">
          <div className="flex items-start gap-2 mb-4">
            <div className="w-2 h-2 mt-2 rounded-full bg-[#e27160]"></div>
            <h3 className="text-lg font-bold">
              End of Tour
            </h3>
          </div>

          <div className="border-l-2 border-[#e27160] pl-4 md:pl-6 ml-1">
            <ul className="space-y-1 text-black list-disc list-inside">
              <li>
                Additional accommodation can be arranged for an extra cost.
              </li>
              <li>You'll be dropped off at the airport.</li>
            </ul>
          </div>
        </div>
       
      </div>
    </>
  );
}
