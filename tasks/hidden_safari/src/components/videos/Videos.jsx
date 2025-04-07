import React from "react";
import Video from "../../components/card/VideoClip";

export default function Videos() {
  return (
    <>
      <section className="bg-[#eeada6] py-16">
        <div className="px-6 md:px-12 max-w-[80%] mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold text-[#c0392b]">
              Experience Yourself
            </h2>
            <h3 className="text-xl md:text-2xl text-gray-800 mt-2">
              Exclusive footage from our camps
            </h3>
            <p className="text-gray-700 mt-2 text-base max-w-2xl mx-auto">
              Dive into our best camp experiences and feel the thrill, nature,
              and spirit of adventure through these exclusive videos.
            </p>
          </div>
          <div className="flex flex-wrap overflow-x-auto">
            <Video />
          </div>
        </div>
      </section>
    </>
  );
}
