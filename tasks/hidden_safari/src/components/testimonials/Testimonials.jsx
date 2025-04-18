import React from "react";
import { useScrollVisibility } from "../hooks/useScrollVisibility";
import useAxiosGetFetch from "../../components/api_methods/events/useAxiosGetFetch";
// import { FaRegStarHalfStroke } from "@heroicons/react/24/solid";
import { StarsIcon } from "lucide-react";
import { FaRegStarHalfStroke } from "react-icons/fa6";

export default function Testimonials() {
  const { ref: boxRef, style: visibilityStyle } = useScrollVisibility({
    fadeStart: 0.2,
    fadeEnd: 0.8,
    minScale: 0.75,
    transitionDuration: 900,
    animationDirection: "right",
  });

  const testimonialUrl = "http://54.210.95.246:3005/api/v1/info/testimonials";

  const {
    response: testimoniaResponse = [],
    loading: testimoniaLoading,
    error: testimoniaError,
  } = useAxiosGetFetch(testimonialUrl);

  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaRegStarHalfStroke key={`full-${i}`} className="w-5 h-5 text-yellow-500 fill-current" />);
    }

    if (hasHalfStar) {
      stars.push(<StarsIcon key="half" className="w-5 h-5 text-yellow-500 fill-current" />);
    }

    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaRegStarHalfStroke key={`empty-${i}`} className="w-5 h-5 text-gray-300 fill-current" />);
    }

    return stars;
  };

  if (testimoniaLoading) {
    return (
      <div className="bg-[#fff8f7] py-20">
        <div className="px-6 md:px-12 mx-auto max-w-7xl text-center">
          <div className="animate-pulse space-y-8">
            <div className="h-12 w-64 mx-auto bg-[#eed8d5] rounded"></div>
            <div className="h-6 w-80 mx-auto bg-[#eed8d5] rounded"></div>
            
            <div className="grid md:grid-cols-2 gap-10 mt-12">
              <div className="space-y-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center bg-[#eed8d5] p-5 rounded-xl">
                    <div className="w-16 h-16 rounded-full bg-[#f7e9e7] mr-5"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-3/4 bg-[#f7e9e7] rounded"></div>
                      <div className="h-4 w-1/2 bg-[#f7e9e7] rounded"></div>
                      <div className="h-12 w-full bg-[#f7e9e7] rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                <div className="h-8 w-40 bg-[#eed8d5] rounded"></div>
                <div className="h-24 w-full bg-[#f7e9e7] rounded"></div>
                <div className="h-24 w-full bg-[#f7e9e7] rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (testimoniaError) {
    return (
      <div className="bg-[#fff8f7] py-20">
        <div className="px-6 md:px-12 mx-auto max-w-7xl text-center">
          <div className="p-8 bg-red-50 rounded-xl border border-red-100">
            <h3 className="text-2xl font-medium text-red-600 mb-4">Oops! Something went wrong</h3>
            <p className="text-gray-700 mb-6">We couldn't load the testimonials. Please try again later.</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-[#c0392b] text-white rounded-lg hover:bg-[#a53125] transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section
      ref={boxRef}
      style={visibilityStyle}
      className="bg-[#fff8f7] py-16"
    >
      <div className="px-6 md:px-12 mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#c0392b] mb-3">
            Why People ❤️ Invincible
          </h2>
          <h3 className="text-xl md:text-2xl text-gray-800">
            Experience the best with us
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            {testimoniaResponse.map((data, index) => (
              <div
                key={index}
                className="flex items-start bg-white hover:bg-[#fff8f7] transition-all p-6 rounded-xl shadow-sm hover:shadow-md border border-[#f0e6e4]"
              >
                <img
                  src={data.profileImage}
                  alt={data.name}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover mr-5 border-2 border-[#f0e6e4] flex-shrink-0"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/100?text=Avatar";
                  }}
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-lg md:text-xl font-semibold text-gray-900">
                        {data.name}
                      </p>
                      <p className="text-sm md:text-base text-gray-500">
                        {data.role}
                      </p>
                    </div>
                    <div className="flex">
                      {data.rating && renderRatingStars(data.rating)}
                    </div>
                  </div>
                  <p className="mt-3 text-gray-700 italic">
                    "{data.review}"
                  </p>
                  {data.date && (
                    <p className="mt-2 text-xs text-gray-400">
                      {new Date(data.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col justify-center space-y-6 p-6 bg-[#f7e9e7] rounded-xl">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <FaRegStarHalfStroke key={i} className="w-8 h-8 text-yellow-500 fill-current" />
              ))}
              <span className="ml-2 text-xl font-semibold text-gray-800">5.0</span>
            </div>
            
            <h4 className="text-2xl font-bold text-[#c0392b]">
              What Makes Us Special
            </h4>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-[#c0392b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="ml-3 text-lg leading-relaxed text-gray-800">
                  Affordable trekking experiences with our non-profit efforts
                </p>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-[#c0392b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="ml-3 text-lg leading-relaxed text-gray-800">
                  Expert trek leaders ensuring your safety and enjoyment
                </p>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-[#c0392b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="ml-3 text-lg leading-relaxed text-gray-800">
                  Healthy and delicious meals prepared by our skilled cooks
                </p>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-[#c0392b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="ml-3 text-lg leading-relaxed text-gray-800">
                  Unforgettable memories in the heart of nature
                </p>
              </div>
            </div>
            
            <button className="mt-4 px-6 py-3 bg-[#c0392b] text-white rounded-lg hover:bg-[#a53125] transition-colors font-medium self-start">
              Join Our Next Adventure
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}