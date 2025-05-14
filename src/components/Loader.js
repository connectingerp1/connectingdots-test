"use client";

import { useState, useEffect } from "react";
import AnimatedLogo from "./AnimatedLogo";
import styles from "@/styles/Loader.module.css";

const loadingMessages = [
  "Loading your course content...",
  "Preparing learning materials...",
  "Setting up your learning environment...",
  "Getting the latest content for you...",
  "Almost there...",
  "Connecting to the knowledge base...",
  "Personalizing your experience...",
];

const Loader = () => {
  const [currentMessage, setCurrentMessage] = useState(loadingMessages[0]);
  const [messageKey, setMessageKey] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Change the message every 2.5 seconds
    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => {
        const currentIndex = loadingMessages.indexOf(prev);
        const nextIndex = (currentIndex + 1) % loadingMessages.length;
        return loadingMessages[nextIndex];
      });
      setMessageKey(prevKey => prevKey + 1);
      
      // Update progress based on message index
      setProgress(prev => {
        const increment = 100 / loadingMessages.length;
        return (prev + increment) % 100;
      });
    }, 2500);

    return () => clearInterval(messageInterval);
  }, []);
  
  // Mouse interaction effects
  const handleMouseEnter = () => {
    setIsHovering(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div 
      className={styles.loaderContainer}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className={styles.loaderContent} 
        style={{ 
          transform: isHovering ? 'translateY(-5px) scale(1.02)' : 'translateY(0) scale(1)',
        }}
      >
        <div className={styles.logoWrapper}>
          <AnimatedLogo />
        </div>
        
        <div className={styles.messageContainer}>
          <p key={messageKey} className={styles.message}>{currentMessage}</p>
        </div>
        
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill} 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <div className={styles.loadingDots}>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;