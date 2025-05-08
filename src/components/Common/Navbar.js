"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import styles from "@/styles/Common/Navbar.module.css";
import AnimatedLogo from "../AnimatedLogo";

// Custom component definitions
const Navbar = ({ expand, className, children }) => (
  <nav
    className={`${styles.navbar} ${
      expand
        ? styles[
            `navbarExpand${expand.charAt(0).toUpperCase() + expand.slice(1)}`
          ]
        : ""
    } ${className || ""}`}
  >
    {children}
  </nav>
);

const Container = ({ fluid, className, children }) => (
  <div
    className={`${fluid ? styles.containerFluid : styles.container} ${
      className || ""
    }`}
  >
    {children}
  </div>
);

const Nav = ({ className, children }) => (
  <div className={`${styles.nav} ${className || ""}`}>{children}</div>
);

const Button = ({ className, onClick, children, ...props }) => (
  <button
    className={`${styles.btn} ${className || ""}`}
    onClick={onClick}
    {...props}
  >
    {children}
  </button>
);

const Header = () => {
  const [activeLink, setActiveLink] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState({
    dropdown2: false,
    dropdown3: false,
    dropdown4: false,
    dropdown5: false,
    dropdown6: false,
  });
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  // Track which mobile dropdown is open
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState(null);

  // Add these state variables for touch gestures
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchMoveX, setTouchMoveX] = useState(null);
  const [sidebarClass, setSidebarClass] = useState("");
  const [overlayVisible, setOverlayVisible] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const sidebarRef = useRef(null);

  // Handle click outside sidebar to close it
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        isSidebarVisible &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !event.target.classList.contains(styles.navbarToggler) &&
        !event.target.classList.contains(styles.navbarTogglerIcon)
      ) {
        setIsSidebarVisible(false);
        // Reset all mobile dropdowns when closing sidebar
        setMobileOpenDropdown(null);
      }
    }

    // Add event listener when sidebar is open
    if (isSidebarVisible) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    // Cleanup function
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isSidebarVisible]);

  // Add effect to handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992 && isSidebarVisible) {
        setIsSidebarVisible(false);
        setMobileOpenDropdown(null);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isSidebarVisible]);

  // Add effect to manage overlay and body scroll
  useEffect(() => {
    if (isSidebarVisible) {
      setOverlayVisible(true);
      // Small delay to ensure overlay fades in properly
      setTimeout(() => (document.body.style.overflow = "hidden"), 100);
    } else {
      setOverlayVisible(false);
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarVisible]);

  const handleNavClick = (link) => {
    setActiveLink(link);
    setIsSidebarVisible(false);
    setMobileOpenDropdown(null);
  };

  const handleMouseEnter = (dropdown) => {
    // Only handle hover events on desktop
    if (window.innerWidth >= 992) {
      setIsDropdownVisible((prev) => ({ ...prev, [dropdown]: true }));
    }
  };

  const handleMouseLeave = (dropdown) => {
    // Only handle hover events on desktop
    if (window.innerWidth >= 992) {
      setIsDropdownVisible((prev) => ({ ...prev, [dropdown]: false }));
    }
  };

  const handleMobileDropdownToggle = (dropdown) => {
    // For mobile view, toggle dropdowns on click instead of hover
    if (window.innerWidth < 992) {
      setMobileOpenDropdown(mobileOpenDropdown === dropdown ? null : dropdown);
    }
  };

  const handleNavigation = (link, section) => {
    if (pathname !== link) {
      router.push(link);
      setTimeout(() => {
        window.location.hash = section;
        setIsSidebarVisible(false);
        setMobileOpenDropdown(null);
      }, 100);
    } else {
      window.location.hash = section;
      setIsSidebarVisible(false);
      setMobileOpenDropdown(null);
    }
  };

  // Add touch gesture handlers
  const handleTouchStart = (e) => {
    setSidebarClass("touchStart");
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!touchStartX) return;

    const currentX = e.touches[0].clientX;
    setTouchMoveX(currentX);

    // Calculate distance moved
    const deltaX = currentX - touchStartX;

    // Only allow sliding to the left (to close)
    if (deltaX < 0) return;

    setSidebarClass("touchMove");

    // Apply transform based on touch movement (limit max movement)
    const sidebarElement = sidebarRef.current;
    if (sidebarElement) {
      const moveX = Math.min(Math.abs(deltaX), sidebarElement.offsetWidth);
      sidebarElement.style.transform = `translateX(${moveX}px)`;
    }
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchMoveX) {
      setSidebarClass("");
      return;
    }

    // Calculate distance moved
    const deltaX = touchMoveX - touchStartX;

    // If moved more than 100px or 40% of sidebar width, close the sidebar
    const sidebarElement = sidebarRef.current;
    const threshold = Math.min(
      100,
      sidebarElement ? sidebarElement.offsetWidth * 0.4 : 100
    );

    setSidebarClass("touchEnd");

    if (deltaX > threshold) {
      // User swiped right enough to close sidebar
      setIsSidebarVisible(false);
      setMobileOpenDropdown(null);

      // Reset sidebar transform
      if (sidebarElement) {
        sidebarElement.style.transform = "";
      }
    } else {
      // Not enough movement, snap back
      if (sidebarElement) {
        sidebarElement.style.transform = "";
      }
    }

    // Reset touch tracking
    setTouchStartX(null);
    setTouchMoveX(null);
  };

  const renderDropdownSAP = (isMobile = false) => (
    <div
      className={styles.dropdown}
      onMouseEnter={() => handleMouseEnter("dropdown2")}
      onMouseLeave={() => handleMouseLeave("dropdown2")}
    >
      <div className={styles.dropdownToggleWrapper}>
        <Link
          href="/sap-course-in-pune"
          className={`${styles.navLink} ${styles.dropdownToggle} ${
            activeLink === "dropdown2" ? styles.active : ""
          }`}
          id="dropdownMenuButton2"
          onClick={(e) => {
            if (isMobile) {
              e.preventDefault();
              handleMobileDropdownToggle("dropdown2");
            }
          }}
          aria-expanded={
            (isMobile && mobileOpenDropdown === "dropdown2") ||
            (!isMobile && isDropdownVisible.dropdown2)
              ? "true"
              : "false"
          }
        >
          SAP S/4 HANA
          {!isMobile && <span className={styles.desktopDropdownArrow}>▼</span>}
        </Link>
        {isMobile && (
          <button
            className={styles.mobileDropdownArrow}
            onClick={() => handleMobileDropdownToggle("dropdown2")}
            aria-label="Toggle SAP menu"
          >
            <span
              className={`${styles.arrow} ${
                mobileOpenDropdown === "dropdown2"
                  ? styles.arrowUp
                  : styles.arrowDown
              }`}
            ></span>
          </button>
        )}
      </div>
      {((isMobile && mobileOpenDropdown === "dropdown2") ||
        (!isMobile && isDropdownVisible.dropdown2)) && (
        <ul
          className={`${styles.dropdownMenu} ${styles.show}`}
          aria-labelledby="dropdownMenuButton2"
        >
          {[
            {
              title: "SAP Functional",
              items: [
                { name: "SAP FICO", link: "/sap-fico-course-in-pune" },
                { name: "SAP Ariba", link: "/sap-ariba-course-in-pune" },
                { name: "SAP MM", link: "/sap-mm-course-in-pune" },
                { name: "SAP SD", link: "/sap-sd-course-in-pune" },
                { name: "SAP HR/HCM", link: "/sap-hr-hcm-course-in-pune" },
                { name: "SAP PP", link: "/sap-pp-course-in-pune" },
                { name: "SAP QM", link: "/sap-qm-course-in-pune" },
                { name: "SAP PM", link: "/sap-pm-course-in-pune" },
                { name: "SAP PS", link: "/sap-ps-course-in-pune" },
                { name: "SAP EWM", link: "/sap-ewm-course-in-pune" },
                { name: "SAP SCM", link: "/sap-scm-course-in-pune" },
                {
                  name: "SAP SUCCESSFACTOR",
                  link: "/sap-successfactors-course-in-pune",
                },
              ],
            },
            {
              title: "SAP Technical",
              items: [
                { name: "SAP ABAP", link: "/sap-abap-course-in-pune" },
                { name: "SAP S/4 HANA", link: "/sap-s4-hana-course-in-pune" },
                { name: "SAP BW/BI", link: "/sap-bwbi-course-in-pune" },
                { name: "SAP BASIS", link: "/sap-basis-course-in-pune" },
              ],
            },
          ].map((submenu, index) => (
            <li key={index}>
              <div className={styles.subMenuHeader}>
                <span className={styles.subMenuTitle}>{submenu.title}</span>
                {/* Add arrows for both mobile and desktop */}
                <span className={styles.subMenuArrow}>&raquo;</span>
              </div>
              <ul
                className={`${styles.dropdownMenu} ${
                  isMobile ? styles.mobileSubmenu : styles.dropdownSubmenu
                }`}
              >
                {submenu.items.map((item, subIndex) => (
                  <li key={subIndex}>
                    <Link
                      className={styles.dropdownItem}
                      href={item.link}
                      onClick={() => handleNavClick(item.link)}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
  const renderDropdownITCourses = (isMobile = false) => (
    <div
      className={styles.dropdown}
      onMouseEnter={() => handleMouseEnter("dropdown3")}
      onMouseLeave={() => handleMouseLeave("dropdown3")}
    >
      <div className={styles.dropdownToggleWrapper}>
        <Link
          href="/it-course-in-pune"
          className={`${styles.navLink} ${styles.dropdownToggle} ${
            activeLink === "dropdown3" ? styles.active : ""
          }`}
          id="dropdownMenuButton3"
          onClick={(e) => {
            if (isMobile) {
              e.preventDefault();
              handleMobileDropdownToggle("dropdown3");
            }
          }}
          aria-expanded={
            (isMobile && mobileOpenDropdown === "dropdown3") ||
            (!isMobile && isDropdownVisible.dropdown3)
              ? "true"
              : "false"
          }
        >
          IT Courses
          {!isMobile && <span className={styles.desktopDropdownArrow}>▼</span>}
        </Link>
        {isMobile && (
          <button
            className={styles.mobileDropdownArrow}
            onClick={() => handleMobileDropdownToggle("dropdown3")}
            aria-label="Toggle IT Courses menu"
          >
            <span
              className={`${styles.arrow} ${
                mobileOpenDropdown === "dropdown3"
                  ? styles.arrowUp
                  : styles.arrowDown
              }`}
            ></span>
          </button>
        )}
      </div>
      {((isMobile && mobileOpenDropdown === "dropdown3") ||
        (!isMobile && isDropdownVisible.dropdown3)) && (
        <ul
          className={`${styles.dropdownMenu} ${styles.show}`}
          aria-labelledby="dropdownMenuButton3"
        >
          {[
            {
              title: "Data Science",
              items: [
                {
                  name: "MASTERS IN DATA ANALYTICS",
                  link: "/data-analytics-course-in-pune",
                },
                {
                  name: "MASTERS IN DATA SCIENCE",
                  link: "/data-science-course-in-pune",
                },
                {
                  name: "MASTERS IN BUSINESS ANALYTICS",
                  link: "/business-analytics-course-in-pune",
                },
                { name: "CHAT GPT & AI", link: "/chatgpt-course-in-pune" },
              ],
            },
            {
              title: "Full Stack Training",
              link: "/full-stack-developer-course-in-pune",
            },
            {
              title: "JAVA",
              link: "/java-course-in-pune",
            },
            {
              title: "MERN Stack",
              link: "/mern-stack-course-in-pune",
            },
            {
              title: "UI/UX Design",
              link: "/ui-ux-course-in-pune",
            },
            {
              title: "Python",
              link: "/python-course-in-pune",
            },
            {
              title: "Salesforce",
              link: "/salesforce-training-in-pune",
            },
          ].map((submenu, index) => (
            <li key={index}>
              {submenu.items ? (
                <>
                  <div className={styles.subMenuHeader}>
                    <span className={styles.subMenuTitle}>{submenu.title}</span>
                    {/* Removed the !isMobile condition to show arrow in all views */}
                    <span className={styles.subMenuArrow}>&raquo;</span>
                  </div>
                  <ul
                    className={`${styles.dropdownMenu} ${
                      isMobile ? styles.mobileSubmenu : styles.dropdownSubmenu
                    }`}
                  >
                    {submenu.items.map((item, subIndex) => (
                      <li key={subIndex}>
                        <Link
                          className={styles.dropdownItem}
                          href={item.link}
                          onClick={() => handleNavClick(item.link)}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <Link
                  className={styles.dropdownItem}
                  href={submenu.link}
                  onClick={() => handleNavClick(submenu.link)}
                >
                  {submenu.title}
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
  const renderDropdownDataVisualisation = (isMobile = false) => (
    <div
      className={styles.dropdown}
      onMouseEnter={() => handleMouseEnter("dropdown4")}
      onMouseLeave={() => handleMouseLeave("dropdown4")}
    >
      <div className={styles.dropdownToggleWrapper}>
        <Link
          href="/data-visualisation-course-in-pune"
          className={`${styles.navLink} ${styles.dropdownToggle} ${
            activeLink === "dropdown4" ? styles.active : ""
          }`}
          id="dropdownMenuButton4"
          onClick={(e) => {
            if (isMobile) {
              e.preventDefault();
              handleMobileDropdownToggle("dropdown4");
            }
          }}
          aria-expanded={
            (isMobile && mobileOpenDropdown === "dropdown4") ||
            (!isMobile && isDropdownVisible.dropdown4)
              ? "true"
              : "false"
          }
        >
          Data Visualisation
          {!isMobile && <span className={styles.desktopDropdownArrow}>▼</span>}
        </Link>
        {isMobile && (
          <button
            className={styles.mobileDropdownArrow}
            onClick={() => handleMobileDropdownToggle("dropdown4")}
            aria-label="Toggle Data Visualisation menu"
          >
            <span
              className={`${styles.arrow} ${
                mobileOpenDropdown === "dropdown4"
                  ? styles.arrowUp
                  : styles.arrowDown
              }`}
            ></span>
          </button>
        )}
      </div>
      {((isMobile && mobileOpenDropdown === "dropdown4") ||
        (!isMobile && isDropdownVisible.dropdown4)) && (
        <ul
          className={`${styles.dropdownMenu} ${styles.show}`}
          aria-labelledby="dropdownMenuButton4"
        >
          {[
            { name: "Tableau", link: "/tableau-training-in-pune" },
            { name: "Power BI", link: "/power-bi-course-in-pune" },
            { name: "SQL", link: "/sql-course-in-pune" },
          ].map((item, index) => (
            <li key={index}>
              <Link
                className={styles.dropdownItem}
                href={item.link}
                onClick={() => handleNavClick(item.link)}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  const renderDropdownDigitalMarketing = (isMobile = false) => (
    <div
      className={styles.dropdown}
      onMouseEnter={() => handleMouseEnter("dropdown5")}
      onMouseLeave={() => handleMouseLeave("dropdown5")}
    >
      <div className={styles.dropdownToggleWrapper}>
        <Link
          href="/digital-marketing-course-in-pune"
          className={`${styles.navLink} ${styles.dropdownToggle} ${
            activeLink === "dropdown5" ? styles.active : ""
          }`}
          id="dropdownMenuButton5"
          onClick={(e) => {
            if (isMobile) {
              e.preventDefault();
              handleMobileDropdownToggle("dropdown5");
            }
          }}
          aria-expanded={
            (isMobile && mobileOpenDropdown === "dropdown5") ||
            (!isMobile && isDropdownVisible.dropdown5)
              ? "true"
              : "false"
          }
        >
          Digital Marketing
          {!isMobile && <span className={styles.desktopDropdownArrow}>▼</span>}
        </Link>
        {isMobile && (
          <button
            className={styles.mobileDropdownArrow}
            onClick={() => handleMobileDropdownToggle("dropdown5")}
            aria-label="Toggle Digital Marketing menu"
          >
            <span
              className={`${styles.arrow} ${
                mobileOpenDropdown === "dropdown5"
                  ? styles.arrowUp
                  : styles.arrowDown
              }`}
            ></span>
          </button>
        )}
      </div>
      {((isMobile && mobileOpenDropdown === "dropdown5") ||
        (!isMobile && isDropdownVisible.dropdown5)) && (
        <ul
          className={`${styles.dropdownMenu} ${styles.show}`}
          aria-labelledby="dropdownMenuButton5"
        >
          {[
            {
              name: "Advance Digital Marketing",
              link: "/digital-marketing-course-in-pune",
            },
            {
              name: "Pay Per Click Training",
              link: "/digital-marketing-course-in-pune#pay-per-click",
              section: "pay-per-click",
            },
            {
              name: "Search Engine Optimization",
              link: "/digital-marketing-course-in-pune#search-engine-optimization",
              section: "search-engine-opti",
            },
            {
              name: "Social Media Marketing",
              link: "/digital-marketing-course-in-pune#social-media-marketing",
              section: "social-media",
            },
            {
              name: "Advance Google Analytics Training",
              link: "/digital-marketing-course-in-pune#advance-analytics",
              section: "advance-analytics",
            },
          ].map((item, index) => (
            <li key={index}>
              <Link
                className={styles.dropdownItem}
                href={item.link}
                onClick={() =>
                  item.section
                    ? handleNavigation(item.link.split("#")[0], item.section)
                    : handleNavClick(item.link)
                }
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  const renderDropdownHRCourses = (isMobile = false) => (
    <div
      className={styles.dropdown}
      onMouseEnter={() => handleMouseEnter("dropdown6")}
      onMouseLeave={() => handleMouseLeave("dropdown6")}
    >
      <div className={styles.dropdownToggleWrapper}>
        <Link
          href="/hr-training-course-in-pune"
          className={`${styles.navLink} ${styles.dropdownToggle} ${
            activeLink === "dropdown6" ? styles.active : ""
          }`}
          id="dropdownMenuButton6"
          onClick={(e) => {
            if (isMobile) {
              e.preventDefault();
              handleMobileDropdownToggle("dropdown6");
            }
          }}
          aria-expanded={
            (isMobile && mobileOpenDropdown === "dropdown6") ||
            (!isMobile && isDropdownVisible.dropdown6)
              ? "true"
              : "false"
          }
        >
          HR Courses
          {!isMobile && <span className={styles.desktopDropdownArrow}>▼</span>}
        </Link>
        {isMobile && (
          <button
            className={styles.mobileDropdownArrow}
            onClick={() => handleMobileDropdownToggle("dropdown6")}
            aria-label="Toggle HR Courses menu"
          >
            <span
              className={`${styles.arrow} ${
                mobileOpenDropdown === "dropdown6"
                  ? styles.arrowUp
                  : styles.arrowDown
              }`}
            ></span>
          </button>
        )}
      </div>
      {((isMobile && mobileOpenDropdown === "dropdown6") ||
        (!isMobile && isDropdownVisible.dropdown6)) && (
        <ul
          className={`${styles.dropdownMenu} ${styles.show}`}
          aria-labelledby="dropdownMenuButton6"
        >
          {[
            { name: "HR Training", link: "/hr-training-course-in-pune" },
            { name: "Core HR", link: "/core-hr-course-in-pune" },
            { name: "HR Payroll", link: "/hr-payroll-course-in-pune" },
            { name: "HR Management", link: "/hr-management-course-in-pune" },
            { name: "HR Generalist", link: "/hr-generalist-course-in-pune" },
            { name: "HR Analytics", link: "/hr-analytics-course-in-pune" },
          ].map((item, index) => (
            <li key={index}>
              <Link
                className={styles.dropdownItem}
                href={item.link}
                onClick={() => handleNavClick(item.link)}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <>
      <Navbar expand="lg" className={styles.headerNav}>
        <Container fluid className={styles.navContainer}>
          <div className={styles.logo}>
            <Link href="/" className={styles.logoLink}>
              <AnimatedLogo className={styles.animatedLogo} />
              <Image
                src="/Navbar/logo.png"
                alt="Logo of Connecting Dots ERP, featuring interconnected dots symbolizing integration and collaboration in enterprise resource planning."
                width={150}
                height={120}
                loading="lazy"
              />
            </Link>
          </div>

          {/* Hamburger Button */}
          <Button
            className={styles.navbarToggler}
            aria-controls="basic-navbar-nav"
            aria-expanded={isSidebarVisible ? "true" : "false"}
            aria-label="Toggle navigation"
            onClick={() => setIsSidebarVisible(!isSidebarVisible)}
          >
            <span className={styles.navbarTogglerIcon}></span>
          </Button>

          <Nav className={styles.navbarDesktop}>
            {renderDropdownSAP()}
            {renderDropdownITCourses()}
            {renderDropdownDataVisualisation()}
            {renderDropdownDigitalMarketing()}
            {renderDropdownHRCourses()}
            <div className={styles.navItem}>
              <Link
                className={styles.navLink}
                href="/aboutus"
                onClick={() => handleNavClick("link1")}
              >
                About us
              </Link>
            </div>
          </Nav>
        </Container>
      </Navbar>

      {/* Sidebar for Smaller Screens with Touch Support */}
      {isSidebarVisible && (
        <>
          <div
            className={`${styles.sidebarOverlay} ${
              overlayVisible ? styles.visible : ""
            }`}
            onClick={() => {
              setIsSidebarVisible(false);
              setMobileOpenDropdown(null);
            }}
          />
          <div
            className={`${styles.sidebar} ${styles.visible} ${styles[sidebarClass]}`}
            ref={sidebarRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className={styles.sidebarHeader}>
              <Button
                className={styles.btnClose}
                onClick={() => {
                  setIsSidebarVisible(false);
                  setMobileOpenDropdown(null);
                }}
              />
            </div>
            <Nav className={styles.sidebarNav}>
              <Link
                className={styles.navLink}
                href="/contactus"
                onClick={() => handleNavClick("link1")}
              >
                Contact us
              </Link>
              <Link
                className={styles.navLink}
                href="/aboutus"
                onClick={() => handleNavClick("link1")}
              >
                About us
              </Link>

              {renderDropdownSAP(true)}
              {renderDropdownITCourses(true)}
              {renderDropdownDataVisualisation(true)}
              {renderDropdownDigitalMarketing(true)}
              {renderDropdownHRCourses(true)}
            </Nav>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
