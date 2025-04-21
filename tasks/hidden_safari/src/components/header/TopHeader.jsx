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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const userData = localStorage.getItem("hidden_safari_user");
  const parsedUser = userData ? JSON.parse(userData) : null;

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const handleShowMyProfile = () => {
    setDropdownOpen(false);
    navigate("/user-profile");
  };

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
        {/* Logo + Title */}
        <Link
          to="/"
          className="flex items-center space-x-2 text-3xl text-white font-bold"
        >
          <img
            src="/images/summer-logo_54199-1862.avif"
            alt="Hidden Safari Logo"
            className="h-10 md:h-14 w-auto border-8 border-white rounded-full"
          />
          <span>HiddenSafari</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 items-center relative">
          <Link
            to="/"
            className="flex items-center space-x-2 text-white font-semibold text-lg hover:underline hover:text-yellow-100 transition-colors"
          >
            <FaHouseChimneyWindow />
            <span>Home</span>
          </Link>
          <Link
            to="/events"
            className="flex items-center space-x-2 text-white font-semibold text-lg hover:underline hover:text-yellow-100 transition-colors"
          >
            <FaMountain />
            <span>Events</span>
          </Link>
          <Link
            to="/team"
            className="flex items-center space-x-2 text-white font-semibold text-lg hover:underline hover:text-yellow-100 transition-colors"
          >
            <FaPeopleGroup />
            <span>Team</span>
          </Link>
          <Link
            to="/about"
            className="flex items-center space-x-2 text-white font-semibold text-lg hover:underline hover:text-yellow-100 transition-colors"
          >
            <FaTable />
            <span>About</span>
          </Link>
          <Link
            to="/contact"
            className="flex items-center space-x-2 text-white font-semibold text-lg hover:underline hover:text-yellow-100 transition-colors"
          >
            <FaPhone />
            <span>Contact</span>
          </Link>

          {/* User Dropdown */}
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
                      onClick={handleShowMyProfile}
                      className="w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 text-left"
                    >
                      My Profile
                    </button>
                  </li>
                  <hr />
                  <li>
                    <button
                      onClick={handleSignOut}
                      className="w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 text-left "
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

      {/* Mobile Nav Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden px-6 pb-4 space-y-3 bg-[#e27160]">
          <Link
            to="/"
            className="block text-white font-semibold text-lg hover:underline"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/events"
            className="block text-white font-semibold text-lg hover:underline"
            onClick={() => setMobileMenuOpen(false)}
          >
            Events
          </Link>
          <Link
            to="/team"
            className="block text-white font-semibold text-lg hover:underline"
            onClick={() => setMobileMenuOpen(false)}
          >
            Team
          </Link>
          <Link
            to="/about"
            className="block text-white font-semibold text-lg hover:underline"
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="block text-white font-semibold text-lg hover:underline"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact
          </Link>

          {parsedUser?.loggedIn && (
            <button
              onClick={handleSignOut}
              className="w-full text-left text-red-200 font-semibold text-lg hover:underline"
            >
              Sign out
            </button>
          )}
        </div>
      )}
    </header>
  );
}
