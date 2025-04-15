import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaHouseChimneyWindow,
  FaMountain,
  FaPeopleGroup,
  FaPhone,
  FaTable,
} from "react-icons/fa6";
import { IoPersonCircleOutline } from "react-icons/io5";

export default function TopHeader() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const closeDropdown = () => setDropdownOpen(false);

  return (
    <header className="fixed z-50 w-full bg-[#e27160] shadow-md">
      <div className="flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <h1 className="text-3xl text-white font-bold">HiddenSafari</h1>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 items-center relative">
          <Link to="/" className="flex items-center space-x-2 text-white font-semibold">
            <FaHouseChimneyWindow />
            <span>Home</span>
          </Link>
          <Link to="/events" className="flex items-center space-x-2 text-white font-semibold">
            <FaMountain />
            <span>Events</span>
          </Link>
          <Link to="/team" className="flex items-center space-x-2 text-white font-semibold">
            <FaPeopleGroup />
            <span>Team</span>
          </Link>
          <Link to="/about" className="flex items-center space-x-2 text-white font-semibold">
            <FaTable />
            <span>About</span>
          </Link>
          <Link to="/contact" className="flex items-center space-x-2 text-white font-semibold">
            <FaPhone />
            <span>Contact</span>
          </Link>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={toggleDropdown}
              className="flex items-center space-x-1 text-white focus:outline-none"
            >
              <IoPersonCircleOutline size={30} />
              <svg
                className={`w-4 h-4 transform transition-transform ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown */}
            {dropdownOpen && (
              <ul className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50">
                <li>
                  <button
                    onClick={() => {
                      closeDropdown();
                      // Add logout logic here
                    }}
                    className="w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 text-left"
                  >
                    Sign out
                  </button>
                </li>
              </ul>
            )}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="text-white text-2xl focus:outline-none">☰</button>
        </div>
      </div>
    </header>
  );
}
