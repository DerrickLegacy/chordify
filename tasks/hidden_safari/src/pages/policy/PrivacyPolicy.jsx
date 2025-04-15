import React from "react";
import SectionHeader from "../../components/section_header/SectionHeader";
import PolicyCard from "../../components/card/TextDisplayCard";

export default function PrivacyPolicy() {
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
    mainText: "Privacy Policy",
    minorText: "Our",
    description:
      "Your privacy is important to us. This policy outlines how we collect, use, and protect your information.",
  };

  const policyDetails = [
    {
      id: 1,
      title: "Guarantee Of Confidentiality",
      description:
        "We are committed to protecting your privacy online. Our privacy policy is designed to give you peace of mind and confidence. We may change this policy from time to time by updating this page and you should check this page to ensure that you are happy with any changes. This policy is effective from 1st of December 2021 onwards",
    },
    {
      id: 2,
      title: "Cookie Usage",
      description:
        "We use cookies on our website for a variety of reasons. Cookies help us identify the device you are using and how you use our website, but not you personally. Cookies record anonymous information about visits and clicks on each webpage. Cookies are small files which are stored on your computer when you visit a website. However, they cannot be used to identify you personally and they are not harmful to your computer. They are essential for several features of our website to work, they help us to identify which pages are being used, and to analyse data and improve our site. We use this information for statistical analysis purposes only and they in no way give us any information about you. If you choose, you can opt out by turning off cookies in the preferences settings in your web browser.",
    },
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          mainText={pageDetails.mainText}
          minorText={pageDetails.minorText}
          description={pageDetails.description}
        />

        <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
          {policyDetails.map((card) => {
            const enableHowToContact = card.title !== "Guarantee Of Confidentiality";
            return (
              <PolicyCard
                key={card.id}
                title={card.title}
                description={card.description}
                enableHowToContact={enableHowToContact}
                className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow"
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
