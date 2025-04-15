import { useInView } from "react-intersection-observer";
import {
  MdOutlinePhone,
  MdOutlineLocationOn,
  MdOutlineSchedule,
  MdArrowOutward,
} from "react-icons/md";

export default function AnimatedCard({ title, description }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

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
        <MdOutlineLocationOn className="text-[#e27160] text-xl mt-1 mr-3 flex-shrink-0" />
        <div>
          <p className="text-gray-600">308, University, Above Chocolate Room</p>
          <p className="text-gray-600">ABC Cross Roads, XYZ,</p>
          <p className="text-gray-600">XXX, - 3X00X9</p>
        </div>
      </div>

      <div className="flex items-center mb-4">
        <MdOutlineSchedule className="text-[#e27160] text-xl mr-3" />
        <p className="text-gray-600">Office Timings: 11AM to 8PM</p>
      </div>

      <div className="flex items-center mb-6">
        <MdOutlinePhone className="text-[#e27160] text-xl mr-3" />
        <p className="text-gray-600">91-XXX6475XXX</p>
      </div>
      <div className="text-right">
        <a
          href="#"
          className=" mt-auto inline-flex items-center  font-semibold text-sm hover:underline text-[#f84d32]  hover:text-orange-600  transition-colors"
        >
          View On Map
          <MdArrowOutward className="ml-2" />
        </a>
      </div>
    </div>
  );
}
