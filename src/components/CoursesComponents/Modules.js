// components/CoursesComponents/Modules.js (Updated Modules)
"use client";

import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import styles from "@/styles/CoursesComponents/Modules.module.css";
// Removed: CityContext import, as city is no longer directly used for data fetching

const Modules = ({ data }) => {
  const [activeTab, setActiveTab] = useState("beginner");
  const [activeModule, setActiveModule] = useState(0);
  // Removed: [data, setData] = useState(null);
  // Removed: [loading, setLoading] = useState(true);
  // Removed: [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const moduleRef = useRef(null);
  const observerRef = useRef(null);

  // Set initial activeTab once data is available
  useEffect(() => {
    if (data && data.tabs && data.tabs.length > 0) {
      setActiveTab(data.tabs[0].type);
    }
  }, [data]);

  // Setup intersection observer to detect when component is visible
  useEffect(() => {
    if (!moduleRef.current || observerRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          observerRef.current.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observerRef.current.observe(moduleRef.current);

    // Cleanup
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Force visibility after a timeout to ensure rendering
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isVisible) {
        setIsVisible(true);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [isVisible]);

  // Removed: useEffect for data fetching and localStorage logic

  const handleModuleClick = useCallback(
    (moduleIndex) => {
      if (activeModule !== moduleIndex) {
        setActiveModule(moduleIndex);
      }
    },
    [activeModule]
  );

  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
    setActiveModule(0);
  }, []);

  const activeContent = useMemo(() => {
    if (data && data.tabs) {
      const activeTabData = data.tabs.find((tab) => tab.type === activeTab);
      if (activeTabData && activeTabData.modules && activeTabData.modules.length > activeModule) {
        return activeTabData.modules[activeModule];
      }
    }
    return null;
  }, [data, activeTab, activeModule]);

  // Simplified loading/error handling as data is passed directly
  if (!data) {
    return <div className={styles.loadingContainer}>No Modules data available (check masterData.js or prop passing).</div>;
  }
  // No separate error state, as `data` would be null if there was an upstream error.

  // Ensure data.tabs and activeTab content exists before trying to access modules
  const currentTabData = data.tabs.find((tab) => tab.type === activeTab);
  if (!currentTabData) {
    return <div className={styles.errorContainer}>Selected tab data not found.</div>;
  }

  return (
    <div className={styles.containerDs} ref={moduleRef}>
      <div className={styles.headerDs}>
        <h1>{data.title}</h1>
      </div>
      <div className={styles.tabs}>
        {data.tabs.map((tab) => (
          <div
            key={tab.type}
            className={`${styles.tab} ${
              activeTab === tab.type ? styles.tabActive : ""
            }`}
            onClick={() => handleTabChange(tab.type)}
          >
            <p>{tab.type.charAt(0).toUpperCase() + tab.type.slice(1)}</p>
            <span
              className={activeTab === tab.type ? styles.tabSpanActive : ""}
            >
              {tab.duration}
            </span>
          </div>
        ))}
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.content}>
          {currentTabData.modules.map((module, index) => (
              <div
                key={index}
                className={`${styles.module} ${
                  activeModule === index ? styles.moduleSelected : ""
                }`}
                onClick={() => handleModuleClick(index)}
              >
                <div className={styles.moduleHeader}>
                  <p>MODULE - {index + 1}</p>
                  <h2>{module.title}</h2>
                  <span>{module.duration}</span>
                </div>
              </div>
            ))}
        </div>
        <div className={styles.moduleDetailsContainer}>
          {activeContent && (
            <div className={styles.moduleDetails}>
              <h2>{activeContent.title}</h2>
              <p>
                <strong>Duration:</strong> {activeContent.duration}
              </p>
              <ul>
                {activeContent.content.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className={styles.footer}>
        <button className={styles.footerButton}>Download Curriculum</button> {/* This button could trigger a form or a direct download using a prop */}
      </div>
    </div>
  );
};

export default Modules;