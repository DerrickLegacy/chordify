import React, { useState, useEffect } from "react";
import Greetings from "../greetings/Greetings";

export default function CaptureBioData() {
  const [receivedMessage, setReceivedMessage] = useState("");
  const [showGreetings, setShowGreetings] = useState(true);
  const [randomColorNo, setRandomColorNo] = useState(null);

  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500 row-span-3",
    "bg-purple-500",
    "bg-pink-400",
    "bg-indigo-500 col-span-3 row-span-3",
    "bg-gray-500",
    "bg-gray-500",
    "bg-orange-500 col-span-2",
    "bg-cyan-300",
    "bg-teal-500",
    "bg-rose-500",
    "bg-emerald-500",
    "bg-lime-300",
    "bg-green-100",
    "bg-teal-400",
    "bg-sky-500",
  ];

  const getRandomNumber = () => {
    return Math.floor(Math.random() * colors.length);
  };

  useEffect(() => {
    if (!showGreetings) {
      setRandomColorNo(getRandomNumber());
    }
  }, [showGreetings]);

  const handleReceivingMessage = (newMessage) => {
    setReceivedMessage(newMessage);
    setShowGreetings(false);
  };

  return (
    <>
      {showGreetings ? (
        <Greetings onNameChange={handleReceivingMessage} />
      ) : (
        <div className="p-5">
          <h1>{receivedMessage}</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 gap-4 grid-flow-dense">
            {colors.map((color, index) => (
              <div
                key={index}
                className={`${color} rounded-lg shadow-xl min-h-[100px] flex items-center justify-center text-blue-50`}
              >
                {randomColorNo === index ? "This is your random lucky color" : null}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}