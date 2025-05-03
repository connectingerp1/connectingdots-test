"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "@/styles/AnimatedLogo.module.css";

const AnimatedLogo = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={styles.logoContainer}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Three custom lines with different positions and rotations */}
      <div className={styles.linesContainer}>
        <div
          className={`${styles.arcLine} ${styles.line1} ${isHovered ? styles.hovered : ""}`}
        ></div>
        <div
          className={`${styles.arcLine} ${styles.line2} ${isHovered ? styles.hovered : ""}`}
        ></div>
        <div
          className={`${styles.arcLine} ${styles.line3} ${isHovered ? styles.hovered : ""}`}
        ></div>
      </div>

      {/* Center Arrow with up-down animation */}
      <div
        className={`${styles.centerArrow} ${isHovered ? styles.hovered : ""}`}
      >
        <Image
          src="/Navbar/arrow.png"
          alt="Connecting Dots Logo"
          width={180}
          height={180}
          priority={true}
        />
      </div>
    </div>
  );
};

export default AnimatedLogo;
