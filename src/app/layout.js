// src/app/layout.js - FINAL VERSION

import { Lato, Rubik } from "next/font/google";
import Script from "next/script";
import "./globals.css";

// Static imports for components that are part of the main layout
import Navbar from "@/components/Common/Navbar";
import Footer from "@/components/Common/Footer";
import CallAdvisorsStrip from "@/components/Common/CallAdvisorsStrip";
import Marquee from "@/components/Common/Marquee";

// This wrapper will contain all our client-side logic, like Context Providers
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";

// --- Font Setup ---
const lato = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lato",
});

const rubik = Rubik({
  weight: ["300", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-rubik",
});

// --- Constants ---
const GTM_ID = "GTM-MB68QM2V";
const FB_PIXEL_ID = "3414178115554916";
const AHREFS_KEY = "ersRjKzL0Wdjz4Qtn0BvDg";

// --- SITE-WIDE METADATA ---
// This object replaces the manual <head> tag. Next.js uses this to build the
// final <head> for every page, merging it with page-specific metadata.
export const metadata = {
  // A default title and description for pages that don't have their own
  title: {
    default: "Connecting Dots ERP | SAP Training Institute",
  },
  description:
    "Expert-led training in SAP, Software Development, Digital Marketing, and HR Courses with strong placement support for your career.",
  verification: {
    // Ahrefs verification and other verification tags go here
    other: {
      "ahrefs-site-verification":
        "0b9886aad63a27368476900bd3b4bb0e23971b8ca6d448cfc2c77ce706798bc9",
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${lato.variable} ${rubik.variable}`}>
      <body className={`body bg-black ${lato.className} ${rubik.className}`}>
        {/* Initialize dataLayer for GTM. 'beforeInteractive' ensures it runs before anything else. */}
        <Script
          id="gtm-dataLayer-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];`,
          }}
        />
        {/* GTM noscript fallback */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {/* Server-Side Rendered Components */}
        <CallAdvisorsStrip />
        <Marquee />
        <Navbar />

        {/* The ClientLayoutWrapper now contains the CityProvider and wraps the children */}
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>

        <Footer />

        {/* Tracking scripts are loaded with 'lazyOnload' to avoid blocking page rendering */}
        <Script
          id="gtm-main-script"
          strategy="lazyOnload"
          src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`}
        />
        <Script
          id="facebook-pixel"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${FB_PIXEL_ID}');
              fbq('track', 'PageView');
            `,
          }}
        />
        <Script
          id="ahrefs-analytics"
          src="https://analytics.ahrefs.com/analytics.js"
          data-key={AHREFS_KEY}
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
