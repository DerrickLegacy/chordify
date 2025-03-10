import React, { useState } from "react";

export default function Greetings({ onNameChange }) {
  const [inputValue, setInputValue] = useState("");

  const messageCategory = ["Good Morning", "Good Afternoon", "Good Evening"];
  let message = "";
  const timeOfTheDay = new Date().getHours();

  if (timeOfTheDay < 12) {
    message = messageCategory[0];
  } else if (timeOfTheDay < 16) {
    message = messageCategory[1];
  } else {
    message = messageCategory[2];
  }

  const handleNameChange = () => {
    const fullMessage = `${message}, ${inputValue}`;
    onNameChange(fullMessage);
  };

  return (
    <>
      <div className="flex justify-center items-center mb-4">
        <h1>Welcome, enter your name to continue</h1>
      </div>
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-1 gap-4 w-80">
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg placeholder-gray-400 cursor-text"
            value={inputValue} 
            onChange={(e) => setInputValue(e.target.value)} 
          />
          <button
            className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={handleNameChange}
          >
            Continue
          </button>
        </div>
      </div>
    </>
  );
}