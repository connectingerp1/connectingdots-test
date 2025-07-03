// components/CourseComponentLoader.js (Updated for SAP courses)

"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import Loader from "./Loader";

const CourseComponentLoader = ({ formattedCourse, city, course }) => {
  const [currentCity, setCurrentCity] = useState(city);
  const [componentLoaded, setComponentLoaded] = useState(false);
  const componentRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    setCurrentCity(city);
  }, [city]);

  useEffect(() => {
    if (!observerRef.current && componentRef.current && !componentLoaded) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (entry.isIntersecting) {
            setComponentLoaded(true);
            observerRef.current.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      observerRef.current.observe(componentRef.current);
    }
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [componentLoaded]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!componentLoaded) {
        setComponentLoaded(true);
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [componentLoaded]);

  let CourseComponent = null;


  try {
    // Use dynamic imports for specific courses with loading: eager
    // Added OR conditions for formattedCourse ending with -COURSE, -HANA, -HCM, etc.
    if (
      formattedCourse === "SAP-FICO" ||
      formattedCourse === "SAP-FICO-COURSE"
    ) {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/Sap-Courses/SAP-FICO/page.js"),
        { ssr: false, loading: () => <Loader /> }
      );
    } else if (
      formattedCourse === "SAP-BASIS" ||
      formattedCourse === "SAP-BASIS-COURSE"
    ) {
      // FIX FOR SAP BASIS
      CourseComponent = dynamic(
        () => import("@/app/(routes)/Sap-Courses/SAP-BASIS/page.js"),
        { ssr: false, loading: () => <Loader /> }
      );
    } else if (
      formattedCourse === "SAP-ABAP" ||
      formattedCourse === "SAP-ABAP-COURSE"
    ) {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/Sap-Courses/SAP-ABAP/page.js"),
        { ssr: false, loading: () => <Loader /> }
      );
    } else if (
      formattedCourse === "SAP-ARIBA" ||
      formattedCourse === "SAP-ARIBA-COURSE"
    ) {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/Sap-Courses/SAP-ARIBA/page.js"),
        { ssr: false, loading: () => <Loader /> }
      );
    } else if (
      formattedCourse === "SAP-BWBI" ||
      formattedCourse === "SAP-BWBI-COURSE"
    ) {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/Sap-Courses/SAP-BI/page.js"),
        { ssr: false, loading: () => <Loader /> }
      );
    } else if (
      formattedCourse === "SAP-EWM" ||
      formattedCourse === "SAP-EWM-COURSE"
    ) {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/Sap-Courses/SAP-EWM/page.js"),
        { ssr: false, loading: () => <Loader /> }
      );
    } else if (
      formattedCourse === "SAP-S4" ||
      formattedCourse === "SAP-S4-HANA" ||
      formattedCourse === "SAP-S4-COURSE"
    ) {
      // Added "SAP-S4-COURSE"
      CourseComponent = dynamic(
        () => import("@/app/(routes)/Sap-Courses/SAP-HANA/page.js"),
        { ssr: false, loading: () => <Loader /> }
      );
    } else if (
      formattedCourse === "SAP-HR" ||
      formattedCourse === "SAP-HR-HCM" ||
      formattedCourse === "SAP-HR-COURSE"
    ) {
      // Added "SAP-HR-COURSE"
      CourseComponent = dynamic(
        () => import("@/app/(routes)/Sap-Courses/SAP-HRHCM/page.js"),
        { ssr: false, loading: () => <Loader /> }
      );
    } else if (
      formattedCourse === "SAP-MM" ||
      formattedCourse === "SAP-MM-COURSE"
    ) {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/Sap-Courses/SAP-MM/page.js"),
        { ssr: false, loading: () => <Loader /> }
      );
    } else if (
      formattedCourse === "SAP-PM" ||
      formattedCourse === "SAP-PM-COURSE"
    ) {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/Sap-Courses/SAP-PM/page.js"),
        { ssr: false, loading: () => <Loader /> }
      );
    } else if (
      formattedCourse === "SAP-PP" ||
      formattedCourse === "SAP-PP-COURSE"
    ) {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/Sap-Courses/SAP-PP/page.js"),
        { ssr: false, loading: () => <Loader /> }
      );
    } else if (
      formattedCourse === "SAP-PS" ||
      formattedCourse === "SAP-PS-COURSE"
    ) {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/Sap-Courses/SAP-PS/page.js"),
        { ssr: false, loading: () => <Loader /> }
      );
    } else if (
      formattedCourse === "SAP-QM" ||
      formattedCourse === "SAP-QM-COURSE"
    ) {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/Sap-Courses/SAP-QM/page.js"),
        { ssr: false, loading: () => <Loader /> }
      );
    } else if (
      formattedCourse === "SAP-SCM" ||
      formattedCourse === "SAP-SCM-COURSE"
    ) {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/Sap-Courses/SAP-SCM/page.js"),
        { ssr: false, loading: () => <Loader /> }
      );
    } else if (
      formattedCourse === "SAP-SD" ||
      formattedCourse === "SAP-SD-COURSE"
    ) {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/Sap-Courses/SAP-SD/page.js"),
        { ssr: false, loading: () => <Loader /> }
      );
    } else if (
      formattedCourse === "SAP-SUCCESSFACTORS" ||
      formattedCourse === "SAP-SUCCESSFACTORS-COURSE"
    ) {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/Sap-Courses/SAP-SUCCESS/page.js"),
        { ssr: false, loading: () => <Loader /> }
      );
    } else if (formattedCourse === "SAP-COURSE") {
      // This one usually doesn't have "-COURSE" suffix if it's the main SAP page
      CourseComponent = dynamic(
        () => import("@/app/(routes)/Sap-Courses/page.js"),
        { ssr: false, loading: () => <Loader /> }
      );
    } else if (formattedCourse === "IT-COURSE") {
      // Already working for IT-COURSE-IN-CHENNAI
      CourseComponent = dynamic(
        () => import("@/app/(routes)/IT-Courses/page.js"),
        { ssr: false, loading: () => <Loader /> }
      );
    } else if (
      formattedCourse === "SALESFORCE-TRAINING" ||
      formattedCourse === "SALESFORCE-TRAINING-COURSE"
    ) {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/IT-Courses/Saleforce/page.js"),
        { ssr: false, loading: () => <Loader /> }
      );
    } else if (formattedCourse === "PYTHON-COURSE") {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/IT-Courses/Python/page.js"),
        { ssr: false, loading: () => <Loader /> }
      );
    } else if (
      formattedCourse === "UI-UX" ||
      formattedCourse === "UI-UX-COURSE"
    ) {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/IT-Courses/UIUX/page.js"),
        { ssr: false, loading: () => <Loader /> }
      );
    } else if (
      formattedCourse === "MERN-STACK" ||
      formattedCourse === "MERN-STACK-COURSE"
    ) {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/IT-Courses/MernStack/page.js"),
        { ssr: false, loading: () => <Loader /> }
      );
    } else if (
      formattedCourse === "FULL-STACK" ||
      formattedCourse === "FULL-STACK-DEVELOPER" ||
      formattedCourse === "FULL-STACK-COURSE"
    ) {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/IT-Courses/FullStack/page.js"),
        { ssr: false, loading: () => <Loader /> }
      );
    } else if (formattedCourse === "JAVA-COURSE") {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/IT-Courses/Java/page.js"),
        { ssr: false, loading: () => <Loader /> }
      );
    } else if (
      formattedCourse === "DATA-ANALYTICS" ||
      formattedCourse === "DATA-ANALYTICS-COURSE"
    ) {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/IT-Courses/DataAnalytics/page.js"),
        { ssr: false, loading: () => <Loader /> }
      );
    } else if (
      formattedCourse === "DATA-SCIENCE" ||
      formattedCourse === "DATA-SCIENCE-COURSE"
    ) {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/IT-Courses/DataScience/page.js"),
        { ssr: false, loading: () => <Loader /> }
      );
    } else if (
      formattedCourse === "BUSINESS-ANALYTICS" ||
      formattedCourse === "BUSINESS-ANALYTICS-COURSE"
    ) {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/IT-Courses/Business-A/page.js"),
        { ssr: false, loading: () => <Loader /> }
      );
    } else if (formattedCourse === "CHATGPT-COURSE") {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/IT-Courses/GptAi/page.js"),
        { ssr: false, loading: () => <Loader /> }
      );
    } else if (formattedCourse === "HR-COURSE") {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/HR-Courses/page.js"),
        { ssr: false, loading: () => <Loader /> }
      );
    } else if (
      formattedCourse === "HR-TRAINING" ||
      formattedCourse === "HR-TRAINING-COURSE"
    ) {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/HR-Courses/HRTraining/page.js"),
        { ssr: false, loading: () => <Loader /> }
      );
    } else if (
      formattedCourse === "CORE-HR" ||
      formattedCourse === "CORE-HR-COURSE"
    ) {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/HR-Courses/Core/page.js"),
        { ssr: false, loading: () => <Loader /> }
      );
    } else if (
      formattedCourse === "HR-PAYROLL" ||
      formattedCourse === "HR-PAYROLL-COURSE"
    ) {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/HR-Courses/Payroll/page.js"),
        { ssr: false, loading: () => <Loader /> }
      );
    } else if (
      formattedCourse === "HR-MANAGEMENT" ||
      formattedCourse === "HR-MANAGEMENT-COURSE"
    ) {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/HR-Courses/Management/page.js"),
        { ssr: false, loading: () => <Loader /> }
      );
    } else if (
      formattedCourse === "HR-GENERALIST" ||
      formattedCourse === "HR-GENERALIST-COURSE"
    ) {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/HR-Courses/Generalist/page.js"),
        { ssr: false, loading: () => <Loader /> }
      );
    } else if (
      formattedCourse === "HR-ANALYTICS" ||
      formattedCourse === "HR-ANALYTICS-COURSE"
    ) {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/HR-Courses/HRAnalytics/page.js"),
        { ssr: false, loading: () => <Loader /> }
      );
    } else if (
      formattedCourse === "DATA-VISUALISATION" ||
      formattedCourse === "DATA-VISUALISATION-COURSE"
    ) {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/DV-Courses/page.js"),
        { ssr: false, loading: () => <Loader /> }
      );
    } else if (
      formattedCourse === "TABLEAU-TRAINING" ||
      formattedCourse === "TABLEAU-TRAINING-COURSE"
    ) {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/DV-Courses/Tableau/page.js"),
        { ssr: false, loading: () => <Loader /> }
      );
    } else if (
      formattedCourse === "POWER-BI" ||
      formattedCourse === "POWER-BI-COURSE"
    ) {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/DV-Courses/Power-Bi/page.js"),
        { ssr: false, loading: () => <Loader /> }
      );
    } else if (formattedCourse === "SQL-COURSE") {
      // This seems correct already if it's always "SQL-COURSE"
      CourseComponent = dynamic(
        () => import("@/app/(routes)/DV-Courses/SQL/page.js"),
        { ssr: false, loading: () => <Loader /> }
      );
    } else if (
      formattedCourse === "DIGITAL-MARKETING" ||
      formattedCourse === "DIGITAL-MARKETING-COURSE"
    ) {
      CourseComponent = dynamic(
        () => import("@/app/(routes)/DM-Courses/page.js"),
        { ssr: false, loading: () => <Loader /> }
      );
    } else {
      console.warn(
        `CourseComponentLoader: No matching component for formattedCourse: "${formattedCourse}". Loading default-page.`
      );
      CourseComponent = dynamic(
        () => import("@/app/(routes)/default-page.js"),
        { ssr: false, loading: () => <Loader /> }
      ); // Fallback to default page
    }
  } catch (error) {
    console.error("Error loading course component:", error);
    CourseComponent = dynamic(() => import("@/app/(routes)/default-page.js"), {
      ssr: false,
      loading: () => <Loader />,
    }); // Fallback component
  }

  return (
    <div ref={componentRef} style={{ minHeight: "100vh" }}>
      {CourseComponent ? (
        <CourseComponent
          key={`${currentCity}-${componentLoaded}`}
          city={currentCity}
          course={course}
        />
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default CourseComponentLoader;
