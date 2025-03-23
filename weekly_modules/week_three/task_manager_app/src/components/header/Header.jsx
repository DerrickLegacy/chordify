import React from "react";

export default function Header() {
  return (
    <div className="bg-[#cccccc] text-black p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">Task Manager</div>

        <div className="flex items-center">
          <span className="mr-2">Manager Derrick</span>
          <img
            src="/images/avatar.png"
            alt="User Avatar"
            className="rounded-full h-10 w-10"
          />
        </div>
      </div>
    </div>
  );
}
