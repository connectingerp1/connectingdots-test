"use client";

import { useEffect, Suspense } from "react";
import "./globals.css";
import { CityProvider } from "@/context/CityContext";
import dynamic from "next/dynamic";
import Script from "next/script";
import { usePathname } from "next/navigation";

// Lazy load heavy components
const Navbar = dynamic(() => import("@/components/Common/Navbar"), {
  loading: () => <div style={{ height: '80px' }} />, // Prevent layout shift
});

const Footer = dynamic(() => import("@/components/Common/Footer"), {
  ssr: false, // Footer not critical for initial render
});

const Chatbot = dynamic(() => import("@/components/Chatbot"), {
  ssr: false,
});

const PopupForm = dynamic(() => import("@/components/PopupForm"), {
  ssr: false,
});

const Stickyform = dynamic(() => import("@/components/Stickyform"), {
  ssr: false,
});

// Keep these as regular imports since they're lightweight
import CallAdvisorsStrip from "@/components/Common/CallAdvisorsStrip";
import Marquee from "@/components/Common/Marquee";
import WaveComponent from "@/components/Wave";
import Whatsapp from "@/components/Whatsapp";
import Floatingcontact from "@/components/Floatingcontact";
import BottomMenu from "@/components/BottomMenu";
import ScrollToTop from "@/components/ScrollToTop";
import CourseLoader from "@/components/CourseLoader";

const GTM_ID = "GTM-MB68QM2V";

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

  // Optimize API pings - delay them and make them non-blocking
  useEffect(() => {
    const delayedPing = setTimeout(() => {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
      if (apiBaseUrl) {
        fetch(`${apiBaseUrl}/api/ping`).catch(() => {});
      }
    }, 3000); // Delay by 3 seconds

    const delayedBlogPing = setTimeout(() => {
      const blogBaseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      if (blogBaseUrl) {
        fetch(`${blogBaseUrl}/api/blogs/ping`).catch(() => {});
      }
    }, 4000); // Delay by 4 seconds

    return () => {
      clearTimeout(delayedPing);
      clearTimeout(delayedBlogPing);
    };
  }, []);

  return (
    <html lang="en">
      <head>
        {/* Critical resource hints */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://connect.facebook.net" />
        
        {/* Optimized font loading */}
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap"
          rel="stylesheet"
        />

        {/* Ahrefs verification - keep as is */}
        <meta
          name="ahrefs-site-verification"
          content="05890b7d6657f7c22a48d201ddbced6847469e2f76ac6f73f1b7d49ef0da283d"
        />
        <meta
          name="ahrefs-site-verification"
          content="02de04071d4e08f203c50f26aaee76be72f3a3af3d54f684f0932ff933cb1a3f"
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

      <body className="body bg-black">
        {/* GTM noscript */}
        <noscript>
          <iframe 
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        {/* Background animation - keep as is */}
        <div className="background-animation">
          <div className="starsec"></div>
          <div className="starthird"></div>
          <div className="starfourth"></div>
          <div className="starfifth"></div>
        </div>

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
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="lazyOnload"
          src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`}
        />

        {/* Facebook Pixel */}
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
              fbq('init', '3414178115554916');
              fbq('track', 'PageView');
            `,
          }}
        />

        {/* Ahrefs Analytics */}
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="Lvg8yXKWB+tW+q2A0zb0LQ"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}