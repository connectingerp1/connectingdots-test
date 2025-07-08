// lib/dynamicSEO.js (Complete and Optimized for Meta Titles/Descriptions)

import { coursesData, citiesData } from "./masterData.js";

// Helper to safely truncate string to word boundary
function truncateString(str, maxLength) {
  if (!str) return "";
  if (str.length <= maxLength) return str;
  const truncated = str.slice(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(" ");
  // Cut at last word boundary if it's not too far back, otherwise just hard truncate
  return lastSpaceIndex > maxLength * 0.8 && lastSpaceIndex < maxLength
    ? truncated.slice(0, lastSpaceIndex) + "..."
    : truncated + "...";
}

export function generateDynamicMetadata(courseSlug, citySlug) {
  const course = coursesData[courseSlug];
  const city = citiesData[citySlug];

  if (!course || !city) {
    console.error(
      `Metadata generation: Course or city data not found for slugs: ${courseSlug}, ${citySlug}`
    );
    return null;
  }

  const courseTitle = course.title;
  const cityName = city.name;
  const hasOffice = city.hasOffice;
  const currentYear = new Date().getFullYear();

  // --- META TITLE LOGIC ---
  let finalTitle;
  if (course.metaTitle) {
    finalTitle = course.metaTitle.replace(/{city}/g, cityName);
    // You can choose to add truncation here as a safeguard even if metaTitle is defined.
    // finalTitle = truncateString(finalTitle, 60); // Max 60 chars for title
  } else {
    // Fallback template if metaTitle is not explicitly defined in masterData
    const defaultTitleTemplate = `${courseTitle} Course in ${cityName} | ${currentYear} Cert. & Placements`;
    finalTitle = truncateString(defaultTitleTemplate, 60); // Apply truncation to fallback
  }

  // --- META DESCRIPTION LOGIC ---
  let finalDescription;
  if (course.metaDescription) {
    finalDescription = course.metaDescription.replace(/{city}/g, cityName);
    // You can choose to add truncation here as a safeguard even if metaDescription is defined.
    // finalDescription = truncateString(finalDescription, 155); // Max 155 chars for description
  } else {
    // Fallback template if metaDescription is not explicitly defined in masterData
    const fallbackDescriptionTemplate = `${course.description.replace(/{city}/g, cityName)} Get ${course.certification} with ${course.duration} training, placement support, and hands-on projects in ${cityName}.`;
    finalDescription = truncateString(fallbackDescriptionTemplate, 155); // Apply truncation to fallback
  }

  // Generate extensive keywords
  const keywords = [
    `${courseTitle} Course in ${cityName}`,
    `${courseTitle} Training Institute in ${cityName}`,
    `Best ${courseTitle} Training Institute in ${cityName}`,
    `${courseTitle} Jobs ${cityName}`,
    `${courseTitle} Certificate in ${cityName}`,
    `${courseTitle} Certificate Course in ${cityName}`,
    `${courseTitle} Course Fees ${cityName}`,
    `${courseTitle} Training Fees in ${cityName}`,
    `${courseTitle} Interview Preparation ${cityName}`,
    `${courseTitle} Mock Interview ${cityName}`,
    `${courseTitle} Tutorial`,
    `${courseTitle} Summer Training ${cityName}`,
    `${courseTitle} Training in ${cityName}`,
    `${courseTitle} Industrial Training ${cityName}`,
    `${courseTitle} Internship ${cityName}`,
    `How to become ${courseTitle} expert in ${cityName}`,
    `${courseTitle} course Syllabus`,
    `Connecting Dots ERP ${courseTitle} ${cityName}`,
    ...course.jobRoles.map((role) => `${role} ${cityName}`),
    ...(course.modules
      ? course.modules.map((module) => `${module} training ${cityName}`)
      : []),
  ]
    .filter(Boolean)
    .join(", "); // Filter out any empty strings and join

  // Generate dynamic URLs and images
  const pageUrl = `https://connectingdotserp.com/${course.slug}-course-in-${citySlug}`;
  // Ensure your image paths are correct and these images exist
  const ogImageUrl = `https://connectingdotserp.com/images/og-${course.slug}-course-${citySlug}.jpg`;
  const twitterImageUrl = `https://connectingdotserp.com/images/twitter-${course.slug}-course-${citySlug}.jpg`;

  // Generate Open Graph metadata
  const openGraph = {
    title: finalTitle, // Use optimized title
    description: finalDescription, // Use optimized description
    url: pageUrl,
    siteName: "Connecting Dots ERP",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: `${courseTitle} Course in ${cityName}`,
      },
    ],
    type: "website",
    locale: "en_US",
    updatedTime: new Date().toISOString(),
  };

  // Generate Twitter Card metadata
  const twitter = {
    card: "summary_large_image",
    title: finalTitle, // Use optimized title
    description: finalDescription, // Use optimized description
    images: [twitterImageUrl],
    site: "@CD_ERP",
    creator: "@CD_ERP",
  };

  // Generate enhanced metadata for cities with offices
  const enhancedMeta = hasOffice
    ? {
        geoRegion: city.seoData.geoRegion,
        geoPlacename: cityName,
        geoPosition: city.seoData.geoPosition,
        icbm: city.seoData.geoPosition,
        courseProvider: "Connecting Dots ERP",
        courseLocation: cityName,
        courseCategory: course.category,
        themeColor: "#1a365d",
        msApplicationNavButtonColor: "#1a365d",
        appleStatusBarStyle: "black-translucent",
        mobileWebCapable: "yes",
        appleMobileCapable: "yes",
        appleMobileTitle: `${courseTitle} - ${cityName}`,
      }
    : {};

  return {
    title: finalTitle, // Use optimized title
    description: finalDescription, // Use optimized description
    keywords, // Keywords remain dynamically generated from modules/jobRoles
    robots: "index, follow",
    author: "Connecting Dots ERP Training Institute",
    language: "en-US",
    revisitAfter: "7 days",
    distribution: "global",
    rating: "general",
    canonical: pageUrl,
    openGraph,
    twitter,
    enhancedMeta,
    isMajorCity: hasOffice,
    alternates: [
      {
        hreflang: "en-IN",
        href: pageUrl,
      },
      {
        hreflang: "x-default",
        href: pageUrl,
      },
    ],
    icons: {
      icon: "/favicon.ico",
      appleTouchIcon: "/apple-touch-icon.png",
      // You can add specific sizes here if your favicons have them
      // favicon32: '/favicon-32x32.png',
      // favicon16: '/favicon-16x16.png'
    },
    manifest: "/site.webmanifest",
    preconnect: [
      "https://fonts.googleapis.com",
      "https://fonts.gstatic.com",
      "https://www.google-analytics.com",
    ],
    dnsPrefetch: [
      "//www.google.com",
      "//www.googleapis.com",
      "//fonts.googleapis.com",
    ],
    facebook: {
      appId: "your-facebook-app-id", // Replace with your actual Facebook App ID
    },
    pinterest: {
      richPin: "true",
    },
  };
}

export function generateDynamicJsonLd(courseSlug, citySlug) {
  const course = coursesData[courseSlug];
  const city = citiesData[citySlug];

  if (!course || !city) {
    console.error(
      `JSON-LD generation: Course or city data not found for slugs: ${courseSlug}, ${citySlug}`
    );
    return null;
  }

  const baseUrl = "https://connectingdotserp.com";
  const pageUrl = `${baseUrl}/${course.slug}-course-in-${citySlug}`;
  const currentDate = new Date().toISOString();
  const futureDate = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0]; // Valid for 90 days
  const courseTitle = course.title;
  const cityName = city.name;
  const hasOffice = city.hasOffice;

  // Process description with city replacement (using the main description, not metaDescription)
  const processedDescription = course.description.replace(/{city}/g, cityName);

  const jsonLd = [
    // Organization Schema
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      name: "Connecting Dots ERP",
      description: "Best Training Provider | Placement Giants",
      url: baseUrl,
      telephone:
        hasOffice && city.office.phone ? city.office.phone : "+919004002941",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/Navbar/logo.webp`,
        "@id": `${pageUrl}#organizationLogoImage`,
        width: 228,
        height: 70,
        caption: "Connecting Dots ERP Logo",
      },
      image: {
        "@id": `${pageUrl}#organizationLogoImage`,
      },
      sameAs: [
        "https://www.facebook.com/sapinstallation.pune.9",
        "https://x.com/CD_ERP",
        "https://www.youtube.com/channel/UCxQ-RBOBaoYjjd4Mv7qQekA",
        "https://www.linkedin.com/company/connecting-dots-erp",
        "https://www.instagram.com/connecting_dot_software_course/",
        "https://in.pinterest.com/Connecting_Dots_ERP/",
        "https://www.quora.com/profile/Connecting-Dot-ERP-SAP-And-IT-Training-Institute",
      ],
    },

    // WebPage Schema
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: `${courseTitle} Course in ${cityName} | Connecting Dots ERP`,
      description: processedDescription,
      inLanguage: "en-US",

      isPartOf: {
        "@id": `${baseUrl}/#website`,
      },
      breadcrumb: {
        "@id": `${pageUrl}#breadcrumb`,
      },
      image: {
        "@type": "ImageObject",
        url: `${baseUrl}/images/course-banner-${course.slug}-course.jpg`, // Example: course-banner-sap-fico-course.jpg
        "@id": `${pageUrl}#mainImage`,
        width: 1200,
        height: 630,
        caption: `${courseTitle} Course in ${cityName}`,
      },
      primaryImageOfPage: {
        "@id": `${pageUrl}#mainImage`,
      },
      datePublished: course.publishedAt || currentDate, // Assuming coursesData might have a publishedAt
      dateModified: course.updatedAt || currentDate,
    },

    // BreadcrumbList Schema
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: baseUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: `${course.category.charAt(0).toUpperCase() + course.category.slice(1)} Courses`, // e.g., "Sap Courses", "Hr Courses"
          item: `${baseUrl}/${course.category}-courses`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: `${courseTitle} Course in ${cityName}`,
          item: pageUrl,
        },
      ],
    },

    // WebSite Schema
    {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      url: baseUrl,
      name: "Connecting Dots ERP",
      description: "Learn the way industry wants it...",
      publisher: {
        "@id": `${baseUrl}/#organization`,
      },
      potentialAction: [
        {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${baseUrl}/?s={search_term_string}`,
          },
          "query-input": {
            "@type": "PropertyValueSpecification",
            valueRequired: true,
            valueName: "search_term_string",
          },
        },
      ],
      inLanguage: "en-US",
    },

    // Course Schema (Correction: Changed "hasCourseinstance" to "Course" as per your HTML examples)
    {
      "@context": "https://schema.org",
      "@type": "Course", // Corrected type
      "@id": `${pageUrl}#course`,
      name: `${courseTitle} Course in ${cityName}`,
      description: processedDescription,
      url: pageUrl,
      provider: {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        name: "Connecting Dots ERP",
      },
      offers: {
        "@type": "Offer",
        url: pageUrl,
        priceCurrency: "INR",
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "INR",
          minPrice: course.price.min.toString(),
          maxPrice: course.price.max.toString(),
        },
        priceValidUntil: futureDate,
        availability: "https://schema.org/InStock",
        category: "Professional Training",
        areaServed: hasOffice
          ? {
              "@type": "Place",
              "@id": `${baseUrl}/${citySlug}/#localbusiness`,
            }
          : {
              // For cities without offices, provide a general Place
              "@type": "Place",
              name: cityName,
              addressLocality: cityName,
              addressRegion: city.state,
              addressCountry: "IN",
            },
        seller: hasOffice
          ? {
              "@type": "Organization",
              "@id": `${baseUrl}/${citySlug}/#localbusiness`,
            }
          : {
              "@type": "Organization",
              "@id": `${baseUrl}/#organization`, // Default to main organization if no local office
            },
      },
      // Corrected "Rating" to "aggregateRating"
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: (hasOffice
          ? city.office.rating
          : course.defaultRating || 4.5
        ).toString(),
        reviewCount: (hasOffice
          ? city.office.reviewCount
          : course.defaultReviewCount || 50
        ).toString(),
        bestRating: "5",
        worstRating: "1",
      },
      review: {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Verified Student", // Or dynamically pull a specific review from masterData
        },
        datePublished: currentDate.split("T")[0],
        reviewBody: `The ${courseTitle} course at Connecting Dots ERP is outstanding! The course content is comprehensive, and the trainers are highly knowledgeable. I highly recommend it to anyone looking to build a successful career in ${courseTitle}.`,
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        publisher: {
          "@id": `${baseUrl}/#organization`,
        },
      },
      hasCourseInstance: [
        {
          "@type": "CourseInstance",
          courseMode: "Blended",
          location: cityName,
          courseSchedule: {
            "@type": "Schedule",
            duration: "PT3H",
            repeatFrequency: "Daily",
            repeatCount: 31, // Example, adjust as needed
            startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
              .toISOString()
              .split("T")[0], // Next week
            endDate: new Date(Date.now() + 37 * 24 * 60 * 60 * 1000)
              .toISOString()
              .split("T")[0], // One month after start
          },
          instructor:
            hasOffice && city.office.instructor
              ? [
                  {
                    "@type": "Person",
                    name: city.office.instructor,
                    description: `${courseTitle} Specialist with 10+ years of experience in training and consulting`,
                  },
                ]
              : [
                  {
                    // Default instructor if no specific one for the city
                    "@type": "Person",
                    name: "Experienced Trainer",
                    description: `${courseTitle} Specialist with 10+ years of experience in training and consulting`,
                  },
                ],
        },
      ],
    },

    // VideoObject Schema
    {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      "@id": `${pageUrl}#video`,
      name: `Introduction to ${courseTitle} Course at Connecting Dots ERP`,
      description: `Explore ${courseTitle} with Connecting Dots ERP! Gain expertise in ${course.modules ? course.modules.slice(0, 2).join(" and ") : "your chosen field"}, data management, and business process integration. Master real-world applications to drive digital transformation.`,
      thumbnailUrl: `${baseUrl}/images/video-thumbnail-${course.slug}-course-${citySlug}.jpg`, // Placeholder
      embedUrl: "https://www.youtube.com/embed/7YRbfuv7R3k", // Example generic video, update for specific courses if available
      uploadDate: currentDate.split("T")[0],
      publisher: {
        "@id": `${baseUrl}/#organization`,
      },
    },

    // SpecialAnnouncement Schema
    {
      "@context": "https://schema.org",
      "@type": "SpecialAnnouncement",
      "@id": `${pageUrl}#announcement`,
      name: `${courseTitle} Course in ${cityName} - New Batch Starting Soon!`,
      text: `Join our new batch for the ${courseTitle} course in ${cityName}. Enroll now and kickstart your career in ${courseTitle}. The course offers in-depth training in ${course.modules ? course.modules.slice(0, 3).join(", ") : "key concepts"}, with hands-on experience and expert guidance.`,
      datePosted: currentDate.split("T")[0],
      expires: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0], // Valid for 60 days
      url: pageUrl,
      publisher: {
        "@id": `${baseUrl}/#organization`,
      },
      announcementLocation: hasOffice
        ? {
            "@type": "Place",
            "@id": `${baseUrl}/${citySlug}/#localbusiness`,
          }
        : undefined, // Undefined if no local office
    },
  ];

  // Add LocalBusiness schema only for cities with offices
  if (hasOffice && city.office) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${baseUrl}/${citySlug}/#localbusiness`,
      name: `Best ${courseTitle} Training Institute in ${cityName} | ${courseTitle} Course in ${cityName} | ${courseTitle} Classes in ${cityName} | Placement`,
      description: `Start your new journey with Connecting Dots ERP in the world of ${courseTitle} by enrolling in our ${courseTitle} course in ${cityName}! Whether you're just starting or aiming to enhance your skills we offer a variety of ${courseTitle} courses designed to your requirements.`,
      url: city.office.mapUrl || pageUrl,
      telephone: city.office.phone,
      priceRange: city.seoData.priceRange,
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          opens: city.office.hours.open,
          closes: city.office.hours.close,
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
        },
      ],
      address: {
        "@type": "PostalAddress",
        streetAddress: city.office.address,
        addressLocality: cityName,
        addressRegion: city.state,
        postalCode: city.office.postalCode || "400001",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: city.coordinates.lat.toString(),
        longitude: city.coordinates.lng.toString(),
      },
      image: {
        "@type": "ImageObject",
        url: `${baseUrl}/images/location-${citySlug}-${course.category}.jpg`, // Placeholder
        "@id": `${pageUrl}#locationImage`,
        width: 800,
        height: 600,
        caption: `Connecting Dots ERP ${cityName} Branch - ${courseTitle} Training`,
      },
      hasMap: city.office.mapUrl,
      areaServed: {
        "@type": "GeoCircle",
        geoMidpoint: {
          "@type": "GeoCoordinates",
          latitude: city.coordinates.lat.toString(),
          longitude: city.coordinates.lng.toString(),
        },
        geoRadius: "20000",
        description: `Serving ${cityName} and surrounding areas for ${courseTitle} training.`,
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: city.office.rating.toString(),
        reviewCount: city.office.reviewCount.toString(),
        bestRating: "5",
        worstRating: "1",
      },
      review: {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Verified Student",
        },
        datePublished: currentDate.split("T")[0],
        reviewBody: `The ${courseTitle} course at Connecting Dots ERP is outstanding! The course content is well-structured and comprehensive, and the trainers are exceptionally skilled and knowledgeable. I highly recommend it to anyone aspiring to build a career in ${courseTitle}.`,
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        publisher: {
          "@id": `${baseUrl}/#organization`,
        },
      },
      parentOrganization: {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
      },
    });
  }

  return jsonLd;
}
