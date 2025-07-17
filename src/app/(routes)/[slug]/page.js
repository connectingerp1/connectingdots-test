// src/app/(routes)/[slug]/page.js - Complete fix with generateStaticParams

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

// Import course-specific modules
import SapModComponent from "@/components/CoursesComponents/sapmod";
import Modules from "@/components/CoursesComponents/Modules";
import HrCard from "@/components/CoursesComponents/HRCard";

// ✅ CRITICAL: Add generateStaticParams to pre-generate all routes
export async function generateStaticParams() {
  const params = [];
  
  try {
    // Generate all course-city combinations
    Object.keys(coursesData).forEach(courseSlug => {
      Object.keys(citiesData).forEach(citySlug => {
        // Generate the proper slug format
        params.push({
          slug: `${courseSlug}-course-in-${citySlug}`
        });
      });
    });

    console.log(`🚀 Generated ${params.length} static params for course pages`);
    return params;
  } catch (error) {
    console.error("❌ Error generating static params:", error);
    return [];
  }
}

// Helper function to parse the slug into course and city components
function parseSlug(slug) {
  const lastInIndex = slug.lastIndexOf("-in-");
  if (lastInIndex === -1) {
    return null;
  }

  let coursePart = slug.substring(0, lastInIndex);
  coursePart = coursePart.replace(
    /-course$|-training$|-developer$|-developer-course$|-developer-training$/,
    ""
  );

  const cityPart = slug.substring(lastInIndex + 4);

  return { courseSlug: coursePart, citySlug: cityPart };
}

// Generate metadata dynamically for each page
export async function generateMetadata({ params }) {
  try {
    const resolvedParams = await params;
    const slug = resolvedParams?.slug;

    if (!slug) {
      console.warn("❌ generateMetadata: Missing slug parameter.");
      return {
        title: "Course Not Found | Connecting Dots ERP",
        description: "The requested course page could not be found.",
      };
    }

    const parsed = parseSlug(slug);
    if (!parsed) {
      console.warn(
        `❌ generateMetadata: Slug "${slug}" does not match expected pattern for dynamic course pages.`
      );
      return {
        title: "Invalid Course URL | Connecting Dots ERP",
        description: "The course URL format is not valid.",
      };
    }

    const { courseSlug, citySlug } = parsed;

    if (!coursesData[courseSlug] || !citiesData[citySlug]) {
      console.warn(
        `❌ generateMetadata: Course "${courseSlug}" or City "${citySlug}" not found in masterData.`
      );
      return {
        title: "Course Not Available | Connecting Dots ERP",
        description: "The requested course or location is not available.",
      };
    }

    const metadata = generateDynamicMetadata(courseSlug, citySlug);
    if (!metadata) {
      console.warn(
        `❌ generateMetadata: Failed to generate metadata for "${slug}".`
      );
      return {
        title: "Course Information Unavailable | Connecting Dots ERP",
        description: "Course information could not be loaded.",
      };
    }

    const metadataObject = {
      title: metadata.title,
      description: metadata.description,
      keywords: metadata.keywords,
      robots: metadata.robots,
      authors: metadata.authors,
      alternates: {
        canonical: metadata.canonical,
        languages: metadata.alternates.reduce((acc, alt) => {
          if (alt.hreflang && alt.href) {
            acc[alt.hreflang] = alt.href;
          }
          return acc;
        }, {}),
      },
      openGraph: metadata.openGraph,
      twitter: metadata.twitter,
      icons: {
        icon: metadata.icons.icon,
        apple: metadata.icons.appleTouchIcon,
      },
      manifest: metadata.manifest,
    };

    if (metadata.isMajorCity && metadata.enhancedMeta) {
      metadataObject.other = metadataObject.other || {};
      Object.assign(metadataObject.other, {
        "geo.region": metadata.enhancedMeta.geoRegion,
        "geo.placename": metadata.enhancedMeta.geoPlacename,
        "geo.position": metadata.enhancedMeta.geoPosition,
        ICBM: metadata.enhancedMeta.icbm,
        "course.provider": metadata.enhancedMeta.courseProvider,
        "course.location": metadata.enhancedMeta.courseLocation,
        "course.category": metadata.enhancedMeta.courseCategory,
        "theme-color": metadata.enhancedMeta.themeColor,
        "msapplication-navbutton-color":
          metadata.enhancedMeta.msApplicationNavButtonColor,
        "apple-mobile-web-app-status-bar-style":
          metadata.enhancedMeta.appleStatusBarStyle,
        "mobile-web-app-capable": metadata.enhancedMeta["mobile-web-app-capable"],
        "apple-mobile-web-app-title": metadata.enhancedMeta.appleMobileTitle,
      });
    }

    if (metadata.facebook?.appId) {
      metadataObject.other = metadataObject.other || {};
      metadataObject.other["fb:app_id"] = metadata.facebook.appId;
    }
    if (metadata.pinterest?.richPin) {
      metadataObject.other = metadataObject.other || {};
      metadataObject.other["pinterest-rich-pin"] = metadata.pinterest.richPin;
    }

    return metadataObject;
  } catch (error) {
    console.error("❌ Error in generateMetadata:", error);
    return {
      title: "Error Loading Course | Connecting Dots ERP",
      description: "An error occurred while loading the course information.",
    };
  }
}

const CourseCityPage = async ({ params }) => {
  try {
    const resolvedParams = await params;
    const slug = resolvedParams?.slug;

    if (!slug) return notFound();

    const parsed = parseSlug(slug);
    if (!parsed) {
      console.warn(
        `❌ CourseCityPage: Slug "${slug}" does not match course-city pattern. Returning notFound().`
      );
      return notFound();
    }

    const { courseSlug, citySlug } = parsed;

    const course = coursesData[courseSlug];
    const city = citiesData[citySlug];

    if (!course || !city) {
      console.error(
        `❌ CourseCityPage: Course "${courseSlug}" or City "${citySlug}" not found in masterData. Returning notFound().`
      );
      return notFound();
    }

    const jsonLd = generateDynamicJsonLd(courseSlug, citySlug);

    const processPlaceholders = (obj, cityNameToUse) => {
      if (typeof obj === "string") {
        return obj.replace(/{city}/g, cityNameToUse);
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
    };

    const headerData = processPlaceholders(course.header, city.name);
    const whyData = processPlaceholders(course.why, city.name);
    const sapModData = course.sapMod
      ? processPlaceholders(course.sapMod, city.name)
      : null;
    const modulesData = course.modulesData
      ? processPlaceholders(course.modulesData, city.name)
      : null;
    const certificateData = processPlaceholders(course.certificate, city.name);
    const faqData = processPlaceholders(course.faq, city.name);
    const relatedCoursesData = processPlaceholders(
      course.relatedCourses,
      city.name
    );

    // Handle description content - check if it's multi-section (like Digital Marketing) or single section
    const descriptionContentData = processPlaceholders(
      course.descriptionContent,
      city.name
    );

    // Check if this is a multi-section course (like Digital Marketing)
    const isMultiSectionCourse =
      descriptionContentData &&
      (descriptionContentData.main ||
        descriptionContentData.ppc ||
        descriptionContentData.seo);

    // ✅ FIXED: Static content that won't cause hydration mismatches
    const dynamicBodyContent = `
      <div class="course-main-content">
        <h1 class="visually-hidden">${course.title} Course in ${city.name}</h1>
        <h2 class="visually-hidden">Best ${course.fullTitle} Training in ${city.name}</h2>
        <p class="visually-hidden">${course.description.replace(/{city}/g, city.name)}</p>
        
        <section class="course-summary">
          <h3>About Our ${course.fullTitle} Course</h3>
          <p>Our comprehensive ${course.title} course in ${city.name} is designed to equip you with practical skills and industry insights.</p>
          <p>Get ready for a successful career in roles such as ${course.jobRoles.slice(0, 2).join(" or ")}.</p>
        </section>

        ${renderOfficeSpecificContent(city, course.title)}
      </div>
    `;

    function renderOfficeSpecificContent(cityData, courseTitle) {
      if (cityData.hasOffice && cityData.office) {
        return `
          <section class="our-local-presence">
            <h3>Visit Our Training Center in ${cityData.name}</h3>
            <p>We're proud to offer in-person training at our state-of-the-art facility in ${cityData.name}.</p>
            <p><strong>Address:</strong> ${cityData.office.address}</p>
            <p><strong>Phone:</strong> ${cityData.office.phone}</p>
            <p><strong>Operating Hours:</strong> ${cityData.office.hours.open} - ${cityData.office.hours.close} daily</p>
            <p>Rated <strong>${cityData.office.rating}/5</strong> by ${cityData.office.reviewCount} students on Google.</p>
            ${cityData.office.mapUrl ? `<p><a href="${cityData.office.mapUrl}" target="_blank" rel="noopener noreferrer">Get Directions to our ${courseTitle} Training Center</a></p>` : ""}
          </section>
        `;
      }
      return "";
    }

    // ✅ FIXED: Improved scroll script with better error handling
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

    // Render Digital Marketing specific layout
    if (courseSlug === "digital-marketing" && isMultiSectionCourse) {
      return (
        <>
          {/* Inject JSON-LD structured data (server-rendered) */}
          {jsonLd && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
          )}

          {/* Render core dynamic content for the page body */}
          <div dangerouslySetInnerHTML={{ __html: dynamicBodyContent }} />

          {/* ✅ FIXED: Better ClientOnly usage with proper fallback */}
          <ClientOnly fallback={
            <div style={{ minHeight: '200px', padding: '20px', textAlign: 'center' }}>
              <div>Loading page content...</div>
            </div>
          }>
            <DSHeader data={headerData} />
            <Why data={whyData} />
            {sapModData && <SapModComponent data={sapModData} />}
            <Counselor />

            {/* Main description section */}
            <Description data={descriptionContentData.main} />

            {/* PPC Section with scroll anchor */}
            <div id="pay-per-click" style={{ scrollMarginTop: "80px" }}>
              {descriptionContentData.ppc && (
                <Description data={descriptionContentData.ppc} sectionIndex={0} />
              )}
            </div>

            <TrustUs />

            {/* SEO Section with scroll anchor */}
            <div
              id="search-engine-optimization"
              style={{ scrollMarginTop: "80px" }}
            >
              {descriptionContentData.seo && (
                <Description data={descriptionContentData.seo} sectionIndex={1} />
              )}
            </div>

            <Certificate data={certificateData} />
            <Program />

            {/* SMM Section with scroll anchor */}
            <div id="social-media-marketing" style={{ scrollMarginTop: "80px" }}>
              {descriptionContentData.smm && (
                <Description data={descriptionContentData.smm} sectionIndex={0} />
              )}
            </div>

            {/* Analytics Section with scroll anchor */}
            <div id="advance-analytics" style={{ scrollMarginTop: "80px" }}>
              {descriptionContentData.analytics && (
                <Description
                  data={descriptionContentData.analytics}
                  sectionIndex={1}
                />
              )}
            </div>

            <FAQ data={faqData} />
            <CoursesRelated
              data={relatedCoursesData}
              currentCityName={city.name}
            />
          </ClientOnly>

          {/* ✅ FIXED: Move script to end to prevent execution issues */}
          <div dangerouslySetInnerHTML={{ __html: scrollScript }} />
        </>
      );
    }

    // Default layout for other courses (SAP, HR, etc.)
    return (
      <>
        {/* Inject JSON-LD structured data (server-rendered) */}
        {jsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        )}

        {/* Render core dynamic content for the page body */}
        <div dangerouslySetInnerHTML={{ __html: dynamicBodyContent }} />

        {/* ✅ FIXED: Better ClientOnly usage */}
        <ClientOnly fallback={
          <div style={{ minHeight: '200px', padding: '20px', textAlign: 'center' }}>
            <div>Loading page content...</div>
          </div>
        }>
          <DSHeader data={headerData} />
          <Why data={whyData} />

          {/* Conditional rendering based on data availability */}
          {sapModData && <SapModComponent data={sapModData} />}
          {modulesData && <Modules data={modulesData} />}

          <Counselor />
          <TrustUs />
          <Program />
          <Certificate data={certificateData} />

          {/* Single description section for non-multi-section courses */}
          <Description data={descriptionContentData} />

          <FAQ data={faqData} />
          {course.category === 'hr' && <HrCard />}
          <CoursesRelated data={relatedCoursesData} currentCityName={city.name} />
        </ClientOnly>

        {/* ✅ FIXED: Move script to end */}
        <div dangerouslySetInnerHTML={{ __html: scrollScript }} />
      </>
    );
  } catch (error) {
    console.error("❌ Error in CourseCityPage:", error);
    return notFound();
  }
};

export default CourseCityPage;