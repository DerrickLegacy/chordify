import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { FaRegEye } from "react-icons/fa";
import { LiaCookieSolid } from "react-icons/lia";
import { Link } from "react-router-dom";

export default function TextDisplayCard({
  title,
  description,
  enableHowToContact = false,
}) {
  const [showHowToContact, setShowHowToContact] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    setShowHowToContact(enableHowToContact);
  }, [enableHowToContact]);

  // Dynamically assign icon component based on enableHowToContact
  const Icon = enableHowToContact ? FaRegEye : LiaCookieSolid;

  return (
    
    <div
      ref={ref}
      className={`bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 h-full flex flex-col
        ${
          inView
            ? "animate-fade animate-slide-up opacity-100"
            : "opacity-0 translate-y-10"
        }`}
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>

      <div className="flex items-start mb-4">
        <Icon className="text-[#e27160] text-xl mt-1 mr-3 flex-shrink-0" />
        <div>
          {description.split(".").map((line, index) => (
            <p key={index} className="pt-2 text-gray-600">
              {line.trim()}
              {index < description.split(".").length - 1 && "."}
            </p>
          ))}

          {showHowToContact && (
            <p className="text-gray-600 mt-3.5">
              Learn more about
              <Link
                to="/about"
                className="px-1.5 mt-auto inline-flex items-center font-semibold text-sm hover:underline text-[#f84d32] hover:text-orange-600 transition-colors"
              >
                who we
              </Link>
              are and how you can
              <Link
                to="/contact"
                className="px-1.5 mt-auto inline-flex items-center font-semibold text-sm hover:underline text-[#f84d32] hover:text-orange-600 transition-colors"
              >
                contact us
              </Link>
              regarding how we process personal data in our Privacy Policy.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
