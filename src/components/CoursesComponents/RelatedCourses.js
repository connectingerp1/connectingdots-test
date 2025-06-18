"use client";

import { useState, useEffect, useMemo, useCallback, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "@/styles/CoursesComponents/RelatedCourses.module.css";
import ContactForm from "@/components/HomePage/Btnform";
import { CityContext } from "@/context/CityContext";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import dynamic from "next/dynamic";

const CoursesRelated = ({ pageId }) => {
  const [relatedCourses, setRelatedCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { city } = useContext(CityContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  // Comprehensive course name to URL mapping
  const courseNameToUrlMapping = {
    // Data Science & Analytics
    "Chat GPT & AI": "chatgpt-course-in",
    "Masters in Data Science": "data-science-course-in",
    "Master in Data Science": "data-science-course-in",
    "Masters in Data Analytics": "data-analytics-course-in",
    "Business Analytics": "business-analytics-course-in",
    
    // Development & Programming
    "Full-Stack Python": "python-course-in",
    "Full-Stack Java": "java-course-in",
    "Reactjs Framework": "mern-stack-course-in",
    "Mern Stack": "mern-stack-course-in",
    "UI/UX Design": "ui-ux-course-in",
    
    // Data Visualization & BI
    "Tableau": "tableau-training-in",
    "PowerBI": "power-bi-course-in",
    "Power BI": "power-bi-course-in",
    "SQL": "sql-course-in",
    
    // CRM & Sales
    "Salesforce": "salesforce-training-in",
    
    // SAP Modules
    "SAP HANA": "sap-s4-hana-course-in",
    "SAP NETWEAVER": "sap-course-in", // Generic SAP course
    "SAP BW/BI": "sap-bwbi-course-in",
    "SAP BASIS": "sap-basis-course-in",
    "SAP ABAP": "sap-abap-course-in",
    "SAP FICO": "sap-fico-course-in",
    "SAP MM": "sap-mm-course-in",
    "SAP SD": "sap-sd-course-in",
    "SAP HR/HCM": "sap-hr-hcm-course-in",
    "SAP PM": "sap-pm-course-in",
    "SAP PP": "sap-pp-course-in",
    "SAP PS": "sap-ps-course-in",
    "SAP QM": "sap-qm-course-in",
    "SAP SCM": "sap-scm-course-in",
    "SAP EWM": "sap-ewm-course-in",
    "SAP SUCCESSFACTOR": "sap-successfactors-course-in",
    "SAP ARIBA": "sap-ariba-course-in",
    
    // HR & Management
    "HR Training": "hr-training-course-in",
    "HR Analytics": "hr-analytics-course-in",
    "Core HR": "core-hr-course-in",
    "HR Management": "hr-management-course-in",
    "HR Payroll": "hr-payroll-course-in",
    "HR Generalist": "hr-generalist-course-in",
    
    // Digital Marketing
    "Digital Marketing": "digital-marketing-course-in",
    
    // IT & General
    "IT Course": "it-course-in",
    "Data Visualisation": "data-visualisation-course-in",
    
    // Add any other course mappings you might have
  };

  useEffect(() => {
    const updateScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const cachedData = localStorage.getItem(`relatedCourses_${pageId}`);
        if (cachedData) {
          setRelatedCourses(JSON.parse(cachedData));
          setLoading(false);
          return;
        }

        const response = await fetch("/Jsonfolder/relateddata.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        const pageData = data?.[pageId];
        if (pageData) {
          const updatedCourses = pageData.items.map((course) => {
            const updatedIcon = course.icon?.replace(
              "Jsonfolder/",
              `Jsonfolder/${city.toLowerCase()}/`
            );

            return {
              ...course,
              name: course.name?.replace(/{city}/g, city),
              description: course.description?.replace(/{city}/g, city),
              icon: updatedIcon,
            };
          });

          localStorage.setItem(
            `relatedCourses_${pageId}`,
            JSON.stringify(updatedCourses)
          );
          setRelatedCourses(updatedCourses);
        } else {
          throw new Error("Page data not found");
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching related courses data:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [pageId, city]);

  // Function to normalize city name for URL
  const normalizeCityForUrl = (cityName) => {
    return cityName.toLowerCase().replace(/\s+/g, '-');
  };

  // Function to handle course click and redirect
  const handleCourseClick = useCallback((courseName) => {
    const courseUrl = courseNameToUrlMapping[courseName];
    
    if (courseUrl && city) {
      // Normalize city name for URL
      const normalizedCity = normalizeCityForUrl(city);
      
      // Create the URL: /course-name-city
      const redirectUrl = `/${courseUrl}-${normalizedCity}`;
      
      console.log(`Redirecting to: ${redirectUrl}`); // For debugging
      
      // Navigate to the course page
      router.push(redirectUrl);
    } else {
      // Fallback: if mapping not found, show modal (old behavior)
      console.warn(`No URL mapping found for course: ${courseName}`);
      console.warn(`Available mappings:`, Object.keys(courseNameToUrlMapping));
      
      // You can choose to either show the modal or redirect to a generic page
      setSelectedCourse(courseName);
      setShowModal(true);
    }
  }, [city, router, courseNameToUrlMapping]);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setSelectedCourse(null);
  }, []);

  const handleSelect = useCallback((selectedIndex) => {
    setActiveIndex(selectedIndex);
  }, []);

  const renderRelatedCourses = useMemo(() => {
    if (!relatedCourses.length) return null;

    // Determine number of cards per slide (1 for mobile, 5 for desktop)
    const cardsPerSlide = isMobile ? 1 : 5;
    const slides = [];

    for (let i = 0; i < relatedCourses.length; i += cardsPerSlide) {
      slides.push(
        <Carousel.Item key={i}>
          <div className={styles.relatedCoursesGrid}>
            {relatedCourses.slice(i, i + cardsPerSlide).map((relcourse, index) => (
              <div
                key={index}
                className={styles.relatedCourseCard}
                onClick={() => handleCourseClick(relcourse.name)}
                style={{ cursor: 'pointer' }}
                title={`Click to view ${relcourse.name} course in ${city}`} // Helpful tooltip
              >
                <div className={styles.relatedIconContainer}>
                  {relcourse.icon.endsWith(".mp4") ? (
                    <video
                      src={relcourse.icon}
                      alt={relcourse.alt}
                      className={styles.relatedCourseIcon}
                      loop
                      autoPlay
                      muted
                    />
                  ) : (
                    <Image
                      src={relcourse.icon}
                      alt={relcourse.alt}
                      width={100}
                      height={100}
                      className={styles.relatedCourseIcon}
                    />
                  )}
                </div>
                <h3>{relcourse.name}</h3>
                <p>{relcourse.description}</p>
              </div>
            ))}
          </div>
        </Carousel.Item>
      );
    }

    return slides;
  }, [relatedCourses, handleCourseClick, isMobile, city]);

  if (loading) {
    return <div className={styles.loadingContainer}>Loading related courses...</div>;
  }

  if (error) {
    return <div className={styles.errorContainer}>Error loading data: {error.message}</div>;
  }

  return (
    <div className={styles.relatedCoursesContainer}>
      <div className={styles.relatedCoursesTitle}>
        <h2 className={styles.relatedCoursesTitleh2}>Related Courses</h2>
      </div>
      <Carousel
        activeIndex={activeIndex}
        onSelect={handleSelect}
        interval={3000}
        indicators={true}
        controls={true}
        pause="hover"
      >
        {renderRelatedCourses}
      </Carousel>

      {showModal && (
        <ContactForm onClose={handleCloseModal} course={selectedCourse} />
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(CoursesRelated), { ssr: false });