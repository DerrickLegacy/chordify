import React from "react";
import Carousel from "../../components/carousel/Carousel";
import SectionHeader from "../../components/section_header/SectionHeader";

export default function EventDetails() {
  const images = [
    "/images/hiker.jpg",
    "/images/hiker.jpg",
    "/images/summer-logo_54199-1862.avif",
    "/images/hiker.jpg",
  ];

  return (
    <div className="w-full md:w-4/5 mx-auto">
      <section className="pt-22 pb-16 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="h-[400px] mb-10 px-4">
          <Carousel images={images} fullWidth={true} />
        </div>
      </section>
    </div>
  );
}
