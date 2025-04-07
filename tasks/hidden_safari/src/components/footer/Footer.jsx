import React from "react";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { RiYoutubeFill } from "react-icons/ri";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-amber-700 h-60 flex flex-col">
      <div className="flex items-center justify-center mt-4">
        <h1 className="text-4xl text-black font-bold">Hidden Safari</h1>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 w-10/12 sm:w-5/12 mx-auto mt-4 text-black font-bold text-center">
        <div className="hover:text-amber-300">Teams</div>
        <div className="hover:text-amber-300">About</div>
        <div className="hover:text-amber-300">Events</div>
        <div className="hover:text-amber-300">Contact Us</div>
        <div className="hover:text-amber-300">Terms and Conditions</div>
      </div>

      <div className="grid grid-cols-2 w-full mt-4 text-black font-bold">
        <div className="ml-96">
          <input
            className="shadow border rounded w-48 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="search"
            type="text"
            placeholder="Search"
          />
        </div>

        <div className="mr-96 flex justify-end items-center space-x-4">
          <a
            href="#"
            aria-label="LinkedIn"
            className="text-black font-bold hover:text-amber-300"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="#"
            aria-label="Facebook"
            className="text-black font-bold hover:text-amber-300"
          >
            <FaFacebook size={24} />
          </a>
          <a
            href="#"
            aria-label="YouTube"
            className="text-black font-bold hover:text-amber-300"
          >
            <RiYoutubeFill size={24} />
          </a>
        </div>
      </div>

      <div className="mt-auto flex justify-center pb-4">
        <p className="text-black font-bold text-sm">
          Copyright © Hidden Safari {currentYear}
        </p>
      </div>
    </footer>
  );
}