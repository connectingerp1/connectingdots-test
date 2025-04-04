"use client";

import React from "react";
import Head from "next/head";
import PageHeader from "@/components/AboutusPage/PageHeader";
import StickyScrollReveal from "@/components/AboutusPage/StickyScrollReveal";
import ProgressBars from "@/components/AboutusPage/ProgressBars";
import AboutGallery from "@/components/AboutusPage/AboutGallery";
import Branches from "@/components/AboutusPage/Branches";
import styles from "@/styles/AboutPage.module.css";

const AboutPage = () => {
  return (
    <>
      <Head>
        <title>Connecting Dots ERP | SAP Training Institute In Pune</title>
        <meta 
          name="description" 
          content="We offer Expert-led training in SAP, Software Development, Digital Marketing, and HR Courses with strong placement support for your career." 
        />
      </Head>
      
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
    </>
  );
};

export default AboutPage;