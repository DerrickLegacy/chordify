import React from "react";

export default function Footer() {
  return (
    <div>
      <footer className="bg-gray-800 text-white py-6 px-4">
        <div className="container mx-auto ">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              &copy; 2025 My App. All rights reserved.
            </div>

            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-400">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-gray-400">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
