import React from "react";
import { Link } from "react-router-dom";

export default function SpaceCard({spaceID,SpaceName,Description}) {
    const url ="manage-space-/" + spaceID;
  return (
    <div className="mb-6 sm:max-w-sm max-w-sm md:max-w-md rounded overflow-hidden shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
      <div className="px-6 py-4">
        <div className="font-bold text-2xl mb-2">{SpaceName}</div>
        <p className="text-gray-700 text-base overflow-hidden overflow-ellipsis line-clamp-3 min-h-24 max-h-24">
          {Description}
        </p>
        <hr className="my-2" />
      </div>
      <div className="px-6 pt-4 pb-2">
        <Link to={url}>
          <span className="text-white inline-block bg-blue-700 hover:bg-blue-800 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
            Manage Space
          </span>
        </Link>
        <span className="inline-block bg-red-700 hover:bg-red-900 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">
          Delete
        </span>
      </div>
    </div>
  );
}
