import React from "react";

export default function SectionHeader({ mainText, minorText, description }) {
  return (
    <div>
      <header className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 mt-14">
          {minorText} <span className="text-[#f84d32]">{mainText}</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">{description} </p>
      </header>
    </div>
  );
}
