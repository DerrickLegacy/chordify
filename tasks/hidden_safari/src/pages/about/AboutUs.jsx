import React from "react";
import { useInView } from "react-intersection-observer";
import SectionHeader from "../../components/section_header/SectionHeader";
import TextDisplayCard from "../../components/card/TextDisplayCard";
import useAxiosGetFetch from "../../components/api_methods/events/useAxiosGetFetch";

export default function AboutUs() {
  const aboutUsUrl = "http://54.210.95.246:3005/api/v1/info/about-us";

  const {
    response: aboutUsResponse,
    loading: aboutUsLoading,
    error: aboutUsError,
  } = useAxiosGetFetch(aboutUsUrl);

  const isLoading = aboutUsLoading;
  const hasError = aboutUsError;

  if (isLoading)
    return <div className="text-center py-20">Loading events...</div>;
  if (hasError)
    return (
      <div className="text-center py-20 text-red-500">
        Error loading data. Please try again later.
      </div>
    );
  const cardData = [
    {
      id: 1,
      title: "Vision",
      description:
        "Keeping the core values and the ethics in center, HiddenSafari – the NGO will be a benchmark in training the youth for a better situation. The NGO will work for enhancement of all good qualities in the modern youth with a brighter waw",
    },
    {
      id: 2,
      title: "Mission",
      description:
        "The motive of the NGO is to moderate the young thinking for a happy and developed world. The youth become responsible and understand their own need for the society and country is the heart value of the mission…",
    },
    {
      id: 3,
      title: "Values",
      description:
        "The idea of establishing NGO came up during the various activities with other NGOs as a part of collaboration with NSS/NCC in college activities. It was a very clear view behind the organization that it will be for young people and specially students development activities will be given priority.Keeping the ethics and value system in center, the NGO has thought for such activities, which will fill valuable qualities in the youth. NGO is thankful to all the young students of various colleges who are voluntarily giving a boost to the activities. For spreading awareness in the field of adventure, NGO has planned some very charming events as per regular basis.",
    },
  ];

  const pageDetails = {
    minorText: "About",
    mainText: "Us",
    description: "Who we are and where do we Stand.",
  };

  return (
    <>
      <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            mainText={pageDetails.mainText}
            minorText={pageDetails.minorText}
            description={pageDetails.description}
          />
          <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
            {cardData.map((card) => {
              return (
                <TextDisplayCard
                  key={card.id}
                  title={card.title}
                  description={card.description}
                  className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow"
                />
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
