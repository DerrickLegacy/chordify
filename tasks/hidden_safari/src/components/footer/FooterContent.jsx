import React from 'react'
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { RiYoutubeFill } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import FooterHeader from './FooterHeader';

export default function FooterContent({currentYear}) {
  return (
    <div>
        
    <footer className="bg-amber-700 py-8 px-4">
      <div className="flex justify-center mb-4">
        <h1 className="text-3xl sm:text-4xl text-white font-bold">
          Hidden Safari
        </h1>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-4 w-full max-w-4xl mx-auto text-white font-bold text-center mb-6">
        <FooterHeader title={"Home"} url={"/"} />
        <FooterHeader title={"Teams"} url={"/team"} />
        <FooterHeader title={"Events"} url={"/events"} />
        <FooterHeader title={"About"} url={"/about"} />
        <FooterHeader title={"Contact Us"} url={"/contact"} />
        <FooterHeader title={"Privacy"} url={"/privacy-policy"} />
        <FooterHeader title={"Terms and Conditions"} url={"/terms-and-conditions"} />
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-5xl mx-auto px-4 gap-4">
        <div className="w-full md:w-auto">
          <input
            className="shadow border rounded w-full md:w-64 py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            id="search"
            type="text"
            placeholder="Search"
          />
        </div>

        <div className="flex justify-center space-x-6">
          <a
            href="#"
            aria-label="LinkedIn"
            className="text-white hover:text-amber-300"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="#"
            aria-label="Facebook"
            className="text-white hover:text-amber-300"
          >
            <FaFacebook size={24} />
          </a>
          <Link
            to="#"
            aria-label="YouTube"
            className="text-white hover:text-amber-300"
          >
            <RiYoutubeFill size={24} />
          </Link>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <p className="text-white font-bold text-sm text-center">
          Copyright © Hidden Safari {currentYear}
        </p>
      </div>
    </footer>
    </div>
  )
}
