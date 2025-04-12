import "./globals.css";
import { CityProvider } from "@/context/CityContext";
import Navbar from "@/components/Common/Navbar";
import Footer from "@/components/Common/Footer";
import CallAdvisorsStrip from "@/components/Common/CallAdvisorsStrip";
import Marquee from "@/components/Common/Marquee";
import Stickyform from "@/components/Stickyform";
import WaveComponent from "@/components/Wave";
import PopupForm from "@/components/PopupForm";
import Chatbot from "@/components/Chatbot";
import Whatsapp from "@/components/Whatsapp";
import Floatingcontact from "@/components/Floatingcontact";
import BottomMenu from "@/components/BottomMenu";
import Script from "next/script";
import "bootstrap/dist/css/bootstrap.min.css";

const GTM_ID = "GTM-MB68QM2V";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Lato:400,700&display=swap"
          rel="stylesheet"
          media="print"
          onLoad="this.media='all'"
        />

        <meta
          name="ahrefs-site-verification"
          content="05890b7d6657f7c22a48d201ddbced6847469e2f76ac6f73f1b7d49ef0da283d"
        />

        <meta
          name="ahrefs-site-verification"
          content="02de04071d4e08f203c50f26aaee76be72f3a3af3d54f684f0932ff933cb1a3f"
        />

        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="Lvg8yXKWB+tW+q2A0zb0LQ"
          async
        ></Script>

        {/* Google Tag Manager - HEAD */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `,
          }}
        />

        {/* Initialize dataLayer */}
        <Script
          id="gtm-dataLayer-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
            `,
          }}
        />
      </head>
      <body className="body">
        {/* Google Tag Manager - BODY (noscript fallback) */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `
              <iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}"
              height="0" width="0" style="display:none;visibility:hidden"></iframe>
            `,
          }}
        />

        {/* Background Animation */}
        <div className="background-animation">
          <div className="starsec"></div>
          <div className="starthird"></div>
          <div className="starfourth"></div>
          <div className="starfifth"></div>
        </div>

        {/* UI Components */}
        <CallAdvisorsStrip />
        <Marquee />
        <Navbar />
        <CityProvider>{children}</CityProvider>
        <Floatingcontact phoneNumber="+919004002958" />
        <Whatsapp phoneNumber="+919004002958" />
        <Chatbot />
        <Stickyform />
        <PopupForm /> 
        <WaveComponent />
        <Footer />
        <BottomMenu />
      </body>
    </html>
  );
}
