"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const CourseComponentLoader = ({ formattedCourse, city, course }) => {
  // Add state to track city changes
  const [currentCity, setCurrentCity] = useState(city);

  // Update state when city prop changes
  useEffect(() => {
    setCurrentCity(city);
  }, [city]);

  let CourseComponent = null;

  try {
    // Use dynamic imports for specific courses
    if (formattedCourse === "SAP-FICO") {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/Sap-Courses/SAP-FICO/page.js"),
        { ssr: false }
      );
    } else if (formattedCourse === "SAP-BASIS") {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/Sap-Courses/SAP-BASIS/page.js"),
        { ssr: false }
      );
    } else if (formattedCourse === "SAP-ABAP") {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/Sap-Courses/SAP-ABAP/page.js"),
        { ssr: false }
      );
    } else if (formattedCourse === "SAP-ARIBA") {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/Sap-Courses/SAP-ARIBA/page.js"),
        { ssr: false }
      );
    } else if (formattedCourse === "SAP-BWBI") {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/Sap-Courses/SAP-BI/page.js"),
        { ssr: false }
      );
    } else if (formattedCourse === "SAP-EWM") {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/Sap-Courses/SAP-EWM/page.js"),
        { ssr: false }
      );
    } else if (formattedCourse === "SAP-S4") {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/Sap-Courses/SAP-HANA/page.js"),
        { ssr: false }
      );
    } else if (formattedCourse === "SAP-HR") {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/Sap-Courses/SAP-HRHCM/page.js"),
        { ssr: false }
      );
    } else if (formattedCourse === "SAP-MM") {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/Sap-Courses/SAP-MM/page.js"),
        { ssr: false }
      );
    } else if (formattedCourse === "SAP-PM") {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/Sap-Courses/SAP-PM/page.js"),
        { ssr: false }
      );
    } else if (formattedCourse === "SAP-PP") {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/Sap-Courses/SAP-PP/page.js"),
        { ssr: false }
      );
    } else if (formattedCourse === "SAP-PS") {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/Sap-Courses/SAP-PS/page.js"),
        { ssr: false }
      );
    } else if (formattedCourse === "SAP-QM") {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/Sap-Courses/SAP-QM/page.js"),
        { ssr: false }
      );
    } else if (formattedCourse === "SAP-SCM") {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/Sap-Courses/SAP-SCM/page.js"),
        { ssr: false }
      );
    } else if (formattedCourse === "SAP-SD") {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/Sap-Courses/SAP-SD/page.js"),
        { ssr: false }
      );
    } else if (formattedCourse === "SAP-SUCCESSFACTORS") {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/Sap-Courses/SAP-SUCCESS/page.js"),
        { ssr: false }
      );
    } else if (formattedCourse === "SAP-COURSE") {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/Sap-Courses/page.js"),
        { ssr: false }
      );
    } else if (formattedCourse === "IT-COURSE") {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/IT-Courses/page.js"),
        { ssr: false }
      );
    } else if (formattedCourse === "SALESFORCE-TRAINING") {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/IT-Courses/Saleforce/page.js"),
        { ssr: false }
      );
    } else if (formattedCourse === "PYTHON-COURSE") {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/IT-Courses/Python/page.js"),
        { ssr: false }
      );
    } else if (formattedCourse === "UI-UX") {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/IT-Courses/UIUX/page.js"),
        { ssr: false }
      );
    } else if (formattedCourse === "MERN-STACK") {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/IT-Courses/MernStack/page.js"),
        { ssr: false }
      );
    } else if (formattedCourse === "FULL-STACK") {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/IT-Courses/FullStack/page.js"),
        { ssr: false }
      );
    } else if (formattedCourse === "JAVA-COURSE") {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/IT-Courses/Java/page.js"),
        { ssr: false }
      );
    } else if (formattedCourse === "DATA-ANALYTICS") {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/IT-Courses/DataAnalytics/page.js"),
        { ssr: false }
      );
    } else if (formattedCourse === "DATA-SCIENCE") {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/IT-Courses/DataScience/page.js"),
        { ssr: false }
      );
    } else if (formattedCourse === "BUSINESS-ANALYTICS") {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/IT-Courses/Business-A/page.js"),
        { ssr: false }
      );
    } else if (formattedCourse === "CHATGPT-COURSE") {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/IT-Courses/GptAi/page.js"),
        { ssr: false }
      );
    } else if (formattedCourse === "HR-COURSE") {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/HR-Courses/page.js"),
        { ssr: false }
      );
    } else if (formattedCourse === "HR-TRAINING") {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/HR-Courses/HRTraining/page.js"),
        { ssr: false }
      );
    } else if (formattedCourse === "CORE-HR") {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/HR-Courses/Core/page.js"),
        { ssr: false }
      );
    } else if (formattedCourse === "HR-PAYROLL") {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/HR-Courses/Payroll/page.js"),
        { ssr: false }
      );
    } else if (formattedCourse === "HR-MANAGEMENT") {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/HR-Courses/Management/page.js"),
        { ssr: false }
      );
    } else if (formattedCourse === "HR-GENERALIST") {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/HR-Courses/Generalist/page.js"),
        { ssr: false }
      );
    } else if (formattedCourse === "HR-ANALYTICS") {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/HR-Courses/HRAnalytics/page.js"),
        { ssr: false }
      );
    } else if (formattedCourse === "DATA-VISUALISATION") {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/DV-Courses/page.js"),
        { ssr: false }
      );
    } else if (formattedCourse === "TABLEAU-TRAINING") {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/DV-Courses/Tableau/page.js"),
        { ssr: false }
      );
    } else if (formattedCourse === "POWER-BI") {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/DV-Courses/Power-Bi/page.js"),
        { ssr: false }
      );
    } else if (formattedCourse === "SQL-COURSE") {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/DV-Courses/SQL/page.js"),
        { ssr: false }
      );
    } else if (formattedCourse === "DIGITAL-MARKETING") {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/DM-Courses/page.js"),
        { ssr: false }
      );
    } else {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/default-page.js"),
        { ssr: false }
      ); // Fallback to default page
    }
  } catch (error) {
    CourseComponent = dynamic(() => import("@/app/(routes)/default-page.js"), {
      ssr: false,
    }); // Fallback component
  }

  // Add key prop to force re-render and pass the tracked city
  return CourseComponent ? (
    <CourseComponent key={currentCity} city={currentCity} course={course} />
  ) : (
    <p>Loading...</p>
  );
};

export default CourseComponentLoader;
