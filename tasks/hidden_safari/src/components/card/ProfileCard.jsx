import React from "react";
import { FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa";

export default function ProfileCard({ profile }) {
  return (
    <article className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group flex flex-col h-full">
      <div className="relative h-96 w-full">
        {profile.image ? (
          <img
            src={`${profile.image}`}
            alt={profile.name}
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-500">
            <svg
              className="w-16 h-16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        )}
      </div>

      <div className="p-6 text-center flex-grow flex flex-col">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-800 group-hover:text-[#e27160] transition-colors">
            {profile.name || "William Henry"}
          </h2>
          <p className="text-gray-600 mt-1">
            {profile.title || "Project Leader"}
          </p>
        </div>

        <div className="flex justify-center space-x-4 mb-6">
          <a
            href="#"
            className="text-[#0077b5] hover:text-[#e27160] transition-colors"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="text-xl" />
          </a>
          <a
            href="#"
            className="text-[#D44638] hover:text-[#e27160] transition-colors"
            aria-label="Gmail"
          >
            <FaEnvelope className="text-xl" />
          </a>
          <a
            href="#"
            className="text-[#34B7F1] hover:text-[#e27160] transition-colors"
            aria-label="Phone"
          >
            <FaPhone className="text-xl" />
          </a>
        </div>

        <button className="mt-auto w-full bg-gradient-to-r from-[#e27160] to-orange-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center">
          Contact
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </button>
      </div>
    </article>
  );
}
