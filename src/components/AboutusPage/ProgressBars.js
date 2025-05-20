"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/AboutPage/ProgressBars.module.css";

const ProgressBars = () => {
  const [isVisible, setIsVisible] = useState(false);

  const courses = [
    { name: "SAP FICO", percentage: 98, icon: "💼", description: "Financial Accounting & Controlling" },
    { name: "SAP MM", percentage: 95, icon: "🛒", description: "Materials Management" },
    { name: "SAP SD", percentage: 93, icon: "🚚", description: "Sales & Distribution" },
    { name: "SAP ABAP", percentage: 90, icon: "💻", description: "Development & Programming" },
    { name: "SAP HCM", percentage: 88, icon: "👥", description: "Human Capital Management" },
    { name: "SAP Basis", percentage: 85, icon: "🔧", description: "System Administration" },
    { name: "SAP S/4 HANA", percentage: 92, icon: "📊", description: "Next-Gen ERP Suite" },
  ];

  const industryData = [
    { name: "Manufacturing", adoption: 90 },
    { name: "IT & Consulting", adoption: 95 },
    { name: "Retail & FMCG", adoption: 75 },
    { name: "Banking & Finance", adoption: 80 },
    { name: "Healthcare", adoption: 70 }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const progressSection = document.querySelector(`.${styles.progressContainer}`);
    if (progressSection) {
      observer.observe(progressSection);
    }

    return () => {
      if (progressSection) {
        observer.unobserve(progressSection);
      }
    };
  }, []);

  return (
    <div className={`${styles.progressContainer} container-fluid`}>
      <div className="row">
        <div className="col-12">
          <h1 className={`${styles.title} mb-4`}>SAP Ecosystem Expertise</h1>
          <p className={styles.subtitle}>
            Our comprehensive curriculum covers the entire SAP landscape, with specialized focus on high-demand modules
          </p>
        </div>
      </div>

      <div className={`${styles.progressContent} row`}>
        {/* Left Side: SAP Module Progress Bars */}
        <div className={`${styles.progressBarsSection} col-lg-6 col-md-12 mb-4 mb-lg-0`}>
          <h2 className={styles.sectionTitle}>SAP Module Placement Success Rate</h2>

          {courses.map((course, index) => (
            <div
              className={`${styles.progressBarItem} ${isVisible ? styles.animate : ''}`}
              key={index}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className={styles.courseHeader}>
                <span className={styles.courseIcon}>{course.icon}</span>
                <div className={styles.courseInfo}>
                  <div className={styles.progressCourseName}>{course.name}</div>
                  <div className={styles.courseDescription}>{course.description}</div>
                </div>
                <div className={styles.progressPercentage}>
                  {isVisible ? course.percentage : 0}%
                </div>
              </div>
              <div className={styles.progressBarWrapper}>
                <div
                  className={styles.progressBarFill}
                  style={{
                    width: isVisible ? `${course.percentage}%` : '0%',
                    background: `linear-gradient(90deg, #462ded ${100 - course.percentage}%, #f2a624 100%)`
                  }}
                ></div>
              </div>
            </div>
          ))}

          <div className={styles.metricsContainer}>
            <div className={styles.metricItem}>
              <span className={styles.metricNumber}>2500+</span>
              <span className={styles.metricLabel}>Students Trained</span>
            </div>
            <div className={styles.metricItem}>
              <span className={styles.metricNumber}>95%</span>
              <span className={styles.metricLabel}>Placement Rate</span>
            </div>
            <div className={styles.metricItem}>
              <span className={styles.metricNumber}>100+</span>
              <span className={styles.metricLabel}>Corporate Partners</span>
            </div>
          </div>
        </div>

        {/* Right Side: Description and Industry Adoption */}
        <div className={`${styles.progressDescriptionSection} col-lg-6 col-md-12`}>
          <div className={styles.descriptionCard}>
            <h2 className="mb-3">SAP Skills in High Demand</h2>
            <div className={styles.descriptionContent}>
              <p>
                The SAP ecosystem continues to dominate the ERP market, with over
                400,000 customers worldwide and a growing demand for skilled professionals.
                At Connecting Dots ERP, we focus on high-demand SAP modules that offer
                excellent career growth potential.
              </p>
              <p>
                Our training programs are continuously updated to align with the latest
                SAP innovations, including S/4HANA, SAP Cloud Platform, and industry-specific
                solutions. With over 10 years of experience in SAP training, we've developed
                partnerships with leading implementation companies to ensure our curriculum
                meets current industry needs.
              </p>

              <h3 className={styles.industryTitle}>SAP Adoption by Industry</h3>
              <div className={styles.industryAdoption}>
                {industryData.map((industry, index) => (
                  <div key={index} className={styles.industryItem}>
                    <div className={styles.industryName}>{industry.name}</div>
                    <div className={styles.industryBarContainer}>
                      <div
                        className={styles.industryBar}
                        style={{
                          width: isVisible ? `${industry.adoption}%` : '0%',
                          transition: `width 1s ease-in-out ${0.5 + index * 0.2}s`
                        }}
                      ></div>
                      <span className={styles.industryPercentage}>{industry.adoption}%</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.ctaSection}>
                <button className={styles.ctaButton}>Explore SAP Courses</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBars;
