'use client';

import React from 'react';
import styles from '@/styles/CoursesComponents/Trustus.module.css';
import Image from 'next/image';


const TrustUs = () => {

  const Logos = '/Ourclients/Artboard 10.avif';
  const Logos1 = '/Ourclients/Artboard 11.avif';
  const Logos2 = '/Ourclients/Artboard 12.avif';
  const Logos3 = '/Ourclients/Artboard 13.avif';
  const Logos4 = '/Ourclients/Artboard 14.avif';
  const Logos5 = '/Ourclients/Artboard 15.avif';
  const Logos6 = '/Ourclients/Artboard 16.avif';
  const Logos7 = '/Ourclients/Artboard 17.avif';
  const Logos8 = '/Ourclients/Artboard 18.avif';
  const Logos9 = '/Ourclients/Artboard 19.avif';
  const Logos10 = '/Ourclients/Artboard 20.avif';
  const Logos11 = '/Ourclients/Artboard 21.avif';
  const Logos12 = '/Ourclients/Artboard 22.avif';
  const Logos13 = '/Ourclients/Artboard 23.avif';
  const Logos14 = '/Ourclients/Artboard 24.avif';
  const Logos15 = '/Ourclients/Artboard 25.avif';
  const Logos16 = '/Ourclients/Artboard 26.avif';
  const Logos17 = '/Ourclients/Artboard 40.avif';
  const Logos18 = '/Ourclients/Artboard 41.avif';
  const Logos19 = '/Ourclients/Artboard 42.avif';
  const Logos20 = '/Ourclients/Artboard 43.avif';
  const Logos21 = '/Ourclients/Artboard 44.avif';
  const Logos22 = '/Ourclients/Artboard 45.avif';
  const Logos23 = '/Ourclients/Artboard 46.avif';
  const Logos24 = '/Ourclients/Artboard 47.avif';
  const Logos25 = '/Ourclients/Artboard 48.avif';
  const Logos26 = '/Ourclients/Artboard 49.avif';
  const Logos27 = '/Ourclients/Artboard 50.avif';
  const Logos28 = '/Ourclients/Artboard 51.avif';
  const Logos29 = '/Ourclients/Artboard 52.avif';
  

  const logos1 = [
    Logos,
    Logos1,
    Logos2,
    Logos3,
    Logos4,
    Logos15,
    Logos16,
    Logos17,
    Logos18,
    Logos19,
  ]

  const logos2 = [
    Logos5,
    Logos6,
    Logos7,
    Logos8,
    Logos9,
    Logos20,
    Logos21,
    Logos22,
    Logos23,
    Logos24,
  ]

  const logos3 = [
    Logos10,
    Logos11,
    Logos12,
    Logos13,
    Logos14,
    Logos25,
    Logos26,
    Logos27,
    Logos28,
    Logos29,
  ]

  // Duplicate logos for smooth animation
  const duplicateLogos = (logos) => [...logos, ...logos];

  return (
    <div className={styles.containerItDs}>
      {/* Logos Marquee */}
      <div className={styles.logosItDs}>
        {[logos1, logos2, logos3].map((logos, idx) => (
          <div className={styles.marqueeItDs} key={idx}>
            <div className={styles.marqueeContentItDs}>
              {duplicateLogos(logos).map((src, index) => (
                <Image
                  key={index}
                  src={src}
                  alt={`Logo ${index}`}
                  width={100}
                  height={50}
                  className={styles.logoItDs}
                  priority
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Information Section */}
      <div className={styles.infoItDs}>
        <div className={styles.containerItDsTitle}>
          <h2>ORGANISATIONS TRUST US</h2>
        </div>
        <h2 className={styles.titleItDs}>
          <span className={styles.highlightSpan}>1000+</span> Organizations
          <br /> TRUST US WITH THEIR <br /> Openings
        </h2>
        <p className={styles.descriptionItDs}>
          <span className={styles.highlightSpan}>Organizations</span>, across the globe trust our students and their brilliant{" "}
          <span className={styles.highlightSpan}>technical skills</span> in Full Stack Development,{" "}
          <span className={styles.highlightSpan}>Data Science & Analytics with AI</span>, Java Full Stack Developer, Digital Marketing Course, AWS Cloud Technology,
          which results in them getting hired at excellent companies with impressive pay scales.
          <span className={styles.highlightSpan}>Connecting Dots ERP</span>, India’s fastest-growing{" "}
          <span className={styles.highlightSpan}>Software Training Institute</span> provides a range of IT Courses helping to shape the future of our students in every way possible. The Coding Courses provided by our Institute are highly valuable and worthy for the students.
        </p>
        <div className={styles.statisticsItDs}>
          <div className={styles.statItDs}>
            <span className={styles.numberItDs}>1000+</span>{" "}
            <span className={styles.labelItDs}>Hiring companies</span>
          </div>
          <div className={styles.statItDs}>
            <span className={styles.numberItDs}>100+</span>{" "}
            <span className={styles.labelItDs}>Students already placed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustUs;
