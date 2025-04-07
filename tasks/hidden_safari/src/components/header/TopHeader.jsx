import React from "react";
import { Link } from "react-router-dom";
import {
  FaHouseChimneyWindow,
  FaMountain,
  FaPeopleGroup,
  FaPhone,
  FaTable,
} from "react-icons/fa6";

export default function TopHeader() {
  return (
    <>
      <div className="fixed z-50  w-full bg-white shadow-md">
        <div className="flex justify-between items-center px-6 py-4">
          <h1 className="text-3xl text-black font-bold">HiddenSafari</h1>
          <nav className="hidden md:flex space-x-6">
            <Link
              to="/"
              className="flex items-center space-x-2 text-gray-900 font-semibold"
            >
              <FaHouseChimneyWindow />
              <span>Home</span>
            </Link>
            <Link
              to="/events"
              className="flex items-center space-x-2 text-gray-900 font-semibold"
            >
              <FaMountain />
              <span>Events</span>
            </Link>
            <Link
              to="/team"
              className="flex items-center space-x-2 text-gray-900 font-semibold"
            >
              <FaPeopleGroup />
              <span>Team</span>
            </Link>
            <Link
              to="/about"
              className="flex items-center space-x-2 text-gray-900 font-semibold"
            >
              <FaTable />
              <span>About</span>
            </Link>
            <Link
              to="/contact"
              className="flex items-center space-x-2 text-gray-900 font-semibold"
            >
              <FaPhone />
              <span>Contact</span>
            </Link>
          </nav>

          <div className="md:hidden">
            <button className="text-black text-2xl focus:outline-none">
              ☰
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
