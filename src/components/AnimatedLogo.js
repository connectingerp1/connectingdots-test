"use client";

import Image from "next/image";
import styles from "@/styles/AnimatedLogo.module.css"; 

const AnimatedLogo = () => {
  return (
    <div className={styles.logoContainer}>
      {/* CSS-based lines (always visible) */}
      <div className={styles.linesContainer}>
        <div className={`${styles.arcLine} ${styles.line1}`}></div>
        <div className={`${styles.arcLine} ${styles.line2}`}></div>
        <div className={`${styles.arcLine} ${styles.line3}`}></div>
      </div>

      {/* Center Arrow with up-down animation */}
      <div className={styles.centerArrow}>
        <Image
          src="/Navbar/arrow.png"
          alt="Logo Arrow"
          width={22}
          height={22}
          priority={true}
        />
      </div>
    </div>
  );
};

export default AnimatedLogo;