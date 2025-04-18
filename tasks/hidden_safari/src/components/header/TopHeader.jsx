import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // NEW
  const navigate = useNavigate();
  const userData = localStorage.getItem("hidden_safari_user");
  const parsedUser = userData ? JSON.parse(userData) : null;

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen); // NEW

  const handleSignOut = () => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);

    const user = localStorage.getItem("hidden_safari_user");
    if (user) {
      const parsedUser = JSON.parse(user);
      parsedUser.loggedIn = false;
      localStorage.setItem("hidden_safari_user", JSON.stringify(parsedUser));
    }

    navigate("/login");
  };

  return (
    <header className="fixed z-50 w-full bg-[#e27160] shadow-md">
      <div className="flex justify-between items-center px-6 py-4">
        <Link to="/" className="text-3xl text-white font-bold">HiddenSafari</Link>

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

          {parsedUser?.loggedIn && (
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

              {dropdownOpen && (
                <ul className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50">
                  <li>
                    <button
                      onClick={handleSignOut}
                      className="w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 text-left"
                    >
                      Sign out
                    </button>
                  </li>
                </ul>
              )}
            </div>
          )}
        </nav>

        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-white text-2xl focus:outline-none"
          >
            ☰
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden px-6 pb-4 space-y-2 bg-[#e27160]">
          <Link to="/" className="block text-white font-semibold" onClick={() => setMobileMenuOpen(false)}>
            Home
          </Link>
          <Link to="/events" className="block text-white font-semibold" onClick={() => setMobileMenuOpen(false)}>
            Events
          </Link>
          <Link to="/team" className="block text-white font-semibold" onClick={() => setMobileMenuOpen(false)}>
            Team
          </Link>
          <Link to="/about" className="block text-white font-semibold" onClick={() => setMobileMenuOpen(false)}>
            About
          </Link>
          <Link to="/contact" className="block text-white font-semibold" onClick={() => setMobileMenuOpen(false)}>
            Contact
          </Link>

          {parsedUser?.loggedIn && (
            <button
              onClick={handleSignOut}
              className="w-full text-left text-red-200 font-semibold hover:underline"
            >
              Sign out
            </button>
          )}
        </div>
      )}
    </header>
  );
}
