// src/app/layout.js (UPDATED with next/font and Dynamic BackgroundAnimation)
"use client";

import { useEffect, Suspense } from "react";
import { CityProvider } from "@/context/CityContext";
import dynamic from "next/dynamic";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { Lato, Rubik } from "next/font/google";

// Initialize Lato font using next/font
const lato = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-lato", // Assign a CSS variable for consistent use
});

// 🚀 NEW: Initialize Rubik font if it's used globally
const rubik = Rubik({
  weight: ["300", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-rubik", // Assign a CSS variable
});

// Import global CSS here. Keep only essential global styles.
import "./globals.css";

// Lazy load heavy components
const Navbar = dynamic(() => import("@/components/Common/Navbar"), {
  loading: () => (
    <div
      style={{
        height: "80px",
        width: "100%",
        backgroundColor: "#fff",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      }}
    />
  ),
});

const Footer = dynamic(() => import("@/components/Common/Footer"), {
  ssr: false,
  loading: () => <div style={{ height: "200px", width: "100%" }} />,
});

const Chatbot = dynamic(() => import("@/components/Chatbot"), { ssr: false });
const PopupForm = dynamic(() => import("@/components/PopupForm"), {
  ssr: false,
});
const Stickyform = dynamic(() => import("@/components/Stickyform"), {
  ssr: false,
});

// 🚀 NEW: Dynamically import BackgroundAnimation
const BackgroundAnimation = dynamic(
  () => import("@/components/Common/BackgroundAnimation"),
  {
    ssr: false, // Client-side only
    loading: () => null, // No placeholder needed for a background animation
  }
);

// Keep these as regular imports
import CallAdvisorsStrip from "@/components/Common/CallAdvisorsStrip";
import Marquee from "@/components/Common/Marquee";
import WaveComponent from "@/components/Wave";
import Whatsapp from "@/components/Whatsapp";
import Floatingcontact from "@/components/Floatingcontact";
import BottomMenu from "@/components/BottomMenu";
import ScrollToTop from "@/components/ScrollToTop";
import CourseLoader from "@/components/CourseLoader";

const GTM_ID = "GTM-MB68QM2V";
const FB_PIXEL_ID = "3414178115554916";
const AHREFS_KEY = "pUfORHA6uR+7KBt+fOIy2g";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const hiddenRoutes = [
    "/dashboard",
    "/AdminLogin",
    "/superadmin",
    "/superadmin/dashboard",
    "/superadmin/users",
    "/superadmin/leads",
    "/superadmin/analytics",
    "/superadmin/activity",
    "/superadmin/audit-logs",
    "/superadmin/roles",
    "/superadmin/settings",
  ];
  const shouldHideComponent = hiddenRoutes.includes(pathname);

  // Optimize API pings (no change)
  useEffect(() => {
    const delayedPing = setTimeout(() => {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
      if (apiBaseUrl) {
        fetch(`${apiBaseUrl}/api/ping`).catch(() => {});
      }
    }, 3000);

    const delayedBlogPing = setTimeout(() => {
      const blogBaseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      if (blogBaseUrl) {
        fetch(`${blogBaseUrl}/api/blogs/ping`).catch(() => {});
      }
    }, 4000);

    return () => {
      clearTimeout(delayedPing);
      clearTimeout(delayedBlogPing);
    };
  }, []);

  return (
    <html lang="en" className={`${lato.variable} ${rubik.variable}`}>
      {" "}
      {/* Apply both font variables */}
      <head>
        {/* Critical resource hints */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />

        {/* Ahrefs verification */}
        <meta
          name="ahrefs-site-verification"
          content="f3b13167d2161bfb1fc945b8ecb8c0e6855cf9394e9e96e12104db099fbbcab0"
        />
        {/* Initialize dataLayer FIRST */}
        <Script
          id="gtm-dataLayer-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];`,
          }}
        />
      </head>
      <body className={`body bg-black ${lato.className} ${rubik.className}`}>
        {" "}
        {/* Apply both font classes to body */}
        {/* GTM noscript */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* 🚀 NEW: Conditionally loaded BackgroundAnimation component */}
        <BackgroundAnimation />
        {/* Critical above-the-fold components */}
        {!shouldHideComponent && <CallAdvisorsStrip />}
        {!shouldHideComponent && <Marquee />}
        {!shouldHideComponent && <Navbar />}
        <Suspense fallback={null}>
          <CourseLoader />
        </Suspense>
        <CityProvider>{children}</CityProvider>
        {/* Non-critical components */}
        <ScrollToTop />
        <Floatingcontact phoneNumber="+919004002958" />
        <Whatsapp phoneNumber="+919004002958" />
        {/* Lazy loaded heavy components */}
        <Chatbot />
        <Stickyform />
        <PopupForm />
        {!shouldHideComponent && <WaveComponent />}
        {!shouldHideComponent && <Footer />}
        <BottomMenu />
        {/* Load tracking scripts AFTER page content */}
        <Script
          id="gtm-script"
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
          src="https://analytics.ahrefs.com/analytics.js"
          data-key={AHREFS_KEY}
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
 