// src/app/(routes)/[slug]/page.js - Fixed with limited static generation

import { notFound } from "next/navigation";
import ClientOnly from "@/context/ClientOnly";
import {
  generateDynamicMetadata,
  generateDynamicJsonLd,
} from "@/lib/dynamicSEO";
import { coursesData, citiesData } from "@/lib/masterData";

// Import all your common components
import DSHeader from "@/components/CoursesComponents/Header";
import Why from "@/components/CoursesComponents/Why";
import Counselor from "@/components/CoursesComponents/Councelor";
import TrustUs from "@/components/CoursesComponents/Trustus";
import Certificate from "@/components/HomePage/Certificate";
import Program from "@/components/CoursesComponents/ProgramHighlights";
import Description from "@/components/CoursesComponents/Description";
import FAQ from "@/components/CoursesComponents/FAQ";
import CoursesRelated from "@/components/CoursesComponents/RelatedCourses";
import SapModComponent from "@/components/CoursesComponents/sapmod";
import Modules from "@/components/CoursesComponents/Modules";
import HrCard from "@/components/CoursesComponents/HRCard";

// ✅ FIXED: Limited static generation to prevent build timeouts
export async function generateStaticParams() {
  try {
    // Check if data exists
    if (!coursesData || !citiesData) {
      console.warn("⚠️ Master data not available for static generation");
      return [];
    }

    const params = [];
    const courseKeys = Object.keys(coursesData);
    const cityKeys = Object.keys(citiesData);

    // ✅ CRITICAL: Limit generation to prevent build timeouts
    // Priority cities for initial deployment
    const priorityCities = [
      "pune",
      "mumbai",
      "delhi",
      "bangalore",
      "chennai",
      "hyderabad",
    ];
    const limitedCities = cityKeys.filter((city) =>
      priorityCities.includes(city)
    );

    // Priority courses for initial deployment
    const priorityCourses = [
      "sap-fico",
      "sap",
      "digital-marketing",
      "data-science",
      "java",
    ];
    const limitedCourses = courseKeys.filter((course) =>
      priorityCourses.includes(course)
    );

    // Generate limited combinations first
    limitedCourses.forEach((courseSlug) => {
      limitedCities.forEach((citySlug) => {
        try {
          const course = coursesData[courseSlug];
          const city = citiesData[citySlug];

          if (course && city && course.slug && city.name) {
            params.push({
              slug: `${courseSlug}-course-in-${citySlug}`,
            });
          }
        } catch (error) {
          console.warn(
            `⚠️ Error processing ${courseSlug}-${citySlug}:`,
            error.message
          );
        }
      });
    });

    console.log(
      `✅ Generated ${params.length} priority static params for course pages`
    );

    // Return limited set for initial deployment
    return params;
  } catch (error) {
    console.error("❌ Error in generateStaticParams:", error);
    return [];
  }
}

// Helper function to parse the slug into course and city components
function parseSlug(slug) {
  try {
    if (!slug || typeof slug !== "string") return null;

    const lastInIndex = slug.lastIndexOf("-in-");
    if (lastInIndex === -1) return null;

    let coursePart = slug.substring(0, lastInIndex);
    coursePart = coursePart.replace(
      /-course$|-training$|-developer$|-developer-course$|-developer-training$/,
      ""
    );

    const cityPart = slug.substring(lastInIndex + 4);
    if (!coursePart || !cityPart) return null;

    return { courseSlug: coursePart, citySlug: cityPart };
  } catch (error) {
    console.error("Error parsing slug:", error);
    return null;
  }
}

// ✅ FIXED: Better error handling in generateMetadata
export async function generateMetadata({ params }) {
  try {
    const resolvedParams = await params;
    const slug = resolvedParams?.slug;

    if (!slug) {
      return {
        title: "Course Not Found | Connecting Dots ERP",
        description: "The requested course page could not be found.",
      };
    }

    const parsed = parseSlug(slug);
    if (!parsed) {
      return {
        title: "Invalid Course URL | Connecting Dots ERP",
        description: "The course URL format is not valid.",
      };
    }

    const { courseSlug, citySlug } = parsed;

    if (
      !coursesData ||
      !citiesData ||
      !coursesData[courseSlug] ||
      !citiesData[citySlug]
    ) {
      return {
        title: "Course Not Available | Connecting Dots ERP",
        description: "The requested course or location is not available.",
      };
    }

    const metadata = generateDynamicMetadata(courseSlug, citySlug);
    if (!metadata) {
      return {
        title: "Course Information Unavailable | Connecting Dots ERP",
        description: "Course information could not be loaded.",
      };
    }

    return {
      title: metadata.title,
      description: metadata.description,
      keywords: metadata.keywords,
      robots: metadata.robots,
      alternates: {
        canonical: metadata.canonical,
        languages:
          metadata.alternates?.reduce((acc, alt) => {
            if (alt.hreflang && alt.href) {
              acc[alt.hreflang] = alt.href;
            }
            return acc;
          }, {}) || {},
      },
      openGraph: metadata.openGraph,
      twitter: metadata.twitter,
      icons: {
        icon: metadata.icons?.icon || "/favicon.ico",
        apple: metadata.icons?.appleTouchIcon || "/apple-touch-icon.png",
      },
      manifest: metadata.manifest || "/site.webmanifest",
    };
  } catch (error) {
    console.error("❌ Error in generateMetadata:", error);
    return {
      title: "Error Loading Course | Connecting Dots ERP",
      description: "An error occurred while loading the course information.",
    };
  }
}

// ✅ FIXED: Main component with better error handling
const CourseCityPage = async ({ params }) => {
  try {
    const resolvedParams = await params;
    const slug = resolvedParams?.slug;

    if (!slug) notFound();

    const parsed = parseSlug(slug);
    if (!parsed) notFound();

    const { courseSlug, citySlug } = parsed;

    if (!coursesData || !citiesData) notFound();

    const course = coursesData[courseSlug];
    const city = citiesData[citySlug];

    if (!course || !city) notFound();

    const jsonLd = generateDynamicJsonLd(courseSlug, citySlug);

    const processPlaceholders = (obj, cityNameToUse) => {
      try {
        if (typeof obj === "string") {
          return obj.replace(/{city}/g, cityNameToUse || "");
        }
        if (Array.isArray(obj)) {
          return obj.map((item) => processPlaceholders(item, cityNameToUse));
        }
        if (typeof obj === "object" && obj !== null) {
          const newObj = {};
          for (const key in obj) {
            newObj[key] = processPlaceholders(obj[key], cityNameToUse);
          }
          return newObj;
        }
        return obj;
      } catch (error) {
        console.warn("Error processing placeholders:", error);
        return obj;
      }
    };

    // Safe data processing with fallbacks
    const headerData = course.header
      ? processPlaceholders(course.header, city.name)
      : null;
    const whyData = course.why
      ? processPlaceholders(course.why, city.name)
      : null;
    const sapModData = course.sapMod
      ? processPlaceholders(course.sapMod, city.name)
      : null;
    const modulesData = course.modulesData
      ? processPlaceholders(course.modulesData, city.name)
      : null;
    const certificateData = course.certificate
      ? processPlaceholders(course.certificate, city.name)
      : null;
    const faqData = course.faq
      ? processPlaceholders(course.faq, city.name)
      : null;
    const relatedCoursesData = course.relatedCourses
      ? processPlaceholders(course.relatedCourses, city.name)
      : null;
    const descriptionContentData = course.descriptionContent
      ? processPlaceholders(course.descriptionContent, city.name)
      : null;

    // Check if this is a multi-section course
    const isMultiSectionCourse =
      descriptionContentData &&
      (descriptionContentData.main ||
        descriptionContentData.ppc ||
        descriptionContentData.seo);

    // Safe content generation
    const dynamicBodyContent = `
      <div class="course-main-content">
        <h1 class="visually-hidden">${course.title || "Course"} Course in ${city.name || "City"}</h1>
        <h2 class="visually-hidden">Best ${course.fullTitle || course.title || "Course"} Training in ${city.name || "City"}</h2>
        <p class="visually-hidden">${(course.description || "").replace(/{city}/g, city.name || "")}</p>
        
        <section class="course-summary">
          <h3>About Our ${course.fullTitle || course.title || "Course"} Course</h3>
          <p>Our comprehensive ${course.title || "course"} course in ${city.name || "your city"} is designed to equip you with practical skills and industry insights.</p>
          ${
            course.jobRoles && course.jobRoles.length > 0
              ? `<p>Get ready for a successful career in roles such as ${course.jobRoles.slice(0, 2).join(" or ")}.</p>`
              : ""
          }
        </section>

        ${renderOfficeSpecificContent(city, course.title)}
      </div>
    `;

    function renderOfficeSpecificContent(cityData, courseTitle) {
      try {
        if (cityData.hasOffice && cityData.office) {
          return `
            <section class="our-local-presence">
              <h3>Visit Our Training Center in ${cityData.name}</h3>
              <p>We're proud to offer in-person training at our state-of-the-art facility in ${cityData.name}.</p>
              <p><strong>Address:</strong> ${cityData.office.address || ""}</p>
              <p><strong>Phone:</strong> ${cityData.office.phone || ""}</p>
              <p><strong>Operating Hours:</strong> ${cityData.office.hours?.open || "9:00"} - ${cityData.office.hours?.close || "18:00"} daily</p>
              <p>Rated <strong>${cityData.office.rating || "4.5"}/5</strong> by ${cityData.office.reviewCount || "100"} students on Google.</p>
              ${cityData.office.mapUrl ? `<p><a href="${cityData.office.mapUrl}" target="_blank" rel="noopener noreferrer">Get Directions to our ${courseTitle || "Training"} Training Center</a></p>` : ""}
            </section>
          `;
        }
        return "";
      } catch (error) {
        console.warn("Error rendering office content:", error);
        return "";
      }
    }

    // Improved scroll script
    const scrollScript = `
      <script>
        (function() {
          if (typeof window === 'undefined') return;
          
          try {
            function scrollToHash() {
              const hash = window.location.hash.replace('#', '');
              if (hash) {
                requestAnimationFrame(() => {
                  setTimeout(() => {
                    try {
                      const element = document.getElementById(hash);
                      if (element) {
                        element.scrollIntoView({ 
                          behavior: 'smooth', 
                          block: 'start',
                          inline: 'nearest'
                        });
                      }
                    } catch (scrollError) {
                      console.warn('Scroll error:', scrollError);
                    }
                  }, 100);
                });
              }
            }
            
            if (document.readyState === 'loading') {
              document.addEventListener('DOMContentLoaded', scrollToHash);
            } else {
              scrollToHash();
            }
            
            window.addEventListener('hashchange', scrollToHash);
          } catch (error) {
            console.warn('Scroll script error:', error);
          }
        })();
      </script>
    `;

    // Default layout for all courses (simplified)
    return (
      <>
        {jsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        )}

        <div dangerouslySetInnerHTML={{ __html: dynamicBodyContent }} />

        <ClientOnly
          fallback={
            <div
              style={{
                minHeight: "200px",
                padding: "20px",
                textAlign: "center",
              }}
            >
              <div>Loading page content...</div>
            </div>
          }
        >
          {headerData && <DSHeader data={headerData} />}
          {whyData && <Why data={whyData} />}
          {sapModData && <SapModComponent data={sapModData} />}
          {modulesData && <Modules data={modulesData} />}
          <Counselor />
          <TrustUs />
          <Program />
          {certificateData && <Certificate data={certificateData} />}
          {descriptionContentData && (
            <Description data={descriptionContentData} />
          )}
          {faqData && <FAQ data={faqData} />}
          {course.category === "hr" && <HrCard />}
          {relatedCoursesData && (
            <CoursesRelated
              data={relatedCoursesData}
              currentCityName={city.name}
            />
          )}
        </ClientOnly>

        <div dangerouslySetInnerHTML={{ __html: scrollScript }} />
      </>
    );
  } catch (error) {
    console.error("❌ Error in CourseCityPage:", error);
    notFound();
  }
};

export default CourseCityPage;
