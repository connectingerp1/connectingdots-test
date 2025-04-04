"use client";

import DSHeader from "@/components/CoursesComponents/Header";
import Why from "@/components/CoursesComponents/Why";
import Certificate from "@/components/HomePage/Certificate";
import FAQ from "@/components/CoursesComponents/FAQ";
import CoursesRelated from "@/components/CoursesComponents/RelatedCourses";
import Description from "@/components/CoursesComponents/Description";

export default function IT() {
  return (
    <>
      <DSHeader pageId="ITcoursesHeader" pageType="itcoursesheader" />
      <Why pageId="WhyIT" pageType="Whyit" />
      <Certificate pageId="ITcourses-CERT" />
      <Description pageId="itcourses-landing" />
      <FAQ pageId="ITcoursesFAQ" pageType="itcoursesfaq" />
      <CoursesRelated pageId="ITrelcourses" />
    </>
  );
}
