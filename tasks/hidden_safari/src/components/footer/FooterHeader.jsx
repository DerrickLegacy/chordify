import React from "react";
import { Link } from "react-router-dom";

export default function FooterHeader({title,url}) {
  return (
    <div  className="hover:text-amber-300">
      <Link
        to={url}
        className="hover:text-amber-300"
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        <div className="hover:text-amber-300">{title}</div>
      </Link>
    </div>
  );
}
