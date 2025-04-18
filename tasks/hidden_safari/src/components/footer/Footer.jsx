import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FooterHeader from "./FooterHeader";
import FooterContent from "./FooterContent";

export default function Footer() {
  const location = useLocation();
  const [showFooter, setShowFooter] = useState(true);

  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/register") {
      setShowFooter(false);
    } else {
      setShowFooter(true);
    }
  }, [location.pathname]);

  const currentYear = new Date().getFullYear();

  return showFooter ? (
    <div>
      <FooterContent currentYear={currentYear} />
    </div>
  ) : null;
}
