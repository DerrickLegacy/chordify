import React from "react";
import AnimatedCard from "../../components/card/AnimatedCard";
import SectionHeader from "../../components/section_header/SectionHeader";
import useAxiosGetFetch from "../../components/api_methods/events/useAxiosGetFetch";

export default function Contact() {
  const aboutUsUrl =
    "http://54.210.95.246:3005/api/v1/contact";

  const {
    response: contactUsResponses,
    loading: contactUsLoading,
    error: contactUsError,
  } = useAxiosGetFetch(aboutUsUrl);

  const isLoading = contactUsLoading;

  const hasError = contactUsError;

  if (isLoading)
    return <div className="text-center py-20">Loading events...</div>;
  if (hasError)
    return (
      <div className="text-center py-20 text-red-500">
        Error loading data. Please try again later.
      </div>
    );

  const cards = [
    {
      id: 1,
      title: "Get In Touch",
      description:
        "Have questions about our adventures? Our team is ready to help you plan your perfect trip.",
    },
    {
      id: 2,
      title: "Support",
      description:
        "Need assistance with an existing booking? Contact our support team for quick help.",
    },
  ];

  const pageDetails = {
    mainText: "Us",
    minorText: "Contact",
    description:
      "We're here to help you with any questions about your adventure. Reach out to us anytime!",
  };
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto ">
        <SectionHeader
          mainText={pageDetails.mainText}
          minorText={pageDetails.minorText}
          description={pageDetails.description}
        />
         {/* sm:max-h-7 max-w-6xl mx-auto */}

        <div className="grid grid-cols-2 md:grid-cols-2 gap-8">
          {contactUsResponses &&
            Array.isArray(contactUsResponses) &&
            contactUsResponses.length > 0 && (
              contactUsResponses.map((contactUsResponse,index) => (
                <AnimatedCard
                  key={index}
                  title={contactUsResponse.name}
                  description={contactUsResponse.name}
                  address={contactUsResponse.address}
                  office_timings={contactUsResponse.office_timings}
                  contact_numbers={contactUsResponse.contact_numbers}
                  className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow"
                />
              ))
            )}


          
        </div>
      </div>
    </section>
  );
}
