"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const FixedLogo = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 10); // Show when scrolling up or near top
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-2 right-8 z-50 transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <Image
        src="/Navbar/connecting dot erp logo.avif"
        alt="ERP Logo"
        width={170}
        height={100}
        className="object-contain"
      />
    </div>
  );
};

export default FixedLogo;
