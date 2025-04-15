// src/app/page.js

import "@/app/globals.css";
import { notFound } from 'next/navigation';
import { getStaticPageHtml } from "@/lib/staticHtml"; // Corrected import name
import HeaderCarousel from "@/components/HomePage/HeaderCarousel";
import Marquee from "@/components/HomePage/Marquee2";
import Chevron from "@/components/HomePage/Chevron";
import Keypoints from "@/components/HomePage/Keypoints";
import OurClients from "@/components/HomePage/OurClients";
import PlacementSection from "@/components/HomePage/PlacementSection";
import OurStats from "@/components/HomePage/OurStats";
import Achievements from "@/components/HomePage/Achievements";
import FeedbackAndReviews from "@/components/HomePage/FeedbackandReviews";
import Certificate from "@/components/HomePage/Certificate";
import Branches from "@/components/HomePage/Branches";
import Courses from "@/components/HomePage/PopCourses";
import Script from "next/script";

// Home page specific metadata (ensure this aligns with your homepage.html <head>)
export const metadata = {
  title: 'Connecting Dots ERP | SAP & IT Training Institute In Pune, Mumbai, Raipur', // Example - use your actual title
  description: 'Connecting Dots ERP offers Expert-led training in SAP, Software Development, Digital Marketing, and HR Courses with strong placement support in Pune, Mumbai, and Raipur.', // Example
  keywords: 'SAP Training Institute, IT Training Institute, HR Courses, Connecting Dots ERP, SAP Course, Data Science Course, Python Course, Pune, Mumbai, Raipur, Placement Support', // Example
  author: 'Connecting Dots ERP | Software and SAP Training Institute',
  alternates: {
    canonical: '/',
  },
  // Add matching Open Graph / Twitter tags here if desired, mirroring homepage.html
  // openGraph: { ... },
  // twitter: { ... },
};

export default async function HomePage() { // Make component async
  // --- Fetch Static HTML ---
  // Ensure 'homepage.html' exists in your static HTML directory
  const htmlContent = await getStaticPageHtml('homepage'); // Use correct filename

  if (!htmlContent) {
    // Decide how to handle missing static file for homepage - maybe log error but don't 404?
    console.error("CRITICAL: homepage.html not found in static directory!");
    // Optionally, you could return a basic version of the page here without the static injection
    // For now, we proceed but log the error. If it MUST exist, use notFound().
    // notFound();
  }
  // --- End Fetch Static HTML ---

  return (
    <>
      {/* Static HTML content for SEO (only injected if found) */}
      {htmlContent && (
        <div id="seo-content" dangerouslySetInnerHTML={{ __html: htmlContent }} />
      )}

      {/* Script to hide the static content (only add if static content was injected) */}
      {htmlContent && (
        <Script id="hide-seo-content" strategy="beforeInteractive">
          {`
            // Check if element exists before trying to hide
            const seoContent = document.getElementById('seo-content');
            if (seoContent) {
              seoContent.style.display = 'none';
            }
          `}
        </Script>
      )}

      {/* Regular dynamic content */}
      <main className="flex-col justify-center">
        <HeaderCarousel />
        <Marquee />
        <Chevron />
        <Keypoints />
        <OurClients />
        <Courses />
        <PlacementSection />
        <OurStats />
        <Achievements />
        <FeedbackAndReviews />
        <Certificate pageId="HomepageCERT" />
        <Branches />
      </main>
    </>
  );
}