// src/components/HomePage/HeaderCarousel.js
"use client";

import { useEffect, useState, useCallback, memo } from "react";
import { Carousel, Button } from "react-bootstrap";
import styles from "@/styles/HomePage/HeaderCarousel.module.css";
import Btnform from "./Btnform";
import Image from "next/image";
import Link from "next/link";

import dynamic from "next/dynamic";
const LogoSphere = dynamic(() => import("./LogoSphere"), {
  ssr: false, // Client-side only rendering
  loading: () => (
    // Placeholder to prevent layout shifts while the 3D logo loads
    <div
      style={{
        width: "340px",
        height: "340px",
        minHeight: "340px", // Maintain height to avoid CLS
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src="/Navbar/arrow.avif" // Lightweight fallback image for the placeholder
        alt="Loading Logo"
        style={{ width: "80px", height: "80px", opacity: 0.5 }}
      />
    </div>
  ),
});

// Constants moved outside component to avoid re-creation on every render
const TEXTS = [
  "Connect Your Dots with SAP Expertise",
  "Connect Your Dots with Data Science",
  "Connect Your Dots in IT Excellence",
  "Connect Your Dots in Digital Marketing",
];

const IMAGES = [
  "/Headercarousel/SAP module1.avif",
  "/Headercarousel/DSh.avif",
  "/Headercarousel/IT.avif",
  "/Headercarousel/DGM.avif",
];

const QUESTION_DATA = {
  Q1: {
    title:
      "What is the function of an <span class='text-primary font-bold'>HR Payroll</span> system?",
    text: "The function of an <span class='text-primary font-bold'>HR payroll system</span> is to automate and manage employee compensation processes, including calculating wages, withholding taxes, and ensuring compliance with labor laws. It streamlines payroll operations, reduces errors, and provides accurate and timely payments to employees.",
  },
  Q2: {
    title:
      "What is the purpose of the <span class='text-primary font-bold'>CO</span> module in <span class='text-primary font-bold'>SAP FICO</span>?",
    text: "The <span class='text-primary font-bold'>CO (Controlling)</span> module in <span class='text-primary font-bold'>SAP FICO</span> helps manage and monitor internal costs. It supports internal reporting by tracking and analyzing costs and revenues, aiding in budgeting, planning, and controlling operations to ensure effective cost management within an organization.",
  },
  Q3: {
    title:
      "What is the role of <span class='text-primary font-bold'>Express.js</span> in the <span class='text-primary font-bold'>MERN</span> stack?",
    text: "<span class='text-primary font-bold'>Express.js</span> is a lightweight web application framework for Node.js, used in the <span class='text-primary font-bold'>MERN</span> stack. It simplifies the development of server-side applications by providing robust features for web and mobile applications, such as routing, middleware integration, and handling HTTP requests and responses.",
  },
};

// Memoized component for company logos to prevent unnecessary re-renders
const CompanyLogos = memo(() => (
  <div className={styles.logoStrip}>
    <Image
      src="/Headercarousel/logo strip.avif"
      alt="Partner companies logos including IBM, TCS, and other corporate partners"
      width={400} // Actual width of the image
      height={100} // Actual height of the image
      priority={true} // 🚀 CRITICAL MOBILE LCP FIX: Set priority to TRUE as this is the LCP element on mobile
      sizes="(max-width: 768px) 100vw, 400px" // Define sizes for responsive image loading
    />
  </div>
));
CompanyLogos.displayName = "CompanyLogos"; // Good practice for memoized components

// Component for the first carousel slide (Career Potential)
const CareerSlide = ({ onButtonClick }) => (
  <div className={styles.carouselSlide}>
    <div className={styles.carouselText}>
      <h1>
        Unlock your <span className={styles.highlight}>Career</span> potential
      </h1>
      <h2>
        <span className={styles.highlight}>No.1 Training &</span> Placement
        Center
      </h2>
      <p>
        For more than 10 years, we've been passionate about providing engaging,
        instructor-led training that helps professionals around the world grow
        and succeed.
      </p>
      <p>
        Est. 2013 Trusted by <span className={styles.highlight}>5000+</span>{" "}
        Students
      </p>
      <Button
        className={`${styles.customBtn} ${styles.btn3}`}
        onClick={onButtonClick}
      >
        <span>Free Consultation</span>
      </Button>
      <CompanyLogos /> {/* The mobile LCP image is rendered here */}
    </div>
    <div className={styles.carouselImage}>
      {/* Decorative divs for background gradients/shadows */}
      <div
        className="absolute mt-4 top-34 w-[340px] h-[340px] rounded-full bg-gradient-to-br from-blue-200/20 to-blue-400/20 animate-pulse"
        style={{ animationDuration: "4s" }}
      ></div>
      <div
        className="absolute top-40 w-[260px] h-[260px] rounded-full bg-gradient-to-br from-blue-400/20 to-blue-600/20 animate-pulse"
        style={{ animationDuration: "4s" }}
      ></div>
      <div
        className="absolute mt-3 top-44 w-[200px] h-[200px] rounded-full bg-gradient-to-br from-blue-500/20 to-blue-700/20 animate-pulse"
        style={{ animationDuration: "4s" }}
      ></div>

      {/* The 3D logo image, which is the LCP on desktop (previously identified) */}
      <Image
        src="/Navbar/3d-logo.avif"
        alt="Hero Section Image"
        fill // 'fill' needs parent with `position: relative` and defined dimensions
        className="object-contain relative" // Keep your existing styling
        style={{
          filter:
            "drop-shadow(0 25px 50px rgba(0, 0, 0, 0.15)) drop-shadow(0 12px 30px rgba(0, 0, 0, 0.1))",
          zIndex: 1,
        }}
        priority={false} // 🚨 CHANGE: Set to FALSE. This is NOT the LCP element on mobile.
        loading="eager" // Load eagerly as it's always visible on the first slide
        sizes="100vw" // Define sizes for responsive loading
      />
    </div>
  </div>
);

// Component for the second carousel slide (AI Programs)
const AISlide = ({ index, onClick }) => (
  <div className={styles.carouselSlide2}>
    <div className={styles.carouselText2}>
      <h2>
        All Our <span className={styles.highlight}>Top Programs</span> Include{" "}
        <br />
        <span className={styles.highlight}>Generative AI </span>
        Components
      </h2>
      <h3>
        Be a Leader in your field <br />
        <span className={styles.highlight}>Change, Adapt, and Build</span> with
        AI.
      </h3>
      <div className={styles.expPgBtn}>
        <Button
          className={styles.slide2Btn}
          onClick={onClick}
          aria-label="View top training programs"
        >
          <span>Explore Our Top Programs</span>
        </Button>
      </div>
    </div>
    <div className={styles.cardBox2}>
      <div className={styles.cardH2}>
        <Image
          className={styles.transitionImage}
          src={IMAGES[index]}
          alt={`Training in ${TEXTS[index].split("with ")[1] || "Professional Skills"}`}
          width={500}
          height={400}
          priority={false} // 🚨 CHANGE: Set to FALSE. These are carousel images and not LCP.
          loading="lazy" // 🚨 CHANGE: Lazy load these images as they are not initially visible.
          sizes="(max-width: 768px) 100vw, 500px" // Define sizes for responsive loading
        />
      </div>
    </div>
  </div>
);

// Component for the third carousel slide (Industry Experts) - Desktop Only
const ExpertsSlide = () => (
  <div className={styles.carouselSlide3}>
    <div className={styles.leftSideH3}>
      <h2>
        Secure your <span className={styles.highlight}>Dream Career</span> with{" "}
        <span className="font-bold">Live Classes</span> From Industry Experts.
      </h2>
      <h3>
        Our <span className={styles.highlight}>Mentors</span> Come From Top{" "}
        <span className={styles.highlight}>MNCs</span>
      </h3>
      <div className="d-flex items-center">
        <Image
          src="/Headercarousel/assurance.avif"
          alt="Placement assurance badge"
          className={styles.assuredPlacementImage}
          width={80}
          height={80}
          priority={false} // 🚨 CHANGE: Set to FALSE. This is not visible on initial mobile load.
          loading="lazy" // Lazy load as it's not on the first slide
          sizes="80px"
        />
        <h3>Assured Placement Opportunity*</h3>
      </div>
    </div>
    <div className={styles.cardBox3}>
      <div className={styles.cardH3}>
        <h3>Our Mentors Come From</h3>
        <div className={styles.content3}>
          <div className={styles.imageGrid}>
            {[
              {
                src: "/Headercarousel/ibm1.avif",
                name: "IBM",
                className: styles.gridImageIbm,
              },
              {
                src: "/Headercarousel/tcs1.avif",
                name: "TCS",
                className: styles.gridImageTcs,
              },
              {
                src: "/Headercarousel/LnT.avif",
                name: "L&T",
                className: styles.gridImageLnt,
              },
              {
                src: "/Headercarousel/amdocs1.avif",
                name: "Amdocs",
                className: styles.gridImageAmd,
              },
              {
                src: "/Headercarousel/infosys2.avif",
                name: "Infosys",
                className: styles.gridImageInfo,
              },
              {
                src: "/Headercarousel/wipro.avif",
                name: "Wipro",
                className: styles.gridImageWip,
              },
              {
                src: "/Headercarousel/deloitte.avif",
                name: "Deloitte",
                className: styles.gridImageDel,
              },
              {
                src: "/Headercarousel/accenture1.avif",
                name: "Accenture",
                className: styles.gridImageAcc,
              },
              {
                src: "/Headercarousel/BMW.avif",
                name: "BMW",
                className: styles.gridImageBmw,
              },
              {
                src: "/Headercarousel/cognizant1.avif",
                name: "Cognizant",
                className: styles.gridImageCog,
              },
              {
                src: "/Headercarousel/Cisco.avif",
                name: "Cisco",
                className: styles.gridImageCis,
              },
              {
                src: "/Headercarousel/TechM.avif",
                name: "Tech Mahindra",
                className: styles.gridImageTec,
              },
            ].map((company, idx) => (
              <Image
                key={idx}
                src={company.src}
                alt={`${company.name} logo - our mentors come from here`}
                className={company.className}
                width={80}
                height={40}
                loading="lazy" // Ensure these are lazy loaded
                sizes="80px"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Component for the fourth carousel slide (Quiz)
const QuizSlide = ({ question, setQuestion }) => (
  <div className={styles.carouselSlide4}>
    <div className={styles.leftSideH}>
      <h2 dangerouslySetInnerHTML={{ __html: question.title }}></h2>
      <p dangerouslySetInnerHTML={{ __html: question.text }}></p>
      <div className={styles.quizOptions}>
        {["Q1", "Q2", "Q3"].map((qKey) => (
          <div key={qKey} className={styles.quizOption}>
            <button
              className={styles.circularButton}
              onMouseEnter={() => setQuestion(QUESTION_DATA[qKey])}
              onClick={() => setQuestion(QUESTION_DATA[qKey])}
              aria-label={`Show question ${qKey}`}
            >
              {qKey}
            </button>
          </div>
        ))}
      </div>
    </div>
    <div className={styles.rightSideH}>
      <Image
        src="/Headercarousel/quizbg.avif"
        alt="Interactive quiz on IT and SAP topics"
        width={500}
        height={400}
        className="plants-image"
        loading="lazy" // Lazy load as it's not initially visible
        sizes="(max-width: 768px) 100vw, 500px"
      />
      <Link href="/" className={styles.goButton}>
        <span>Quiz→</span>
      </Link>
    </div>
  </div>
);

// Main HeaderCarousel component
const HeaderCarousel = () => {
  const [isMobileView, setIsMobileView] = useState(false);
  const [index, setIndex] = useState(0);
  const [textVisible, setTextVisible] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [question, setQuestion] = useState({
    title: "Welcome to the <span class='text-primary font-bold'>Quiz!</span>",
    text: "Hover over or click a question button to see the question here.",
  });

  // Check if viewport is mobile-sized on mount and resize
  useEffect(() => {
    const checkMobileView = () => setIsMobileView(window.innerWidth <= 768);
    checkMobileView(); // Initial check
    window.addEventListener("resize", checkMobileView); // Setup event listener
    return () => window.removeEventListener("resize", checkMobileView); // Cleanup
  }, []);

  // Text rotation effect with optimized interval management
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTextVisible(false);
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % TEXTS.length);
        setTextVisible(true);
      }, 500);
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  // Memoized handlers to prevent unnecessary re-renders
  const scrollToPopCourses = useCallback(() => {
    const element = document.getElementById("popCourses");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const handleButtonClick = useCallback(() => setShowForm(true), []);
  const handleCloseForm = useCallback(() => setShowForm(false), []);

  return (
    <section
      aria-label="Featured Programs and Training Information"
      className={styles.carouselWrapper}
    >
      <Carousel className={styles.carousel} indicators={true} controls={true}>
        {/* First Slide - Career Potential */}
        <Carousel.Item>
          <CareerSlide onButtonClick={handleButtonClick} />
        </Carousel.Item>

        {/* Second Slide - AI Programs */}
        <Carousel.Item>
          <AISlide index={index} onClick={scrollToPopCourses} />
        </Carousel.Item>

        {/* Third Slide (Only for Desktop View) - Industry Experts */}
        {!isMobileView && (
          <Carousel.Item>
            <ExpertsSlide />
          </Carousel.Item>
        )}

        {/* Fourth Slide - Quiz */}
        <Carousel.Item>
          <QuizSlide question={question} setQuestion={setQuestion} />
        </Carousel.Item>
      </Carousel>

      {showForm && <Btnform onClose={handleCloseForm} />}
    </section>
  );
};

export default HeaderCarousel;
