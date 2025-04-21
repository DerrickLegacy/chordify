import React from "react";

export default function Video() {
  return (
    <div id="videos" className="w-full overflow-x-auto whitespace-nowrap p-4">
      <div className="inline-flex gap-1">
        {[1, 2, 3, 4, 5].map((index) => (
          <div
            key={index}
            className="inline-block transition-transform duration-300 ease-in-out hover:scale-95"
          >
            <iframe
              src="https://www.youtube.com/embed/tgbNymZ7vqY"
              title={`Video ${index}`}
              className="md:w-[500px] sm:w-[100px]  md:h-[500px] rounded-lg shadow-lg border-none"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
}
