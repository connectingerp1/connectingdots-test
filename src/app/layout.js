// src/app/layout.js - FIXED VERSION (Server Component)
import { CityProvider } from "@/context/CityContext";
import dynamic from "next/dynamic";
import Script from "next/script";
import { Lato, Rubik } from "next/font/google";

// Initialize fonts
const lato = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-lato",
});

const rubik = Rubik({
  weight: ["300", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-rubik",
});

// Import global CSS
import "./globals.css";

// Static imports for critical components that need to be server-rendered
import Navbar from "@/components/Common/Navbar";
import Footer from "@/components/Common/Footer";
import CallAdvisorsStrip from "@/components/Common/CallAdvisorsStrip";
import Marquee from "@/components/Common/Marquee";

// Create a client component wrapper for components that need client-side features
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";

const GTM_ID = "GTM-MB68QM2V";
const FB_PIXEL_ID = "3414178115554916";
const AHREFS_KEY = "pUfORHA6uR+7KBt+fOIy2g";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${lato.variable} ${rubik.variable}`}>
      <head>
        {/* Critical resource hints */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />

        {/* Ahrefs verification */}
        <meta
          name="ahrefs-site-verification"
          content="61e8327be7878b001e67d79b48fa239923e438edb85df759becf82090ac89a7c"
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
        {/* GTM noscript */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {/* SERVER-RENDERED COMPONENTS - Crawlers can see these! */}
        <CallAdvisorsStrip />
        <Marquee />
        <Navbar />

        {/* Main content */}
        <CityProvider>
          {children}
        </CityProvider>

        {/* SERVER-RENDERED FOOTER - Crawlers can see this! */}
        <Footer />

        {/* CLIENT-SIDE COMPONENTS - Wrapped in client component */}
        <ClientLayoutWrapper />

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