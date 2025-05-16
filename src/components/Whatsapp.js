"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import styles from "@/styles/Whatsapp.module.css"; // Ensure correct import

const Whatsapp = ({ phoneNumber }) => {
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  // Check if current path is an admin path
  const isAdminPath = pathname && (
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/superadmin') ||
    pathname.startsWith('/AdminLogin')
  );

  // If on admin page, don't render the component
  if (isAdminPath) {
    return null;
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust breakpoint as needed
    };

    handleResize(); // Check on initial render
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isMobile) {
    return null; // Don't render on mobile screens
  }

  const handleWhatsAppClick = () => {
    const formattedPhoneNumber = phoneNumber.replace(/[^0-9]/g, "").replace(/^0+/, "");
    const whatsappURL = `https://wa.me/${formattedPhoneNumber}`;
    window.open(whatsappURL, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={styles.floatingWhatsappContainer}>
      <div className={styles.floatingWhatsapp} onClick={handleWhatsAppClick}>
        <FontAwesomeIcon icon={faWhatsapp} size="2x" />
      </div>
    </div>
  );
};

export default Whatsapp;
