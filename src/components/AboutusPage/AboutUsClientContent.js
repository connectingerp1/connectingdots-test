// src/components/AboutusPage/AboutUsClientContent.js
"use client";

import React from "react";
// Import necessary components used previously in aboutus/page.js
import PageHeader from "@/components/AboutusPage/PageHeader";
import StickyScrollReveal from "@/components/AboutusPage/StickyScrollReveal";
import ProgressBars from "@/components/AboutusPage/ProgressBars";
import AboutGallery from "@/components/AboutusPage/AboutGallery";
import Branches from "@/components/AboutusPage/Branches";
import styles from "@/styles/AboutPage.module.css";

const AboutUsClientContent = () => {

  return (
    <div className={styles.container}>
      <div id="PageHeader" className={styles.section}>
        <PageHeader />
      </div>

      <div id="StickyScrollReveal" className={styles.section}>
        <StickyScrollReveal />
      </div>

      <div id="progressbar" className={styles.section}>
        <ProgressBars />
      </div>

      <div id="gallery" className={styles.section}>
        <AboutGallery />
      </div>

      <div id="branches" className={styles.section}>
        <Branches />
      </div>
    </div>
  );
};

export default AboutUsClientContent;
