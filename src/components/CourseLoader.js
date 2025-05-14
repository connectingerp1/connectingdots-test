"use client";

import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Loader from "./Loader";

const CourseLoader = () => {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // This effect tracks navigation changes
  useEffect(() => {
    // Course path patterns to match
    const coursePathPatterns = [
      "/IT-Courses",
      "/HR-Courses",
      "/Sap-Courses",
      "/DM-Courses",
      "/DV-Courses",
    ];

    // Function to check if current path is a course page
    const isCoursePage = (path) => {
      return coursePathPatterns.some((pattern) => path.includes(pattern));
    };

    // When navigation starts, show loader if it's a course page
    const handleStart = (newPath) => {
      if (isCoursePage(newPath)) {
        setLoading(true);
      }
    };

    // When navigation completes, hide loader
    const handleComplete = () => {
      setLoading(false);
    };

    // Check current path when component mounts
    if (isCoursePage(pathname)) {
      setLoading(true);
      // Auto-hide loader after a timeout (for initial page load)
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1500);
      return () => clearTimeout(timer);
    }

    // We need to watch for changes in pathname and searchParams
    // to detect navigation between pages
    return () => {
      if (loading) {
        // Auto-hide loader if it's still showing when component unmounts
        setLoading(false);
      }
    };
  }, [pathname, searchParams, loading]);

  // Custom navigation tracking effect
  useEffect(() => {
    // Store the current pathname to detect changes
    let currentPath = pathname;

    // Check for navigation changes manually
    const interval = setInterval(() => {
      if (currentPath !== pathname) {
        setLoading(true);
        currentPath = pathname;

        // Hide loader after a reasonable timeout
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [pathname]);

  return loading ? <Loader /> : null;
};

export default CourseLoader;
