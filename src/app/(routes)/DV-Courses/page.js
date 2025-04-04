"use client";

import DSHeader from "@/components/CoursesComponents/Header";
import Why from "@/components/CoursesComponents/Why";
import Certificate from "@/components/HomePage/Certificate";
import FAQ from "@/components/CoursesComponents/FAQ";
import CoursesRelated from "@/components/CoursesComponents/RelatedCourses";
import Description from "@/components/CoursesComponents/Description";

export default function DV() {
  return (
    <>
      <DSHeader pageId="DataVisualHeader" pageType="datavisualheader" />
      <Why pageId="WhyDataVisual" pageType="Whydatavisual" />
      <Certificate pageId="DataVisual-CERT" />
      <Description pageId="DataVisual-landing" />
      <FAQ pageId="DataVisualFAQ" pageType="datavisualfaq" />
      <CoursesRelated pageId="DataVisualrelcourses" />
    </>
  );
}
