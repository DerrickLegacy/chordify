import React, { useState, useEffect } from "react";

export default function Header() {
    const [time, setTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
      const timer = setInterval(() => {
        setTime(new Date().toLocaleTimeString());
      }, 1000);
  
      return () => clearInterval(timer); 
    }, []);
  return (
    <div className="grid grid-cols-3 gap-4 p-4  border-b-2 border-blue-500/50 hover:border-blue-500/10 mb-3">
        <div className="col-span-2">
          <h1 className="text-3xl font-bold text-blue-600">ToDo List App </h1>
        </div>
        <div className="flex justify-end text-right">
          <h2 className="text-2xl font-semibold text-gray-700">{time}</h2>
        </div>
      </div>
  )
}
