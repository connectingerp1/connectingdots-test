import "@/app/globals.css";
import { getStaticHtml } from "@/lib/staticHtml";
import dynamic from "next/dynamic";

// Critical above-the-fold component - load immediately
import HeaderCarousel from "@/components/HomePage/HeaderCarousel";

// Lazy load below-the-fold components
const Marquee = dynamic(() => import("@/components/HomePage/Marquee2"), {
  loading: () => <div style={{ height: '60px' }} />,
});

const Chevron = dynamic(() => import("@/components/HomePage/Chevron"));
const Keypoints = dynamic(() => import("@/components/HomePage/Keypoints"));
const OurClients = dynamic(() => import("@/components/HomePage/OurClients"));
const PlacementSection = dynamic(() => import("@/components/HomePage/PlacementSection"));
const OurStats = dynamic(() => import("@/components/HomePage/OurStats"));
const Achievements = dynamic(() => import("@/components/HomePage/Achievements"));
const FeedbackAndReviews = dynamic(() => import("@/components/HomePage/FeedbackandReviews"));
const Certificate = dynamic(() => import("@/components/HomePage/Certificate"));
const Branches = dynamic(() => import("@/components/HomePage/Branches"));
const Courses = dynamic(() => import("@/components/HomePage/PopCourses"));

// Get static HTML content
const staticHtml = getStaticHtml('home-page');

// Optimized metadata
// export const metadata = {
//   title: 'Connecting Dots ERP | SAP Training Institute In Pune',
//   description: 'Expert-led training in SAP, Software Development, Digital Marketing, and HR Courses with strong placement support for your career.',
//   keywords: 'SAP Certification Courses, SAP Course, Data Science Course, Power BI Course, Digital Marketing Course, HR Training Institute, SAP Training Institute, Python Course, Software Course, Training, Education',
//   author: 'Connecting Dots ERP | Software and SAP Training Institute',
//   openGraph: {
//     title: 'Connecting Dots ERP | SAP Training Institute In Pune',
//     description: 'Expert-led training in SAP, Software Development, Digital Marketing, and HR Courses with strong placement support.',
//     type: 'website',
//   },
//   twitter: {
//     card: 'summary_large_image',
//     title: 'Connecting Dots ERP | SAP Training Institute In Pune',
//     description: 'Expert-led training in SAP, Software Development, Digital Marketing, and HR Courses.',
//   },
// };

export default function HomePage() {
  return (
    <>
      {/* SEO content - hidden when JS loads */}
      <div 
        id="seo-content" 
        dangerouslySetInnerHTML={{ __html: staticHtml }}
        style={{ display: 'none' }} // Hide by default, show only for crawlers
      />
      
      {/* Main content */}
      <main className="flex-col justify-center">
        {/* Critical - loads immediately */}
        <HeaderCarousel />
        
        {/* Below-the-fold - lazy loaded */}
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